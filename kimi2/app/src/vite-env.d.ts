/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Общий endpoint для всех форм (напр. `/api/bitrix-lead`), если индивидуальные URL не заданы */
  readonly VITE_LEAD_API_URL?: string;
  /** POST JSON: заявка со страницы «Дилерам» */
  readonly VITE_DEALER_FORM_URL?: string;
  /** POST JSON: MagnetLeadForm (напр. блок в секции каталога) → /leads/magnet */
  readonly VITE_LEAD_FORM_URL?: string;
  /** POST JSON: форма «Оставить заявку» в контактах → /leads/contact */
  readonly VITE_CONTACT_FORM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
