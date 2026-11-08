import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5174;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
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
};

function resolveFile(urlPath) {
  const cleanPath = urlPath.split('?')[0].replace(/^\/+/, '');

  if (!cleanPath) {
    return path.join(__dirname, 'index.html');
  }

  const directRoot = path.join(__dirname, cleanPath);
  if (fs.existsSync(directRoot) && fs.statSync(directRoot).isFile()) {
    return directRoot;
  }

  const htmlRoot = path.join(__dirname, `${cleanPath}.html`);
  if (fs.existsSync(htmlRoot) && fs.statSync(htmlRoot).isFile()) {
    return htmlRoot;
  }

  const nestedRoot = path.join(__dirname, cleanPath, 'index.html');
  if (fs.existsSync(nestedRoot) && fs.statSync(nestedRoot).isFile()) {
    return nestedRoot;
  }

  const distDirect = path.join(__dirname, 'dist', cleanPath);
  if (fs.existsSync(distDirect) && fs.statSync(distDirect).isFile()) {
    return distDirect;
  }

  const distHtml = path.join(__dirname, 'dist', `${cleanPath}.html`);
  if (fs.existsSync(distHtml) && fs.statSync(distHtml).isFile()) {
    return distHtml;
  }

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

  const is404Page = path.basename(filePath) === '404.html' && req.url !== '/404' && req.url !== '/404.html';
  res.writeHead(is404Page ? 404 : 200, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
  });

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});

server.listen(PORT, () => {
  console.log(`Grainient App running at http://localhost:${PORT}`);
});
