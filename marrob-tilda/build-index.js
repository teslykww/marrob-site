const fs = require('fs');
const path = require('path');

const dir = __dirname;
const globalContent = fs.readFileSync(path.join(dir, '00-global.html'), 'utf8');
const blockFiles = [
  '01-header.html', '02-hero.html', '03-problem.html', '04-solution.html',
  '05-benefits.html', '16-comparison.html', '06-catalog.html', '15-lead-magnet.html', '07-gallery.html', '08-specs.html',
  '09-purchase-options.html', '10-trust.html', '11-cta-form.html',
  '13-faq.html', '14-stages.html', '98-widget-messenger.html', '12-footer.html',
  '97-cta-popup.html', '99-scroll-animations.html'
];

let body = '';
blockFiles.forEach(f => {
  body += fs.readFileSync(path.join(dir, f), 'utf8') + '\n';
});

const headContent = globalContent.replace(/<!--[\s\S]*?-->/, '').trim();

const html = `<!DOCTYPE html>
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

fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
console.log('index.html created');
