/**
 * ВНИМАНИЕ: это НЕ фото из папки «поляки» — это картинки с Unsplash, сохранённые под «польскими» именами файлов.
 * Для продакшена и отзывов на сайте используйте sync-gallery-from-source.ps1 (Marub/1/проекты/поляки).
 *
 * Скачивает плейсхолдеры в public/projects/polaki/{1,2,3}.
 * Запуск: node scripts/download-polaki-assets.mjs
 */
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', 'public', 'projects', 'polaki');

/** Разные фото фасадов / частных домов (w=1600 для запаса по качеству). */
const u = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=82`;

/** Только проверенные id (иначе 404 с images.unsplash.com). */
const photoIds = [
  'photo-1600596542815-ffad4c1539a9',
  'photo-1600585154340-be6161a56a0c',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1600566753190-17f0baa2a6c3',
  'photo-1600585154084-4e5fe7c39198',
  'photo-1600607687644-c7171b42498f',
  'photo-1600585154526-990dced4db0d',
  'photo-1600566752355-35792bedcfea',
  'photo-1600047509807-ba8f99d2cdde',
  'photo-1600585154363-67eb9e2e2099',
  'photo-1512917774080-9991f1c4c750',
  'photo-1568605114967-8130f3a36994',
  'photo-1518780664697-55e3ad937233',
  'photo-1600596542815-ffad4c1539a9',
  'photo-1600585154340-be6161a56a0c',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1600566753190-17f0baa2a6c3',
  'photo-1568605114967-8130f3a36994',
  'photo-1600585154526-990dced4db0d',
  'photo-1600047509807-ba8f99d2cdde',
  'photo-1512917774080-9991f1c4c750',
  'photo-1600585154084-4e5fe7c39198',
  'photo-1600566752355-35792bedcfea',
  'photo-1600607687644-c7171b42498f',
  'photo-1600585154363-67eb9e2e2099',
  'photo-1518780664697-55e3ad937233',
  'photo-1600596542815-ffad4c1539a9',
  'photo-1600585154340-be6161a56a0c',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1600566753190-17f0baa2a6c3',
  'photo-1600585154526-990dced4db0d',
];

async function download(url, dest) {
  const res = await fetch(url, { headers: { Accept: 'image/jpeg' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
}

const jobs = [];

const names1 = [
  'PU-Piastowska_49-12-NET-1.jpg',
  'PU-Piastowska_49-14-NET-1.jpg',
  'PU-Piastowska_49-15-NET-1.jpg',
  'PU-Piastowska_49-1-NET-1-683x1024.jpg',
  'PU-Piastowska_49-3-NET-1-683x1024.jpg',
  'PU-Piastowska_49-7-NET-1-1024x683.jpg',
];
names1.forEach((name, i) => {
  jobs.push({ url: u(photoIds[i]), dest: join(root, '1', name) });
});

const names2 = [
  'PU-Witkowicka_Krakow-Piza-1-NET-1024x677.jpg',
  'PU-Witkowicka_Krakow-Piza-10-scaled.jpg',
  'PU-Witkowicka_Krakow-Piza-13-677x1024.jpg',
  'PU-Witkowicka_Krakow-Piza-16-1024x677.jpg',
  'PU-Witkowicka_Krakow-Piza-17-NET-1024x677.jpg',
  'PU-Witkowicka_Krakow-Piza-18-NET-677x1024.jpg',
  'PU-Witkowicka_Krakow-Piza-19-677x1024.jpg',
  'PU-Witkowicka_Krakow-Piza-22-677x1024.jpg',
  'PU-Witkowicka_Krakow-Piza-4-scaled.jpg',
  'PU-Witkowicka_Krakow-Piza-7-677x1024.jpg',
];
names2.forEach((name, i) => {
  jobs.push({ url: u(photoIds[6 + i]), dest: join(root, '2', name) });
});

const names3 = [
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-1-1024x677.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-10-677x1024.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-12-868x1024.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-13-677x1024.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-14-1024x677.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-15-1024x833.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-16-1024x677.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-3-1024x677.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-4-1024x677.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-5-1024x677.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-6-1024x677.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-7-scaled.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-8-677x1024.jpg',
  'PU-Gerberowa-Wroclaw-E_10115-E_9863-E_7212-9-677x1024.jpg',
  'unnamed (1).jpg',
];
names3.forEach((name, i) => {
  jobs.push({ url: u(photoIds[16 + i]), dest: join(root, '3', name) });
});

let ok = 0;
for (const { url, dest } of jobs) {
  process.stdout.write(`→ ${dest.split('polaki')[1]} … `);
  try {
    await download(url, dest);
    console.log('ok');
    ok++;
  } catch (e) {
    console.log('FAIL', e.message);
  }
}
console.log(`\nГотово: ${ok}/${jobs.length} файлов.`);
