"""Persistence and rejection checks use disposable catalogs, never the research data."""
import base64
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from PIL import Image
from figure_upload import upload


class UploadTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.catalog = self.root / 'src/data/catalog.json'
        self.registry = self.root / 'research/figures.json'
        self.catalog.parent.mkdir(parents=True)
        self.registry.parent.mkdir(parents=True)
        self.catalog.write_text(json.dumps({'papers': [{'id': 'example', 'authors': 'Author', 'venue': 'CVPR', 'year': 2026}]}))
        self.registry.write_text(json.dumps({'papers': [{'paperId': 'example', 'status': 'needs_access', 'attempts': [{'note': 'Original source unavailable'}]}]}))

    def payload(self, color='white', format='PNG', size=(160, 120)):
        stream = io.BytesIO()
        Image.new('RGB', size, color).save(stream, format=format)
        return {'paperId': 'example', 'image': base64.b64encode(stream.getvalue()).decode(), 'figureLabel': 'Figure 2', 'caption': 'Framework', 'sourceUrl': 'https://example.org/paper'}

    def assert_rejected(self, payload):
        before = (self.catalog.read_bytes(), self.registry.read_bytes())
        with self.assertRaises(ValueError):
            upload(self.root, payload)
        self.assertEqual(before, (self.catalog.read_bytes(), self.registry.read_bytes()))

    def test_append_replace_history_and_reload(self):
        paper = upload(self.root, self.payload())
        first = paper['frameworkFigures'][0]
        self.assertNotIn('verifiedAt', first)
        self.assertEqual(first['verificationStatus'], 'pending')
        paper = upload(self.root, self.payload('blue', 'JPEG'))
        self.assertEqual(len(paper['frameworkFigures']), 2)
        replacement = dict(self.payload('red', 'WEBP'), replacePath=first['path'], expectedSha256=first['sha256'])
        paper = upload(self.root, replacement)
        self.assertEqual(len(paper['frameworkFigures']), 2)
        self.assertEqual(paper['frameworkFigureHistory'][0]['figure'], first)
        self.assertTrue((self.root / 'public' / first['path']).exists())
        entry = json.loads(self.registry.read_text())['papers'][0]
        self.assertEqual(entry['status'], 'needs_review')
        self.assertEqual(entry['figures'], paper['frameworkFigures'])
        self.assertEqual(entry['figureHistory'], paper['frameworkFigureHistory'])
        self.assertEqual(entry['attempts'][0]['note'], 'Original source unavailable')
        self.assertEqual(json.loads(self.catalog.read_text())['papers'][0], paper)
        self.assert_rejected(replacement)  # A stale tab cannot replace a newer revision.

    def test_verified_original_keeps_its_provenance(self):
        paper = upload(self.root, self.payload())
        catalog = json.loads(self.catalog.read_text())
        original = catalog['papers'][0]['frameworkFigures'][0]
        original.update(verificationStatus='verified', verifiedAt='2026-10-01', verificationNote='Checked against the original paper')
        self.catalog.write_text(json.dumps(catalog))
        registry = json.loads(self.registry.read_text())
        registry['papers'][0].update(status='verified', figures=[original])
        self.registry.write_text(json.dumps(registry))
        payload = dict(self.payload('red'), replacePath=original['path'], expectedSha256='stale')
        self.assert_rejected(payload)
        payload['expectedSha256'] = original['sha256']
        paper = upload(self.root, payload)
        self.assertEqual(paper['frameworkFigureHistory'][0]['figure'], original)
        self.assertEqual(paper['frameworkFigures'][0]['verificationStatus'], 'pending')
        self.assertNotIn('verifiedAt', paper['frameworkFigures'][0])

    def test_duplicate(self):
        payload = self.payload()
        upload(self.root, payload)
        self.assert_rejected(payload)

    def test_invalid_image(self):
        for image in ['!', base64.b64encode(b'<svg/>').decode(), '']:
            self.assert_rejected(dict(self.payload(), image=image))
        self.assert_rejected(self.payload(size=(99, 120)))
        self.assert_rejected(self.payload(format='GIF'))
        self.assert_rejected(dict(self.payload(), image='A' * (14 * 1024 * 1024)))

    def test_invalid_metadata(self):
        for changes in [{'paperId': '../example'}, {'sourceUrl': 'javascript:alert(1)'}, {'sourceUrl': 'https://'}, {'sourceUrl': 'https://user:secret@example.org'}, {'figureLabel': ''}, {'caption': 'a' * 3001}, {'replacePath': '../../outside'}]:
            self.assert_rejected(dict(self.payload(), **changes))

    def test_failed_catalog_write_rolls_back(self):
        original = (self.catalog.read_bytes(), self.registry.read_bytes())
        replace = Path.replace
        def fail_catalog(path, target):
            if target == self.catalog:
                raise OSError('Simulated write failure')
            return replace(path, target)
        with patch.object(Path, 'replace', fail_catalog), self.assertRaises(OSError):
            upload(self.root, self.payload())
        self.assertEqual(original, (self.catalog.read_bytes(), self.registry.read_bytes()))
        self.assertEqual(list((self.root / 'public').rglob('framework-upload-*')), [])
        self.assertEqual(list(self.root.rglob('.figure-upload-*')), [])


if __name__ == '__main__':
    unittest.main()
