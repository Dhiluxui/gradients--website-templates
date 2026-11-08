import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

function resolveFile(urlPath) {
  let cleanPath = urlPath.split('?')[0].replace(/^\/+/, '');

  if (!cleanPath) {
    return path.join(__dirname, 'index.html');
  }

  // Handle animated-gradientes vs animated-gradients
  if (cleanPath === 'animated-gradientes' || cleanPath === 'animated-gradients') {
    return path.join(__dirname, 'animated-gradients.html');
  }

  // 1. Exact file match
  const direct = path.join(__dirname, cleanPath);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) {
    return direct;
  }

  // 2. HTML match (e.g. /pricing -> /pricing.html)
  const withHtml = path.join(__dirname, `${cleanPath}.html`);
  if (fs.existsSync(withHtml) && fs.statSync(withHtml).isFile()) {
    return withHtml;
  }

  // 3. Nested index.html match (e.g. /collections/ -> collections/index.html)
  const nestedIndex = path.join(__dirname, cleanPath, 'index.html');
  if (fs.existsSync(nestedIndex) && fs.statSync(nestedIndex).isFile()) {
    return nestedIndex;
  }

  // 4. Nested html match (e.g. /collections/ecliptic-gradients -> collections/ecliptic-gradients.html)
  const nestedHtml = path.join(__dirname, `${cleanPath}.html`);
  if (fs.existsSync(nestedHtml) && fs.statSync(nestedHtml).isFile()) {
    return nestedHtml;
  }

  // 404 fallback
  const notFound = path.join(__dirname, '404.html');
  if (fs.existsSync(notFound)) {
    return notFound;
  }

  return null;
}

const server = http.createServer((req, res) => {
  const filePath = resolveFile(req.url || '/');

  if (!filePath || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const is404 = path.basename(filePath) === '404.html' && req.url !== '/404' && req.url !== '/404.html';

  res.writeHead(is404 ? 404 : 200, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
  });

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});

server.listen(PORT, () => {
  console.log(`Grainient 1:1 Clone Server running at http://localhost:${PORT}`);
});
