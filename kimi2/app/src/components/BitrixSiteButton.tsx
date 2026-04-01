import { useEffect, type FC } from 'react';

const BITRIX_LOADER =
  'https://cdn-ru.bitrix24.ru/b36795754/crm/site_button/loader_1_22ewny.js';

/**
 * Кнопка на сайте Bitrix24 — тот же loader, что и в marrob-tilda/98-widget-messenger.html
 */
const BitrixSiteButton: FC = () => {
  useEffect(() => {
    if (document.querySelector('script[data-marrob-bitrix-site-button]')) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = `${BITRIX_LOADER}?${Date.now() / 60000 | 0}`;
    s.dataset.marrobBitrixSiteButton = '';
    const first = document.getElementsByTagName('script')[0];
    const parent = first?.parentNode;
    if (!parent) return;
    parent.insertBefore(s, first);
  }, []);

  return null;
};

export default BitrixSiteButton;
