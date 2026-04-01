import { useEffect } from 'react';

const BITRIX_LOADER =
  'https://cdn-ru.bitrix24.ru/b36795754/crm/site_button/loader_1_22ewny.js';

/**
 * Кнопка на сайте Bitrix24 — тот же loader, что и в marrob-tilda/98-widget-messenger.html
 */
const BitrixSiteButton: React.FC = () => {
  useEffect(() => {
    if (document.querySelector('script[data-marrob-bitrix-site-button]')) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = `${BITRIX_LOADER}?${Date.now() / 60000 | 0}`;
    s.dataset.marrobBitrixSiteButton = '';
    const h = document.getElementsByTagName('script')[0];
    h.parentNode?.insertBefore(s, h);
  }, []);

  return null;
};

export default BitrixSiteButton;
