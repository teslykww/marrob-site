/**
 * Загрузка содержимого dist/ на reg.ru по FTP.
 * Пароль НЕ храните в git — только в .env.deploy (локально) или в переменной окружения.
 *
 *   npm run build:deploy
 *   npm run deploy:ftp
 *
 * Либо: скопируйте .env.deploy.example → .env.deploy и заполните FTP_PASSWORD=
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from 'basic-ftp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvDeploy() {
  const envPath = path.join(__dirname, '..', '.env.deploy');
  if (!fs.existsSync(envPath)) return {};
  const text = fs.readFileSync(envPath, 'utf8');
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const fileEnv = loadEnvDeploy();
const host = process.env.FTP_HOST || fileEnv.FTP_HOST || '37.140.192.16';
const user = process.env.FTP_USER || fileEnv.FTP_USER || 'u1277917_Vlad';
const password = process.env.FTP_PASSWORD ?? fileEnv.FTP_PASSWORD ?? '';
const remotePath = process.env.FTP_REMOTE_PATH || fileEnv.FTP_REMOTE_PATH || '/www/marrob.ru';
const port = Number(process.env.FTP_PORT || fileEnv.FTP_PORT || 21);

const distPath = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(path.join(distPath, 'index.html'))) {
  console.error('Нет dist/index.html. Сначала: npm run build');
  process.exit(1);
}

if (!password) {
  console.error(
    'Укажите пароль FTP:\n' +
      '  1) Создайте kimi2/app/.env.deploy по образцу .env.deploy.example (FTP_PASSWORD=...)\n' +
      '  2) Или в PowerShell: $env:FTP_PASSWORD="ваш_пароль"; npm run deploy:ftp\n',
  );
  process.exit(1);
}

const client = new Client(60_000);
client.ftp.verbose = process.env.FTP_VERBOSE === '1';

try {
  await client.access({
    host,
    user,
    password,
    port,
    secure: false,
  });

  await client.ensureDir(remotePath);
  await client.cd(remotePath);
  console.log('FTP: загрузка', distPath, '→', remotePath, '...');
  await client.uploadFromDir(distPath);
  console.log('Готово: сайт загружен на', remotePath);
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  client.close();
}
