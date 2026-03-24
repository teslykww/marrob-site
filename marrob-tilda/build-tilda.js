/**
 * Сборка файлов для переноса на Tilda.
 * Создаёт папку tilda-export с файлами для вставки в блоки Zero и полной страницей.
 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const outDir = path.join(dir, 'tilda-export');

const globalContent = fs.readFileSync(path.join(dir, '00-global.html'), 'utf8');
/* Порядок как на сайте kimi2/app: … Stages → Contact → FAQ → Footer → виджет */
const blockFiles = [
  '01-header.html', '02-hero.html', '03-problem.html', '04-solution.html', '04a-before-after.html',
  '05-benefits.html', '06-catalog.html', '15-lead-magnet.html',
  '07-gallery.html', '07a-reviews.html', '12-certs.html', '08-specs.html', '10-trust.html',
  '09-purchase-options.html', '11-cta-form.html', '14-stages.html',
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

// Логотип шапки / плашки галереи (тот же файл, что в kimi2 Header: /logo.png)
const logoSrc = path.join(dir, '..', 'kimi2', 'app', 'public', 'logo.png');
const logoDst = path.join(outDir, 'logo.png');
if (fs.existsSync(logoSrc) && fs.cpSync) {
  fs.copyFileSync(logoSrc, logoDst);
}

// Код для вставки в <head> (Настройки страницы → Дополнительно → Код в <head>)
const headContent = globalContent.replace(/<!--[\s\S]*?-->/, '').trim();
fs.writeFileSync(
  path.join(outDir, '00-вставьте-в-head.html'),
  headContent,
  'utf8'
);

// Старые нумерованные копии блока отзывов (07a-reviews): при смене порядка блоков
// в папке остаётся, например, 12-07a-reviews.html с Unsplash — его нельзя вставлять в Tilda.
try {
  fs.readdirSync(outDir).forEach((name) => {
    if (/^\d{2}-07a-reviews\.html$/.test(name)) {
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
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const outName = num + '-' + base + '.html';
  outBlockNames.push(outName);
  fs.writeFileSync(path.join(outDir, outName), content, 'utf8');
});

// Все блоки одним файлом — для вставки в один Zero-блок (тест)
let body = '';
blockFiles.forEach(f => {
  body += fs.readFileSync(path.join(dir, f), 'utf8') + '\n';
});
const bodyOnlyBanner = `<!--
  MARROB — это НЕ полная HTML-страница, только фрагменты для <body>.
  Обязательно: вставьте в <head> страницы содержимое 00-вставьте-в-head.html (шрифты, переменные, базовые стили).
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
  const dealersContent = fs.readFileSync(path.join(dir, 'dealers.html'), 'utf8');
  fs.writeFileSync(path.join(outDir, 'dealers.html'), dealersContent, 'utf8');
} catch (e) {
  // dealers.html может отсутствовать
}

// Инструкция: порядок блоков с описанием
const blockDescriptions = [
  'Шапка: меню как на сайте (в т.ч. Преимущества, Сертификаты, Этапы)',
  'Hero: полноэкранное фото, текст как на kimi2 (assets/hero-bg.png)',
  'Блок «Проблема»: 4 карточки',
  'Решение: схема PNG + зелёный CTA с формой (как kimi2)',
  'До/После — слайдер',
  'Преимущества: коллаж-фон, 2 колонки (#benefits)',
  'Каталог: табы, кнопка «Смотреть каталог»',
  'Лид-магнит «Скачать прайс»',
  'Портфолио: 3 объекта (как на kimi2), лайтбокс',
  'Отзывы клиентов',
  'Сертификаты (#certs)',
  'Характеристики (#specs)',
  'Гарантия и производство',
  'Варианты покупки',
  'Форма «Получить расчёт»',
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
| 0 | **00-вставьте-в-head.html** | Настройки страницы → Дополнительно → **Код в head** — вставить **целиком** |

Без этого шага блоки будут без нужных шрифтов и цветов.

### Шаги 1–23. Блоки по порядку (сверху вниз)

Добавляйте блоки **Zero** по одному и вставляйте в них указанный файл **целиком**.

| № | Имя файла в папке tilda-export | Что это |
|---|--------------------------------|--------|
${blockTableRows}

Итого: **23 блока Zero** подряд, в этом порядке (как на актуальном лендинге kimi2). Можно отмечать галочкой по таблице.

### Вариант «всё сразу»

Вместо 23 отдельных блоков: один блок Zero → вставить содержимое **все-блоки-одним-файлом.html**. Перед этим обязательно **Шаг 0** (код в head).  
Файл **все-блоки-одним-файлом.html** — только тело страницы (без \`<!DOCTYPE>\` и \`<head>\`); в начале есть комментарий-напоминание.

### Полная страница целиком

**полная-страница.html** и **index.html** — одинаковые: полный документ (head + body). Откройте в браузере для проверки или используйте, если нужен один самодостаточный HTML-файл.

---

## Остальное

1. **Код в head** и **блоки** — см. Шаги 0 и 1–23 выше (или вариант «всё сразу»).

2. **Тест: все блоки в одном Zero**  
   Файл \`все-блоки-одним-файлом.html\` — все блоки подряд. Сначала код в head, затем один блок Zero с этим файлом.

3. **Альтернатива**  
   Файлы \`полная-страница.html\` / \`index.html\` — готовая полная страница. Можно открыть в браузере для проверки или вставить в один блок «Другой HTML-код», если Tilda это позволяет.

4. **Страница дилеров**  
   \`dealers.html\` — отдельная страница для раздела «Дилерам». Опубликуйте как отдельную страницу и привяжите ссылку в меню.

5. **Картинки из папки assets (на Tilda)**  
   Загрузите в **Медиабиблиотеку**: \`logo.png\`, \`hero-bg.png\`, \`solution-scheme.png\`, файлы из \`assets/certs/\`. В коде блоков замените пути \`assets/...\` на полные URL (\`https://static.tildacdn.com/...\`). Особенно: шапка, подвал, Hero, Решение, сертификаты, коллаж в преимуществах.

5a. **Галерея и отзывы — папка \`projects/\`**  
   В блоках используются пути \`projects/polaki/...\` и \`projects/moscow/...\`. Загрузите **всю папку \`projects\`** из этого экспорта в **корень опубликованного сайта** (рядом с index), чтобы картинки открывались по тем же относительным URL. Для **реальных** фото из кейсов «поляки» скопируйте файлы скриптом \`kimi2/app/scripts/sync-gallery-from-source.ps1\` в \`public/projects\`, затем снова выполните \`node build-tilda.js\`. Скрипт \`download-polaki-assets.mjs\` подставляет **плейсхолдеры Unsplash** под именами файлов — не путать с настоящим портфолио.

6. **Пользовательские CSS-стили (Tilda)**  
   В настройках сайта/страницы есть поле «Пользовательские CSS-стили». Если вы вставили полный \`00-вставьте-в-head.html\` в «Код в <head>», в это поле ничего вставлять не нужно — все стили и переменные уже в head.

7. **Если блоки отображаются криво**  
   Убедитесь, что в настройках страницы в «Код в <head>» действительно вставлено содержимое \`00-вставьте-в-head.html\` (шрифты и блок \`<style>\` с переменными \`:root\`). Без этого цвета, отступы и шрифты будут сбиваться. Если контейнеры Tilda добавляют свои отступы или ограничение ширины, в настройках шаблона/страницы можно отключить лишние отступы для зоны с Zero-блоками.

Собрано: ${new Date().toISOString().slice(0, 10)}
`;
fs.writeFileSync(path.join(outDir, 'README.md'), readme, 'utf8');

console.log('tilda-export: создано файлов', blockFiles.length + 5, '(head, блоки, все-блоки, index.html, полная-страница.html, dealers.html, README.md)');
console.log('Папка:', outDir);
