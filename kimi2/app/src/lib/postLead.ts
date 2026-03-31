export type LeadApiResponse = {
  ok?: boolean;
  id?: number;
  result?: number;
  error?: string;
};

export type PostLeadResult =
  | { success: true }
  | { success: false; errorMessage: string };

function resolvePostUrl(specific: string | undefined): string | undefined {
  const s = specific?.trim();
  if (s) return s;
  return (import.meta.env.VITE_LEAD_API_URL as string | undefined)?.trim();
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
    return { success: false, errorMessage: 'Сервис заявок не настроен (задайте VITE_LEAD_API_URL или URL формы).' };
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
