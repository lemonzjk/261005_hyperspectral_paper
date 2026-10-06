# 首屏现场采集主视觉

用户要求浅色背景、更自然真实的画面与重新设计的首屏布局，明确不接受深色底色、简单层叠 SVG 或悬浮地形与玻璃切片。

- 使用内置 `image_gen` 工具生成摄影风格的场景示意，没有使用 CLI 或额外 API 凭据。
- 最终资源：`src/assets/field-sensing-hero.webp`，1536 × 1024。保持原始尺寸，PNG 转码为 WebP，以减少页面加载体积。
- 图片为 AI 生成的概念场景，不是实际设备照片，不指向特定制造商、实际地点或实测结果。页面标注「场景示意」。
- 构图为山谷、森林、河流与三脚架上的光学采集设备，去掉抽象光谱体、玻璃片与人为光束。
- `src/App.tsx` 的 `FieldScene` 负责图片及说明，`src/styles.css` 使用左文右图布局，手机上下排列；正文入口和统计栏保持独立。

## 实际生成提示词

Use case: photorealistic-natural. Asset type: premium scientific research website hero photograph, wide landscape 3:2. Create an extremely realistic professional editorial photograph of terrestrial optical 3D and spectral field sensing. Scene: a real rocky mountain valley with a stream, evergreen trees and pale distant mountain ridges, natural late-morning daylight, soft cloudy blue sky and restrained real-life greens and stone grays. In the right foreground stands ONE authentic-looking compact scientific survey imaging camera on a sturdy black carbon-fiber tripod, a precise rectangular off-white metal instrument body with a conventional dark glass optical lens and realistic metal fasteners, cable ports and small red alignment details, aimed toward the valley. It looks like believable field research equipment, modest in size, not a science-fiction gadget. Camera and tripod entirely visible; foothill ground and low plants around the tripod. Realistic optical depth of field: instrument sharp, distant landscape moderately clear, organic textures. Art direction: high-end professional technology company photography with calm confident composition and understated visual storytelling; shot on a full-frame camera with a 50mm lens, meticulous natural detail, believable imperfections, soft directional sunlight, neutral color grading. Instrument on the right third, open landscape on left and center. No people. Absolutely no floating terrain, no glass panels, no prisms, no rainbow particles, no artificial light rays, no laser beams, no HUD, no point-cloud overlay, no geometric wireframes, no abstract objects. No text, no logos, no branding, no watermark. Bright natural setting, no dark background, no dramatic dystopian mood. Photographic realism rather than CGI. This is an illustrative field sensing scene and must not claim to depict a particular actual device.
