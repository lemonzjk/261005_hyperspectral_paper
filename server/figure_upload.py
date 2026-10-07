"""Validate and persist local framework uploads without overwriting original images."""
import base64
import binascii
import copy
import fcntl
import hashlib
import io
import json
import os
from datetime import date
from pathlib import Path
import sys
import tempfile
from urllib.parse import urlparse
import uuid
import warnings

from PIL import Image

MAX_BYTES = 10 * 1024 * 1024
Image.MAX_IMAGE_PIXELS = 25_000_000


def upload(root, payload):
    root = Path(root)
    # Serialize uploads across dev server processes; the lock contains no user data.
    lock_name = hashlib.sha256(str(root.resolve()).encode()).hexdigest()
    with open(Path(tempfile.gettempdir()) / f'hs3d-upload-{lock_name}.lock', 'a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        return persist(root, payload)


def persist(root, payload):
    if not isinstance(payload, dict):
        raise ValueError('上传请求格式不正确。')
    catalog_path = root / 'src/data/catalog.json'
    registry_path = root / 'research/figures.json'
    original_catalog = catalog_path.read_bytes()
    original_registry = registry_path.read_bytes()
    catalog = json.loads(original_catalog)
    registry = json.loads(original_registry)
    paper = next((p for p in catalog['papers'] if p['id'] == payload.get('paperId')), None)
    if paper is None:
        raise ValueError('未找到这篇论文，请刷新后重试。')
    if Path(paper['id']).name != paper['id'] or '..' in paper['id'] or '\\' in paper['id']:
        raise ValueError('论文标识无效。')
    entry = next(p for p in registry['papers'] if p['paperId'] == paper['id'])
    fields = {}
    for key, label, limit in [('figureLabel', '图号或名称', 160), ('caption', '图片说明', 3000), ('sourceUrl', '来源链接', 2000)]:
        value = payload.get(key)
        if not isinstance(value, str) or not value.strip() or len(value) > limit:
            raise ValueError(f'请填写有效的{label}。')
        fields[key] = value.strip()
    source = urlparse(fields['sourceUrl'])
    if source.scheme != 'https' or not source.hostname or source.username or source.password:
        raise ValueError('来源链接须为有效的 HTTPS 地址。')
    encoded = payload.get('image')
    if not isinstance(encoded, str) or len(encoded) > (MAX_BYTES + 2) // 3 * 4:
        raise ValueError('图片不能超过 10 MB。')
    try:
        data = base64.b64decode(encoded, validate=True)
    except (ValueError, binascii.Error):
        raise ValueError('无法读取图片，请重新选择。') from None
    if not data or len(data) > MAX_BYTES:
        raise ValueError('图片为空或超过 10 MB。')
    try:
        with warnings.catch_warnings():
            warnings.simplefilter('error', Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(data)) as image:
                image_format = image.format
                width, height = image.size
                if image_format not in ('PNG', 'JPEG', 'WEBP') or getattr(image, 'n_frames', 1) != 1:
                    raise ValueError('仅支持静态 PNG、JPG、WebP 图片。')
                if min(width, height) < 100 or width * height > Image.MAX_IMAGE_PIXELS:
                    raise ValueError('图片宽高均须至少 100 像素，总像素不超过 2500 万。')
                image.verify()
            with Image.open(io.BytesIO(data)) as image:
                image.load()
    except (Image.DecompressionBombError, Image.DecompressionBombWarning):
        raise ValueError('图片总像素不能超过 2500 万。') from None
    except (OSError, SyntaxError):
        raise ValueError('图片已损坏或格式不受支持。') from None
    figures = paper.setdefault('frameworkFigures', [])
    replace_path = payload.get('replacePath')
    replacement = None
    if replace_path is not None:
        replacement = next((f for f in figures if f['path'] == replace_path), None)
        if replacement is None or replacement['sha256'] != payload.get('expectedSha256'):
            raise ValueError('待替换图片已发生变化，请刷新后重新选择。')
    digest = hashlib.sha256(data).hexdigest()
    if any(f['sha256'] == digest for f in figures):
        raise ValueError('这张图片已在当前论文中，请选择其他图片。')
    extension = {'PNG': 'png', 'JPEG': 'jpg', 'WEBP': 'webp'}[image_format]
    relative = f"figures/{paper['id']}/framework-upload-{uuid.uuid4().hex}.{extension}"
    destination = root / 'public' / relative
    today = str(date.today())
    figure = dict(fields, path=relative, width=width, height=height, sha256=digest,
                  uploadedAt=today, verificationStatus='pending',
                  attribution=f"{paper['authors']} · {paper['venue']} {paper['year']}",
                  verificationNote='用户本地上传；图像内容、图号和来源尚待人工核验。')
    if replacement:
        history = paper.setdefault('frameworkFigureHistory', [])
        history.append({'figure': copy.deepcopy(replacement), 'replacedAt': today, 'replacementPath': relative})
        figures[figures.index(replacement)] = figure
    else:
        figures.append(figure)
    paper.pop('frameworkFigureSearch', None)
    entry.update(status='needs_review', figures=copy.deepcopy(figures))
    if 'frameworkFigureHistory' in paper:
        entry['figureHistory'] = copy.deepcopy(paper['frameworkFigureHistory'])
    catalog['updatedAt'] = today
    registry['updatedAt'] = today
    new_catalog = (json.dumps(catalog, ensure_ascii=False, indent=2) + '\n').encode()
    new_registry = (json.dumps(registry, ensure_ascii=False, indent=2) + '\n').encode()
    staged = []
    catalog_written = False
    registry_written = False
    image_written = False
    try:
        for path, value in [(catalog_path, new_catalog), (registry_path, new_registry)]:
            descriptor, name = tempfile.mkstemp(dir=path.parent, prefix='.figure-upload-', suffix='.tmp')
            staged.append(Path(name))
            with os.fdopen(descriptor, 'wb') as stream:
                stream.write(value)
        if catalog_path.read_bytes() != original_catalog or registry_path.read_bytes() != original_registry:
            raise ValueError('目录正在被其他任务修改，请稍后重试。')
        destination.parent.mkdir(parents=True, exist_ok=True)
        with destination.open('xb') as stream:
            stream.write(data)
        image_written = True
        staged[1].replace(registry_path)
        registry_written = True
        staged[0].replace(catalog_path)
        catalog_written = True
    except Exception:
        if catalog_written:
            catalog_path.write_bytes(original_catalog)
        if registry_written:
            registry_path.write_bytes(original_registry)
        if image_written:
            destination.unlink(missing_ok=True)
        raise
    finally:
        for path in staged:
            path.unlink(missing_ok=True)
    return paper


if __name__ == '__main__':
    try:
        paper = upload(Path(__file__).resolve().parent.parent, json.load(sys.stdin))
        print(json.dumps({'paper': paper}, ensure_ascii=False))
    except ValueError as error:
        print(json.dumps({'error': str(error)}, ensure_ascii=False))
        sys.exit(2)
    except Exception:
        print(json.dumps({'error': '保存失败，请检查本地目录权限与 Python Pillow 环境。'}, ensure_ascii=False))
        sys.exit(1)
