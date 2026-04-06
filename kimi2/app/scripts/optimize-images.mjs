/**
 * optimize-images.mjs
 * Конвертирует PNG/JPEG в WebP во всех подпапках public/
 * Запуск: node scripts/optimize-images.mjs
 *
 * Требует sharp: npm install --save-dev sharp
 */

import { readdir, stat, rename } from 'fs/promises';
import { existsSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('❌  sharp не установлен. Запустите: npm install --save-dev sharp');
  process.exit(1);
}

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

// Максимальная сторона для каталожных изображений
const CATALOG_MAX_PX = 1400;
// Качество WebP
const WEBP_QUALITY = 82;
// Максимальная сторона для hero и крупных изображений
const HERO_MAX_PX = 2000;

let converted = 0;
let skipped = 0;
let errors = 0;

async function convertToWebP(srcPath, maxPx) {
  const ext = extname(srcPath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const destPath = srcPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  if (existsSync(destPath)) {
    skipped++;
    // console.log(`  ⏭  уже есть: ${basename(destPath)}`);
    return;
  }

  try {
    const img = sharp(srcPath).resize({ width: maxPx, height: maxPx, fit: 'inside', withoutEnlargement: true });
    await img.webp({ quality: WEBP_QUALITY }).toFile(destPath);
    const srcSize = (await stat(srcPath)).size;
    const dstSize = (await stat(destPath)).size;
    const saved = ((1 - dstSize / srcSize) * 100).toFixed(0);
    console.log(
      `  ✅  ${basename(srcPath)} → ${basename(destPath)}  (${(srcSize / 1024 / 1024).toFixed(1)}MB → ${(dstSize / 1024 / 1024).toFixed(1)}MB, −${saved}%)`
    );
    converted++;
  } catch (err) {
    console.error(`  ❌  Ошибка: ${srcPath}\n     ${err.message}`);
    errors++;
  }
}

async function walkDir(dir, maxPx) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath, maxPx);
    } else {
      await convertToWebP(fullPath, maxPx);
    }
  }
}

async function main() {
  console.log('🔄  Оптимизация изображений MARROB\n');

  // 1. Обрабатываем ВСЕ изображения рекурсивно по всей папке public/
  console.log(`📁  public/ (max ${HERO_MAX_PX}px, для каталога ${CATALOG_MAX_PX}px)…`);
  
  async function walkAll(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'catalog' && dir === PUBLIC_DIR) {
        // Каталог жмем сильнее
        await walkDir(join(dir, entry.name), CATALOG_MAX_PX);
      } else if (entry.isDirectory()) {
         await walkAll(join(dir, entry.name));
      } else {
         await convertToWebP(join(dir, entry.name), HERO_MAX_PX);
      }
    }
  }

  await walkAll(PUBLIC_DIR);

  // 2. Обновляем manifest.json
  const manifestPath = join(PUBLIC_DIR, 'catalog', 'manifest.json');
  if (existsSync(manifestPath)) {
    const { readFile, writeFile } = await import('fs/promises');
    let content = await readFile(manifestPath, 'utf8');
    // Заменяем расширения в manifest на .webp
    content = content.replace(/\.(png|jpg|jpeg)"/g, '.webp"');
    await writeFile(manifestPath, content, 'utf8');
    console.log('\n📄  manifest.json обновлён — расширения заменены на .webp');
  }

  console.log(`\n✨  Готово! Конвертировано: ${converted}, уже было: ${skipped}, ошибок: ${errors}`);
  if (converted > 0) {
    console.log('\n⚠️   Не забудьте обновить ссылки в коде! (Hero.tsx уже обновлён — использует <picture> с .webp fallback)');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
