/**
 * optimize-remote-catalog.mjs
 * ============================
 * 1. Подключается к FTP reg.ru
 * 2. Скачивает все PNG/JPG из папки catalog/
 * 3. Конвертирует в WebP (sharp, max 1400px, quality 82)
 * 4. Заливает WebP обратно на сервер
 * 5. Обновляет manifest.json на сервере и локально
 *
 * Локальный запуск (из папки kimi2/app):
 *   npm install --save-dev sharp basic-ftp
 *   node scripts/optimize-remote-catalog.mjs
 *
 * В GitHub Actions запускается через workflow optimize-catalog-images.yml
 */

import * as ftp from 'basic-ftp';
import { createRequire } from 'module';
import { mkdirSync, existsSync, rmSync, statSync } from 'fs';
import { writeFile, readFile, mkdir } from 'fs/promises';
import path, { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';

const require = createRequire(import.meta.url);
let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('❌  sharp не найден. Установите: npm install --save-dev sharp basic-ftp');
  process.exit(1);
}

// ─── Настройки (env → fallback) ─────────────────────────────
const FTP_HOST     = process.env.FTP_HOST     || '37.140.192.16';
const FTP_PORT     = Number(process.env.FTP_PORT || 21);
const FTP_USER     = process.env.FTP_USER     || 'u1277917_Vlad';
const FTP_PASSWORD = process.env.FTP_PASSWORD || 'QAZwsxedc889121!';
const REMOTE_ROOT  = process.env.FTP_REMOTE_PATH || '/www/marrob.ru';

const CATALOG_REMOTE = `${REMOTE_ROOT}/catalog`;

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const TMP_DIR   = join(__dirname, '..', '.tmp-catalog-opt');
const WEBP_QUALITY = 82;
const MAX_PX       = 1400;

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg']);

// ─── Утилиты ────────────────────────────────────────────────
function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

async function convertToWebP(srcPath, destPath) {
  await sharp(srcPath)
    .resize({ width: MAX_PX, height: MAX_PX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(destPath);
}

// ─── Рекурсивный список файлов на FTP ───────────────────────
async function listAllImages(client, remoteDir) {
  let list;
  try {
    list = await client.list(remoteDir);
  } catch {
    return [];
  }
  const results = [];
  for (const item of list) {
    if (item.name === '.' || item.name === '..') continue;
    const fullPath = `${remoteDir}/${item.name}`;
    if (item.isDirectory) {
      const sub = await listAllImages(client, fullPath);
      results.push(...sub);
    } else {
      const ext = extname(item.name).toLowerCase();
      if (IMAGE_EXTS.has(ext)) {
        results.push({ remotePath: fullPath, name: item.name, size: item.size ?? 0 });
      }
    }
  }
  return results;
}

// ─── Проверка, существует ли файл на FTP ────────────────────
async function remoteExists(client, remotePath) {
  try {
    await client.size(remotePath);
    return true;
  } catch {
    return false;
  }
}

// ─── Главная функция ─────────────────────────────────────────
async function main() {
  console.log('🚀  Оптимизация каталога MARROB на хостинге reg.ru\n');
  console.log(`   FTP: ${FTP_USER}@${FTP_HOST}:${FTP_PORT}`);
  console.log(`   Каталог: ${CATALOG_REMOTE}\n`);

  ensureDir(TMP_DIR);

  const client = new ftp.Client(30000);
  client.ftp.verbose = false;

  try {
    await client.access({
      host: FTP_HOST,
      port: FTP_PORT,
      user: FTP_USER,
      password: FTP_PASSWORD,
      secure: false,
    });
    console.log('✅  FTP-соединение установлено\n');
  } catch (err) {
    console.error(`❌  Не удалось подключиться к FTP: ${err.message}`);
    process.exit(1);
  }

  // 1. Получить список файлов
  console.log('📋  Сканируем catalog/ на сервере…');
  const files = await listAllImages(client, CATALOG_REMOTE);
  const totalSizeMB = (files.reduce((s, f) => s + (f.size || 0), 0) / 1024 / 1024).toFixed(1);
  console.log(`   Найдено изображений: ${files.length}  (суммарно ~${totalSizeMB} МБ)\n`);

  if (files.length === 0) {
    console.log('⚠️   Нет файлов для обработки. Завершение.');
    client.close();
    return;
  }

  let converted = 0;
  let skipped = 0;
  let errors = 0;

  // 2. Для каждого файла — скачать, сконвертировать, залить
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const progress = `[${i + 1}/${files.length}]`;

    const relPath   = file.remotePath.replace(CATALOG_REMOTE + '/', '');
    const localSrc  = join(TMP_DIR, 'src',  relPath);
    const webpName  = basename(relPath).replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const localDest = join(TMP_DIR, 'out',  dirname(relPath), webpName);
    const remoteDest = file.remotePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    // Проверим, не залит ли уже WebP
    if (await remoteExists(client, remoteDest)) {
      skipped++;
      console.log(`  ⏭   ${progress} ${basename(relPath)} — WebP уже есть`);
      continue;
    }

    try {
      // Скачиваем оригинал
      ensureDir(dirname(localSrc));
      await client.downloadTo(localSrc, file.remotePath);
      const srcSize = statSync(localSrc).size;

      // Конвертируем
      ensureDir(dirname(localDest));
      await convertToWebP(localSrc, localDest);
      const dstSize = statSync(localDest).size;
      const saved = (((srcSize - dstSize) / srcSize) * 100).toFixed(0);

      // Заливаем WebP
      await client.uploadFrom(localDest, remoteDest);

      console.log(
        `  ✅  ${progress} ${basename(relPath)} → ${webpName}` +
        `  (${(srcSize / 1048576).toFixed(1)}MB → ${(dstSize / 1048576).toFixed(1)}MB, −${saved}%)`
      );
      converted++;

      // Чистим временные файлы сразу (экономим место)
      rmSync(localSrc, { force: true });
      rmSync(localDest, { force: true });

    } catch (err) {
      console.error(`  ❌  ${progress} ${relPath}: ${err.message}`);
      errors++;
    }
  }

  // 3. Обновить manifest.json на сервере
  console.log('\n📄  Обновляем manifest.json…');
  try {
    const manifestRemote  = `${CATALOG_REMOTE}/manifest.json`;
    const manifestLocal   = join(TMP_DIR, 'manifest.json');
    const manifestUpdated = join(TMP_DIR, 'manifest-updated.json');

    await client.downloadTo(manifestLocal, manifestRemote);
    let content = await readFile(manifestLocal, 'utf8');
    content = content.replace(/\.(png|jpg|jpeg)"/g, '.webp"');

    await writeFile(manifestUpdated, content, 'utf8');
    await client.uploadFrom(manifestUpdated, manifestRemote);
    console.log('  ✅  manifest.json обновлён на сервере');

    // Также обновляем локальный manifest (для следующего build)
    const localManifest = join(__dirname, '..', 'public', 'catalog', 'manifest.json');
    if (existsSync(localManifest)) {
      await writeFile(localManifest, content, 'utf8');
      console.log('  ✅  Локальный manifest.json тоже обновлён');
    }
  } catch (err) {
    console.error(`  ❌  Ошибка обновления manifest.json: ${err.message}`);
  }

  client.close();

  // 4. Финальная очистка
  rmSync(TMP_DIR, { recursive: true, force: true });

  // 5. Итоги
  console.log('\n' + '='.repeat(50));
  console.log('✨  Оптимизация завершена!');
  console.log(`   ✅  Конвертировано: ${converted} файлов`);
  console.log(`   ⏭   Уже было WebP:  ${skipped} файлов`);
  console.log(`   ❌  Ошибок:         ${errors} файлов`);
  console.log('='.repeat(50));

  if (errors > 0) process.exit(1);
}

main().catch((err) => {
  console.error('\n💥  Критическая ошибка:', err.message);
  process.exit(1);
});
