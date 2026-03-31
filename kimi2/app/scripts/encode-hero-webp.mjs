/**
 * Конвертирует public/hero-bg.png → public/hero-bg.webp для <picture> в Hero.
 * Запуск: npm run optimize:hero
 */
import { readFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const inputPath = join(root, 'public', 'hero-bg.png');
const outputPath = join(root, 'public', 'hero-bg.webp');

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('Пакет `sharp` не установлен. Выполните: npm install');
    process.exit(1);
  }

  let inputBuf;
  try {
    inputBuf = await readFile(inputPath);
  } catch {
    console.error(`Не найден файл: ${inputPath}`);
    console.error('Положите исходный фон героя как public/hero-bg.png и запустите снова.');
    process.exit(1);
  }

  const meta = await sharp(inputBuf).metadata();
  await sharp(inputBuf)
    .webp({
      quality: 82,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(outputPath);

  const inStat = await stat(inputPath);
  const outStat = await stat(outputPath);
  const ratio = ((1 - outStat.size / inStat.size) * 100).toFixed(1);

  console.log(`hero-bg: ${meta.width}×${meta.height}`);
  console.log(`PNG  ${(inStat.size / 1024).toFixed(1)} KiB`);
  console.log(`WebP ${(outStat.size / 1024).toFixed(1)} KiB (−${ratio}% от PNG)`);
  console.log(`→ ${outputPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
