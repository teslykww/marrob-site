/**
 * Ключ подписи варианта в каталоге: `{коллекция без хвостовых _}/{точное имя файла из manifest}`.
 * Совпадает с ключами в public/catalog/variant-captions.json (генерируется скриптом).
 */
export function displayCollectionName(collectionName: string): string {
  return collectionName.replace(/_+$/g, '').trim();
}

/** Префикс варианта из имени файла (до « - …») или всё имя без расширения. */
export function extractVariantPrefix(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/i, '');
  const m = base.match(/^(.+?)\s*-\s*.+/);
  if (m) return m[1].replace(/\s+/g, ' ').trim();
  return base.replace(/\s+/g, ' ').trim();
}

export function variantCaptionKey(collectionName: string, fileName: string): string {
  return `${displayCollectionName(collectionName)}/${fileName}`;
}

export function lookupVariantCaption(
  captions: Record<string, string> | null | undefined,
  collectionName: string,
  fileName: string
): string | undefined {
  if (!captions) return undefined;
  const k = variantCaptionKey(collectionName, fileName);
  return captions[k];
}

/** Если для файла нет подписи с marrob.ru — короткий текст коллекции (как на главной в блоке каталога). */
const COLLECTION_FALLBACK: Record<string, string> = {
  'клинкерный кирпич': 'Классический клинкер с характерной текстурой и насыщенными цветами',
  'версальский кирпич': 'Элегантный стиль французского дворца с изысканными оттенками',
  'византийский кирпич': 'Восточная роскошь и богатство деталей в каждой панели',
  'скандинавский кирпич': 'Северная простота и функциональность в минималистичном дизайне',
  'туринский кирпич': 'Итальянская классика и изысканность для элитных проектов',
  'шумерский кирпич': 'Древние мотивы в современном исполнении для уникальных фасадов',
};

export function collectionFallbackCaption(collectionName: string): string {
  const k = displayCollectionName(collectionName).toLowerCase();
  return COLLECTION_FALLBACK[k] ?? 'Фасадные термопанели MARROB';
}
