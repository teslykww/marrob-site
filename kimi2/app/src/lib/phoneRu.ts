/** Цифры национального номера (10 цифр), без ведущей 7. */
export function extractRuPhoneDigits10(input: string): string {
  let d = input.replace(/\D/g, '');
  if (d.startsWith('8')) d = d.slice(1);
  if (d.startsWith('7')) d = d.slice(1);
  return d.slice(0, 10);
}

/** Маска +7 (XXX) XXX-XX-XX по уже извлечённым 10 цифрам. */
export function formatRuPhoneMask(digits10: string): string {
  const v = digits10.replace(/\D/g, '').slice(0, 10);
  let r = '+7';
  if (v.length > 0) r += ' (' + v.slice(0, 3);
  if (v.length >= 3) r += ') ' + v.slice(3, 6);
  if (v.length >= 6) r += '-' + v.slice(6, 8);
  if (v.length >= 8) r += '-' + v.slice(8, 10);
  return r;
}

export function isCompleteRuMobile10(digits10: string): boolean {
  return extractRuPhoneDigits10(digits10).length === 10;
}
