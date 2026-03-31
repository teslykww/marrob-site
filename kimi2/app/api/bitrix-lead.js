/**
 * Прокси для Bitrix24 crm.lead.add: секрет вебхука только в BITRIX24_WEBHOOK_URL (Vercel → Environment).
 * Клиент шлёт POST JSON с полями формы; ответ { ok: true, id } или { ok: false, error }.
 */

function splitName(full) {
  const t = String(full || '').trim();
  if (!t) return { first: 'Клиент', last: 'с сайта maroob.ru' };
  const i = t.indexOf(' ');
  if (i === -1) return { first: t.slice(0, 64), last: '—' };
  const first = t.slice(0, i).trim() || 'Клиент';
  const last = t.slice(i + 1).trim().slice(0, 64) || '—';
  return { first, last };
}

function normalizePhone(phone) {
  const d = String(phone || '').replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('7')) return `+${d}`;
  if (d.length === 10) return `+7${d}`;
  return String(phone || '').trim() || '+70000000000';
}

function buildTitle(body) {
  const source = String(body.source || 'site');
  const intent = body.intent ? String(body.intent) : '';
  let t = `[MARROB] ${source}`;
  if (intent) t += ` — ${intent}`;
  return t.slice(0, 255);
}

function buildComments(body) {
  const lines = [];
  if (body.message) lines.push(`Сообщение: ${body.message}`);
  if (body.company) lines.push(`Компания: ${body.company}`);
  if (body.region) lines.push(`Регион: ${body.region}`);
  if (body.format) lines.push(`Формат партнёрства: ${body.format}`);
  if (body.messenger) lines.push(`Мессенджер: ${body.messenger}`);
  if (body.page_url) lines.push(`Страница: ${body.page_url}`);
  return lines.join('\n').slice(0, 6000);
}

function buildBitrixFields(body) {
  const { first, last } = splitName(body.name);
  const fields = {
    TITLE: buildTitle(body),
    NAME: first,
    LAST_NAME: last,
    PHONE: [{ VALUE: normalizePhone(body.phone), VALUE_TYPE: 'WORK' }],
    COMMENTS: buildComments(body),
    SOURCE_ID: 'WEB',
  };
  const email = String(body.email || '').trim();
  if (email) {
    fields.EMAIL = [{ VALUE: email, VALUE_TYPE: 'WORK' }];
  }
  return fields;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const webhookUrl = process.env.BITRIX24_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return res.status(503).json({
      ok: false,
      error: 'Заявки временно недоступны (не настроен BITRIX24_WEBHOOK_URL на сервере).',
    });
  }

  let body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Неверное тело запроса.' });
  }

  const phone = body.phone;
  if (!phone || String(phone).replace(/\D/g, '').length < 10) {
    return res.status(400).json({ ok: false, error: 'Укажите корректный телефон.' });
  }

  const fields = buildBitrixFields(body);

  const base = webhookUrl.replace(/\/+$/, '');
  const bitrixUrl = base.includes('crm.lead.add')
    ? base.endsWith('.json')
      ? base
      : `${base}.json`
    : `${base}/crm.lead.add.json`;

  try {
    const br = await fetch(bitrixUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ fields }),
    });

    const data = await br.json().catch(() => ({}));

    if (data.error) {
      const msg =
        typeof data.error_description === 'string'
          ? data.error_description
          : typeof data.error === 'string'
            ? data.error
            : 'Ошибка Bitrix24';
      return res.status(502).json({ ok: false, error: msg, bitrixError: data.error });
    }

    if (typeof data.result === 'number') {
      return res.status(200).json({ ok: true, id: data.result });
    }

    return res.status(502).json({ ok: false, error: 'Неожиданный ответ CRM.' });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Сеть';
    return res.status(502).json({ ok: false, error: msg });
  }
}
