# 论文框架图收集与续接

按目录年份从新到旧逐篇处理。优先出版社原图、作者项目或代码仓库、作者预印本和机构全文库；没有独立图片时，从 PDF 提取完整框架，保留全部子图、图例和连线。核对论文标题、图注及图像内容后，每找到一张立即写入，随后继续下一篇。

`research/figures.json` 覆盖所有已收录论文，保存状态、尝试过的来源及失败原因；`src/data/catalog.json` 保存网站使用的图像信息和缺失说明；图片位于 `public/figures/<paper-id>/`。不要将尚未搜索的条目批量标记为失败。

## 状态

- `pending`：待检索或正在寻找，不能理解为已找过。
- `needs_review`：已通过页面上传，图片、图号和来源尚待人工核验；不得自动当作已核验图。
- `verified`：图像已保存并核对，可在论文详情查看。
- `needs_access`：已尝试但未取得可核验原图，需要全文或人工补图。记录具体失败来源和已知图号。
- `no_framework`：检查全文后未发现独立框架图。数据示例、性能曲线不冒充框架图。

预印本图明确记录版本，保留目录中的期刊年份。出版社资源 `grN` 的编号可记录为图号，但在没有全文图注时必须注明编号依据，说明本站图注为人工概述。公开图片仍保留原作者归属；本阶段仅本地预览。

## 命令

Python 3 需要 Pillow，PDF 裁切需要 Poppler（`pdftotext`、`pdftoppm`）。

```bash
python3 research/figures.py init
python3 research/figures.py queue --year 2025
python3 research/figures.py queue
```

`init` 同步新增论文，不覆盖已有尝试。`queue` 只列未核验项，默认年份倒序；优先处理尚无尝试的最新年份，再重试可获取全文的缺失项。

每张图建立一个临时 JSON 记录，示例：

```json
{
  "paperId": "paper-id",
  "localFile": "/tmp/framework.png",
  "sourceUrl": "https://example.org/paper.pdf",
  "figureLabel": "Figure 2",
  "caption": "本站概述的框架说明。",
  "verificationNote": "核对同名论文第 3 页 Figure 2 图注，保留全部子图。",
  "page": 3,
  "extraction": { "method": "pdf_page_crop", "dpi": 170, "pixelBox": [100, 150, 1200, 700] }
}
```

`imageUrl` 可保存原图下载地址；`filename` 可指定以 `framework` 开头的版本文件名。`page` 是 PDF 文件页序（从 1 开始），不一定等于印刷页码。`extraction` 保留裁切方法、分辨率和坐标，便于复核。

```bash
python3 research/figures.py add /tmp/figure-record.json
python3 research/figures.py attempt paper-id --url https://example.org/paper --status needs_access --note '已检查作者仓库；没有 PDF，出版社下载失败。需要 Figure 2。'
npm run validate
```

`add` 校验图片、计算 SHA-256 并立即保存，不等待整批结束；拒绝用不同内容覆盖现有图。人工补图也使用同一命令，自动将缺失状态改为已核验。每轮检查通过后创建本地 Git 提交，遵守仓库约定。

## 页面补图与替换

本地开发服务中的论文详情支持上传补充图片或逐张替换。上传采用独立文件名，不覆盖旧文件；替换前的完整记录保存在目录的 `frameworkFigureHistory` 和续接清单的 `figureHistory`，页面可展开查看。新图包含 `uploadedAt` 和 `verificationStatus: "pending"`，没有 `verifiedAt`；原有来源检查历史继续保留。

`init` 与后续搜索尝试会保留 `needs_review`，不会误改为已核验或缺图。人工核验上传图后，可使用 `add`：令 `localFile` 指向已上传文件，`filename` 使用该文件名，填写实际核验的图号、图注、来源及 `verificationNote`。命令保留文件内容并将该图片标记为已核验；其他待核验图仍保留待核验状态。完成后运行 `npm run validate` 并提交。
