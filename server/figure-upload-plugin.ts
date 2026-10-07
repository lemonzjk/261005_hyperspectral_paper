import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

/** Editing is available only through the local Vite development server. */
export function figureUploadPlugin(): Plugin {
  return {
    name: 'local-framework-uploads',
    configureServer(server) {
      server.middlewares.use('/__local/figures', async (request, response) => {
        const send = (status: number, body: unknown) => {
          response.statusCode = status;
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.setHeader('Cache-Control', 'no-store');
          response.end(JSON.stringify(body));
        };
        if (request.method !== 'POST') { send(405, { error: '请使用上传表单。' }); return; }
        // A remote website must not be able to write to the local catalog.
        let sameOrigin = false;
        try { sameOrigin = new URL(request.headers.origin ?? '').host === request.headers.host; } catch { /* Reject missing or malformed origins. */ }
        if (!sameOrigin || request.headers['content-type'] !== 'application/json' || request.headers['x-hs3d-upload'] !== '1') {
          send(403, { error: '请从本地页面上传图片。' }); return;
        }
        const chunks: Buffer[] = [];
        let size = 0;
        try {
          for await (const chunk of request) {
            size += chunk.length;
            if (size > 14 * 1024 * 1024) { send(413, { error: '图片不能超过 10 MB。' }); request.resume(); return; }
            chunks.push(Buffer.from(chunk));
          }
          const payload: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          const child = spawn('python3', [resolve(server.config.root, 'server/figure_upload.py')], { stdio: ['pipe', 'pipe', 'pipe'] });
          let output = '';
          let settled = false;
          const finish = (status: number, body: unknown) => { if (!settled) { settled = true; clearTimeout(timeout); send(status, body); } };
          const timeout = setTimeout(() => { child.kill(); finish(504, { error: '保存超时，请刷新确认图片状态后再重试。' }); }, 30_000);
          child.stdout.on('data', chunk => { output += chunk.toString(); });
          child.stderr.resume();
          child.on('error', () => finish(500, { error: '无法启动上传服务，请检查 Python 环境。' }));
          child.stdin.on('error', () => { /* The exit handler reports failed subprocesses. */ });
          child.on('close', code => {
            try { finish(code === 0 ? 200 : code === 2 ? 400 : 500, JSON.parse(output)); }
            catch { finish(500, { error: '上传服务异常，请检查 Python Pillow 是否已安装。' }); }
          });
          child.stdin.end(JSON.stringify(payload));
        } catch { send(400, { error: '上传请求不完整，请重新选择图片。' }); }
      });
    },
  };
}
