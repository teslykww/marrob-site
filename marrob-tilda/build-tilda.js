/**
 * Сборка файлов для переноса на Tilda.
 * Создаёт папку tilda-export с файлами для вставки в блоки Zero и полной страницей.
 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const outDir = path.join(dir, 'tilda-export');
const kimiPublic = path.join(dir, '..', 'kimi2', 'app', 'public');

/** Базовый URL опубликованного лендинга (Vercel / основной домен) — картинки станут абсолютными. */
function loadPublicBaseUrl() {
  const env = (process.env.MARROB_PUBLIC_BASE_URL || '').trim();
  if (env) return env.replace(/\/+$/, '');
  try {
    const cfgPath = path.join(dir, 'asset-base.config.json');
    if (fs.existsSync(cfgPath)) {
      const j = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
      const u = (j.publicBaseUrl || '').trim();
      if (u) return u.replace(/\/+$/, '');
    }
  } catch (_) {
    /* ignore */
  }
  return '';
}

const publicBaseUrl = loadPublicBaseUrl();

/** Подставляет абсолютные URL для src / data-src / fallback в onerror. Уже https:// не трогает. */
function applyPublicBase(html) {
  if (!publicBaseUrl) return html;
  const base = publicBaseUrl.replace(/\/+$/, '');
  function abs(u) {
    if (!u || /^https?:\/\//i.test(u) || u.startsWith('data:') || u.startsWith('#')) return u;
    return `${base}/${u.replace(/^\/+/, '')}`;
  }
  let out = html.replace(/\bsrc="([^"]*)"/gi, (_, u) => `src="${abs(u)}"`);
  out = out.replace(/\bsrc='([^']*)'/gi, (_, u) => `src='${abs(u)}'`);
  out = out.replace(/\bdata-src="([^"]*)"/gi, (_, u) => `data-src="${abs(u)}"`);
  out = out.replace(/this\.src='([^']*)'/g, (_, u) => `this.src='${abs(u)}'`);
  return out;
}

const globalContent = fs.readFileSync(path.join(dir, '00-global.html'), 'utf8');
/* Порядок как на сайте kimi2/app: Hero → преимущества (03, 8 карточек) → … → Certs → … → Footer → виджет */
/** Порядок секций как в kimi2/app/src/App.tsx (+ Header/Footer/виджеты в main.tsx). Без отдельного mid-page CTA — на Vercel его нет. */
const blockFiles = [
  '01-header.html', '02-hero.html', '03-problem.html', '04-solution.html', '04a-before-after.html',
  '06-catalog.html', '15-lead-magnet.html',
  '07-gallery.html', '07a-reviews.html', '12-certs.html', '08-specs.html', '10-trust.html',
  '09-purchase-options.html', '14-stages.html',
  '16-contact.html',
  '13-faq.html', '12-footer.html',
  '98-widget-messenger.html',
  '97-cta-popup.html', '96-sticky-quiz.html', '99-scroll-animations.html'
];

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Копирование assets (сертификаты и др.) в tilda-export
const assetsSrc = path.join(dir, 'assets');
const assetsDst = path.join(outDir, 'assets');
if (fs.existsSync(assetsSrc)) {
  if (fs.cpSync) {
    fs.cpSync(assetsSrc, assetsDst, { recursive: true });
  } else {
    if (!fs.existsSync(assetsDst)) fs.mkdirSync(assetsDst, { recursive: true });
    fs.readdirSync(assetsSrc).forEach(name => {
      const s = path.join(assetsSrc, name);
      const d = path.join(assetsDst, name);
      if (fs.statSync(s).isDirectory()) {
        if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
        fs.readdirSync(s).forEach(sub => {
          fs.copyFileSync(path.join(s, sub), path.join(d, sub));
        });
      } else {
        fs.copyFileSync(s, d);
      }
    });
  }
}

// Портфолио: polaki + moscow из kimi2 (пути projects/... в 07-gallery)
const projectsSrc = path.join(dir, '..', 'kimi2', 'app', 'public', 'projects');
const projectsDst = path.join(outDir, 'projects');
if (fs.existsSync(projectsSrc) && fs.cpSync) {
  fs.cpSync(projectsSrc, projectsDst, { recursive: true });
}

// Статика сайта: офис в блоке контактов и др. (пути images/... в 16-contact)
const imagesSrc = path.join(dir, '..', 'kimi2', 'app', 'public', 'images');
const imagesDst = path.join(outDir, 'images');
if (fs.existsSync(imagesSrc) && fs.cpSync) {
  fs.cpSync(imagesSrc, imagesDst, { recursive: true });
}

// Статика как на Vercel: корень public/ (те же пути, что у React после деплоя)
function copyFromKimiPublic(rel) {
  const s = path.join(kimiPublic, rel);
  const d = path.join(outDir, rel);
  if (!fs.existsSync(s) || !fs.cpSync) return;
  const st = fs.statSync(s);
  if (st.isDirectory()) {
    fs.cpSync(s, d, { recursive: true });
  } else {
    fs.mkdirSync(path.dirname(d), { recursive: true });
    fs.copyFileSync(s, d);
  }
}
copyFromKimiPublic('logo.png');
copyFromKimiPublic('hero-bg.png');
copyFromKimiPublic('solution-scheme.png');
copyFromKimiPublic('certs');

function readBlockTransformed(fileName) {
  const raw = fs.readFileSync(path.join(dir, fileName), 'utf8');
  return applyPublicBase(raw);
}

// Код для вставки в <head> (Настройки страницы → Дополнительно → Код в <head>)
const headContent = globalContent.replace(/<!--[\s\S]*?-->/, '').trim();
fs.writeFileSync(
  path.join(outDir, '00-вставьте-в-head.html'),
  headContent,
  'utf8'
);
// То же содержимое, ASCII-имя (удобно искать; на Windows кириллица в имени файла путает проводник)
fs.writeFileSync(path.join(outDir, '00-global.html'), headContent, 'utf8');

// Старые нумерованные HTML от прошлых сборок — удалить блоки 01-…21- перед записью.
// Не трогаем 00-* (head) и прочие файлы.
try {
  fs.readdirSync(outDir).forEach((name) => {
    if (/^\d{2}-.+\.html$/.test(name) && !/^00-/.test(name)) {
      fs.unlinkSync(path.join(outDir, name));
    }
  });
} catch (_) {
  /* нет папки */
}

// Блоки по порядку — вставлять в блоки Zero по очереди
const outBlockNames = [];
blockFiles.forEach((f, i) => {
  const num = String(i + 1).padStart(2, '0');
  const base = f.replace(/\.html$/, '');
  const content = readBlockTransformed(f);
  const outName = num + '-' + base + '.html';
  outBlockNames.push(outName);
  fs.writeFileSync(path.join(outDir, outName), content, 'utf8');
});

// Все блоки одним файлом — для вставки в один Zero-блок (тест)
let body = '';
blockFiles.forEach((f) => {
  body += readBlockTransformed(f) + '\n';
});
const bodyOnlyBanner = `<!--
  MARROB — это НЕ полная HTML-страница, только фрагменты для <body>.
  Обязательно: вставьте в <head> страницы содержимое 00-global.html или 00-вставьте-в-head.html (одинаковые; шрифты, переменные, базовые стили).
  Полная страница для браузера: полная-страница.html или index.html (DOCTYPE + head + все блоки).
  В этом файле подряд: ${blockFiles.length} блоков (${blockFiles.join(', ')}).
-->
`;
fs.writeFileSync(
  path.join(outDir, 'все-блоки-одним-файлом.html'),
  bodyOnlyBanner + body,
  'utf8'
);

// Полная страница index.html (как в корне после build-index.js)
const fullHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MARROB — Фасадные термопанели</title>
  ${headContent}
</head>
<body>
${body}
</body>
</html>`;
fs.writeFileSync(path.join(outDir, 'index.html'), fullHtml, 'utf8');
// То же самое — явное имя «полная страница» (часто ищут не index.html)
fs.writeFileSync(path.join(outDir, 'полная-страница.html'), fullHtml, 'utf8');

// Страница дилеров
try {
  const dealersContent = applyPublicBase(fs.readFileSync(path.join(dir, 'dealers.html'), 'utf8'));
  fs.writeFileSync(path.join(outDir, 'dealers.html'), dealersContent, 'utf8');
} catch (e) {
  // dealers.html может отсутствовать
}

try {
  fs.copyFileSync(path.join(dir, 'asset-base.config.json'), path.join(outDir, 'asset-base.config.json'));
} catch (_) {
  /* optional */
}

// Инструкция: порядок блоков с описанием
const blockDescriptions = [
  'Шапка: меню как на сайте (в т.ч. Преимущества, Сертификаты, Этапы)',
  'Hero: полноэкранное фото, текст как на kimi2 (assets/hero-bg.png)',
  'Преимущества: 8 карточек (#about), как на актуальном kimi2',
  'Решение: схема PNG + зелёный CTA с формой (как kimi2)',
  'До/После — слайдер',
  'Каталог: табы, кнопка «Смотреть каталог»',
  'Лид-магнит «Скачать прайс»',
  'Портфолио: 3 объекта (как на kimi2), лайтбокс',
  'Отзывы клиентов',
  'Сертификаты (#certs)',
  'Характеристики (#specs)',
  'Гарантия и производство',
  'Варианты покупки',
  'Этапы работ (#stages)',
  'Контакты: карточки + форма (#contact)',
  'FAQ',
  'Подвал',
  'Виджет мессенджеров',
  'Попап заявки',
  'Квиз',
  'Скрипты: счётчики, анимации'
];
const blockList = outBlockNames.map((n, i) => `   - ${n}`).join('\n');
const blockTableRows = outBlockNames.map((n, i) => `| ${i + 1} | **${n}** | ${blockDescriptions[i] || ''} |`).join('\n');
const readme = `# Экспорт для Tilda

## Порядок вставки: ничего не пропустить

Сделайте по шагам. Каждый блок — один блок **Zero (Блок 0)** на странице Tilda.

### Шаг 0. Код в head (один раз для страницы)

| № | Файл | Куда в Tilda |
|---|------|----------------|
| 0 | **00-global.html** (или **00-вставьте-в-head.html** — то же содержимое) | Настройки страницы → Дополнительно → **Код в head** — вставить **целиком** |

Без этого шага блоки будут без нужных шрифтов и цветов.

### Шаги 1–21. Блоки по порядку (сверху вниз)

Добавляйте блоки **Zero** по одному и вставляйте в них указанный файл **целиком**.

| № | Имя файла в папке tilda-export | Что это |
|---|--------------------------------|--------|
${blockTableRows}

Итого: **21 блок Zero** подряд, в этом порядке (как на актуальном лендинге kimi2 / Vercel). Можно отмечать галочкой по таблице.

### Вариант «всё сразу»

Чтобы не вставлять 21 блок по отдельности: один блок Zero → вставить содержимое **все-блоки-одним-файлом.html**. Перед этим обязательно **Шаг 0** (код в head).  
Файл **все-блоки-одним-файлом.html** — только тело страницы (без \`<!DOCTYPE>\` и \`<head>\`); в начале есть комментарий-напоминание.

### Полная страница целиком

**полная-страница.html** и **index.html** — одинаковые: полный документ (head + body). Откройте в браузере для проверки или используйте, если нужен один самодостаточный HTML-файл.

---

## Остальное

1. **Код в head** и **блоки** — см. Шаги 0 и 1–21 выше (или вариант «всё сразу»).

2. **Тест: все блоки в одном Zero**  
   Файл \`все-блоки-одним-файлом.html\` — все блоки подряд. Сначала код в head, затем один блок Zero с этим файлом.

3. **Альтернатива**  
   Файлы \`полная-страница.html\` / \`index.html\` — готовая полная страница. Можно открыть в браузере для проверки или вставить в один блок «Другой HTML-код», если Tilda это позволяет.

4. **Страница дилеров**  
   \`dealers.html\` — отдельная страница для раздела «Дилерам». Опубликуйте как отдельную страницу и привяжите ссылку в меню.

5. **Картинки — те же файлы, что на Vercel (без ручной замены URL)**  
   В \`asset-base.config.json\` укажите \`publicBaseUrl\` — URL вашего деплоя **без** слэша в конце (например \`https://marrob.vercel.app\`). При сборке (\`npm run build\`) все \`src\` и \`data-src\` с относительными путами станут абсолютными и будут указывать на тот же \`public/\`, что и лендинг на Vercel: \`logo.png\`, \`hero-bg.png\`, \`solution-scheme.png\`, \`certs/cert-1.png\` … \`images/\`, \`projects/\`.  
   Альтернатива: \`set MARROB_PUBLIC_BASE_URL=https://...\` перед сборкой (Windows: \`set MARROB_PUBLIC_BASE_URL=...\` в cmd).  
   Если \`publicBaseUrl\` **пустой**, в HTML остаются относительные пути — удобно открыть \`tilda-export/index.html\` локально, если рядом лежат скопированные \`images/\`, \`projects/\`, \`certs/\`.

5a. **Галерея — папка \`projects/\`**  
   Скрипт копирует \`kimi2/app/public/projects\` в \`tilda-export/projects\`. На Tilda с включённым \`publicBaseUrl\` картинки подтягиваются с Vercel по тем же путам, что и на сайте.

6. **Пользовательские CSS-стили (Tilda)**  
   В настройках сайта/страницы есть поле «Пользовательские CSS-стили». Если вы вставили полный \`00-global.html\` в «Код в <head>», в это поле ничего вставлять не нужно — все стили и переменные уже в head.

7. **Если блоки отображаются криво**  
   Убедитесь, что в настройках страницы в «Код в <head>» действительно вставлено содержимое \`00-global.html\` или \`00-вставьте-в-head.html\` (шрифты и блок \`<style>\` с переменными \`:root\`). Без этого цвета, отступы и шрифты будут сбиваться. Если контейнеры Tilda добавляют свои отступы или ограничение ширины, в настройках шаблона/страницы можно отключить лишние отступы для зоны с Zero-блоками.

Собрано: ${new Date().toISOString().slice(0, 10)}
`;
fs.writeFileSync(path.join(outDir, 'README.md'), readme, 'utf8');

console.log(
  'tilda-export: файлов HTML/прочее:',
  blockFiles.length + 7,
  '(head: 00-global + 00-вставьте-в-head; блоки; все-блоки; index; полная-страница; dealers; README)'
);
console.log('Папка:', outDir);
if (publicBaseUrl) {
  console.log('publicBaseUrl:', publicBaseUrl, '(абсолютные URL картинок)');
} else {
  console.log('publicBaseUrl: (не задан — относительные пути; см. asset-base.config.json)');
}
