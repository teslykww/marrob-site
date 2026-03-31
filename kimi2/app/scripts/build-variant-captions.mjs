/**
 * Однократная генерация public/catalog/variant-captions.json с marrob.ru.
 * У сайта может быть просроченный TLS-сертификат — для локального запуска:
 *   set NODE_TLS_REJECT_UNAUTHORIZED=0   (Windows)
 *   NODE_TLS_REJECT_UNAUTHORIZED=0 node scripts/build-variant-captions.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'public/catalog/manifest.json');
const OUT_PATH = path.join(ROOT, 'public/catalog/variant-captions.json');

if (process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0') {
  console.warn(
    '[build-variant-captions] Set NODE_TLS_REJECT_UNAUTHORIZED=0 if fetch fails (expired cert on marrob.ru).'
  );
}

async function fetchText(url) {
  const r = await fetch(url, { redirect: 'follow' });
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.text();
}

function parseCategoryProducts(html) {
  const re =
    /href="(https:\/\/marrob\.ru\/product\/[^"]+)"[^>]*>[\s\S]*?woocommerce-loop-product__title">([^<]+)<\/h2>/g;
  const seen = new Set();
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    const url = m[1];
    const title = m[2].trim();
    if (seen.has(url)) continue;
    seen.add(url);
    out.push({ url, title });
  }
  return out;
}

function isCaptionGarbage(t) {
  const s = t.trim();
  if (!s) return true;
  if (/^Добавить в корзину/i.test(s)) return true;
  if (/Энергоэффективность\s+Термопанели/i.test(s)) return true;
  if (/^Наши работы\b/i.test(s)) return true;
  if (/^Удобство установки|^Долговечность|^Эстетический вид$/im.test(s.split(/[.!?]/)[0])) return true;
  if (/^Термопанели значительно снижают/i.test(s)) return true;
  return false;
}

/** Только <p> внутри виджета short-description (не блоки преимуществ ниже по странице). */
function extractShortDescription(html) {
  const $ = cheerio.load(html);
  const box = $('.woocommerce-product-details__short-description').first();
  if (!box.length) return '';
  const texts = box
    .find('p')
    .toArray()
    .map((el) =>
      $(el)
        .text()
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter((t) => t.length > 50 && !/^характеристики/i.test(t))
    .map((t) => t.replace(/^Заказать\s+/i, '').trim())
    .filter((t) => !isCaptionGarbage(t));

  const productLike = texts.find((t) =>
    /кирпич|камень|клинкер|версаль|визант|скандинав|турин|шумер/i.test(t)
  );
  return (productLike ?? texts[0] ?? '').trim();
}

function normTitle(s) {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

function displayCollectionName(name) {
  return name.replace(/_+$/g, '').trim();
}

/** Как в catalogVariantCaption.ts */
function extractVariantPrefix(fileName) {
  const base = fileName.replace(/\.[^.]+$/i, '');
  const m = base.match(/^(.+?)\s*-\s*.+/);
  if (m) return m[1].replace(/\s+/g, ' ').trim();
  return base.replace(/\s+/g, ' ').trim();
}

/**
 * Кандидаты имён товара на marrob.ru для сопоставления с карточкой категории.
 */
function titleCandidates(collectionName, fileName) {
  const coll = displayCollectionName(collectionName);
  const v = extractVariantPrefix(fileName);
  const out = new Set();
  const add = (t) => {
    const x = t.replace(/\s+/g, ' ').trim();
    if (x) out.add(x);
  };
  add(`${coll} ${v}`);
  // «07П4 s» на сайте часто как «… 07П4» без «s»
  add(`${coll} ${v.replace(/\s+s$/i, '')}`);
  // 17П0s / 17П0
  add(`${coll} ${v.replace(/s$/i, '')}`);
  if (/s$/i.test(v) && !/\s/.test(v)) {
    add(`${coll} ${v.slice(0, -1)}`);
  }
  return [...out];
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const baseCategory = 'https://marrob.ru/product-category/kamen/';

  const allProducts = [];
  for (let page = 1; page <= 10; page++) {
    const url = page === 1 ? baseCategory : `${baseCategory}page/${page}/`;
    let html;
    try {
      html = await fetchText(url);
    } catch {
      break;
    }
    const batch = parseCategoryProducts(html);
    if (!batch.length) break;
    allProducts.push(...batch);
    if (batch.length < 12) break;
  }

  const titleToCaption = new Map();
  const uniqueUrls = [...new Set(allProducts.map((p) => p.url))];
  console.log(`Products in category: ${uniqueUrls.length}`);

  for (const url of uniqueUrls) {
    const html = await fetchText(url);
    const cap = extractShortDescription(html);
    const prod = allProducts.find((p) => p.url === url);
    if (prod) {
      titleToCaption.set(normTitle(prod.title), cap || '');
      if (!cap) {
        console.warn('No short description in widget:', prod.title, url);
      }
    }
  }

  const captions = {};

  for (const col of manifest.collections) {
    for (const file of col.files) {
      const key = `${displayCollectionName(col.name)}/${file}`;
      const candidates = titleCandidates(col.name, file);
      let cap;
      for (const t of candidates) {
        cap = titleToCaption.get(normTitle(t));
        if (cap) break;
      }
      if (cap) captions[key] = cap;
    }
  }

  /** Файлы без префикса варианта в имени — дублируем ближайший товар с marrob.ru */
  const manualKeys = {
    'Клинкерный кирпич/1-33.jpeg': 'Клинкерный кирпич/14П4 - Клинкерный кирпич 1000.jpeg',
    'Клинкерный кирпич/1-35.jpeg': 'Клинкерный кирпич/14П4 - Клинкерный кирпич 1000.jpeg',
    'Клинкерный кирпич/14П5_1.jpeg': 'Клинкерный кирпич/14П5.jpeg',
  };
  for (const [to, from] of Object.entries(manualKeys)) {
    if (captions[from]) captions[to] = captions[from];
  }

  /** Коллекции без текста в short-description на marrob.ru — как на главной (см. catalogVariantCaption.ts). */
  const collectionOnlyFallback = {
    'клинкерный кирпич': 'Классический клинкер с характерной текстурой и насыщенными цветами',
    'версальский кирпич': 'Элегантный стиль французского дворца с изысканными оттенками',
    'византийский кирпич': 'Восточная роскошь и богатство деталей в каждой панели',
    'скандинавский кирпич': 'Северная простота и функциональность в минималистичном дизайне',
    'туринский кирпич': 'Итальянская классика и изысканность для элитных проектов',
    'шумерский кирпич': 'Древние мотивы в современном исполнении для уникальных фасадов',
  };
  for (const col of manifest.collections) {
    const dname = displayCollectionName(col.name);
    const fb = collectionOnlyFallback[dname.toLowerCase()] ?? 'Фасадные термопанели MARROB';
    for (const file of col.files) {
      const key = `${dname}/${file}`;
      if (!captions[key]) captions[key] = fb;
    }
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    source: 'https://marrob.ru/product-category/kamen/',
    captions,
  };

  fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Wrote ${Object.keys(captions).length} captions -> ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
