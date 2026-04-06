import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SRC_DIR = join(__dirname, '../src');

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else {
      const ext = extname(fullPath).toLowerCase();
      if (['.tsx', '.ts'].includes(ext)) {
        let content = await readFile(fullPath, 'utf8');
        // Заменяем расширения .png, .jpg, .jpeg на .webp, но проверяем, чтобы это были пути (через кавычки или обратные одинарные)
        const regex = /\.((png|jpg|jpeg)(?=['"`]))/gi;
        if (regex.test(content)) {
          content = content.replace(regex, '.webp');
          await writeFile(fullPath, content, 'utf8');
          console.log(`✅ Обновлен файл: ${entry.name}`);
        }
      }
    }
  }
}

async function main() {
  console.log('🔄 Замена .png и .jpg на .webp в исходниках...');
  await walkDir(SRC_DIR);
  console.log('✨ Готово! Все ссылки в коде теперь ведут на WebP.');
}

main().catch(console.error);
