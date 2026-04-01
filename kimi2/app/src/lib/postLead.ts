export type LeadApiResponse = {
  ok?: boolean;
  id?: number;
  result?: number;
  error?: string;
};

export type PostLeadResult =
  | { success: true }
  | { success: false; errorMessage: string };

const DEFAULT_LEAD_API = '/api/bitrix-lead';

function resolvePostUrl(specific: string | undefined): string | undefined {
  const s = specific?.trim();
  if (s) return s;
  const fromEnv = (import.meta.env.VITE_LEAD_API_URL as string | undefined)?.trim();
  if (fromEnv) return fromEnv;
  /** Прод-сборка: единый endpoint Bitrix, если забыли задать VITE_LEAD_API_URL в CI */
  if (import.meta.env.PROD) return DEFAULT_LEAD_API;
  return undefined;
}

/**
 * POST JSON: собственный бэкенд, Bitrix-прокси `/api/bitrix-lead` или marrob-api.
 * Успех: { ok: true } или числовой result (Bitrix), или result в теле Bitrix.
 */
export async function postLeadJson(
  url: string | undefined,
  body: Record<string, unknown>,
): Promise<PostLeadResult> {
  const trimmed = resolvePostUrl(url);
  if (!trimmed) {
    return {
      success: false,
      errorMessage:
        'Сервис заявок не настроен локально: создайте kimi2/app/.env.local с VITE_LEAD_API_URL=/api/bitrix-lead и BITRIX24_WEBHOOK_URL=…',
    };
  }

  try {
    const res = await fetch(trimmed, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    let data: LeadApiResponse = {};
    try {
      data = (await res.json()) as LeadApiResponse;
    } catch {
      return { success: false, errorMessage: 'Сервер вернул неверный ответ.' };
    }

    const bitrixOk = typeof data.result === 'number' && data.ok !== false;
    if (res.ok && (data.ok === true || bitrixOk)) {
      return { success: true };
    }

    const msg =
      typeof data.error === 'string' && data.error.length > 0
        ? data.error
        : `Ошибка отправки (${res.status})`;
    return { success: false, errorMessage: msg };
  } catch {
    return { success: false, errorMessage: 'Нет сети или сервер недоступен.' };
  }
}
