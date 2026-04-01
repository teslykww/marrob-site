/**
 * После `npm run build` проверяет, что в dist есть фронт + статика (картинки из public/ и т.д.).
 * Запуск: node scripts/check-dist-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');

function walk(dir) {
  let n = 0;
  let bytes = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      const w = walk(p);
      n += w.files;
      bytes += w.bytes;
    } else {
      n += 1;
      bytes += fs.statSync(p).size;
    }
  }
  return { files: n, bytes };
}

function topLevel(distPath) {
  return fs.readdirSync(distPath, { withFileTypes: true }).map((e) => ({
    name: e.name,
    dir: e.isDirectory(),
  }));
}

if (!fs.existsSync(dist)) {
  console.error('Нет папки dist. Сначала выполните: npm run build');
  process.exit(1);
}

const indexHtml = path.join(dist, 'index.html');
if (!fs.existsSync(indexHtml)) {
  console.error('В dist нет index.html — сборка неполная.');
  process.exit(1);
}

const assetsDir = path.join(dist, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('В dist нет папки assets — проверьте сборку Vite.');
  process.exit(1);
}

const { files, bytes } = walk(dist);
const top = topLevel(dist);

console.log('');
console.log('=== Готово к выгрузке на хостинг (reg.ru и т.п.) ===');
console.log('Каталог:', dist);
console.log('Файлов всего:', files);
console.log('Общий размер:', (bytes / 1024 / 1024).toFixed(2), 'МБ');
console.log('');
console.log('Содержимое верхнего уровня dist (и это нужно залить ЦЕЛИКОМ на сервер):');
for (const t of top.sort((a, b) => a.name.localeCompare(b.name))) {
  console.log('  -', t.name + (t.dir ? '/' : ''));
}
console.log('');
console.log('В эту папку входят: index.html, JS/CSS из Vite (assets/),');
console.log('а также ВСЁ из public/: картинки, сертификаты, favicon, .htaccess и т.д.');
console.log('');
