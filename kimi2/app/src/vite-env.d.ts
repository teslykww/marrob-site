/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** POST JSON: заявка со страницы «Дилерам» */
  readonly VITE_DEALER_FORM_URL?: string;
  /** POST JSON: блок «Прайс и каталог» на главной (LeadMagnet) */
  readonly VITE_LEAD_FORM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
