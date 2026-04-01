/**
 * Bitrix24 crm.lead.add — общий обработчик для Vercel (/api) и Vite dev.
 * Секрет: BITRIX24_WEBHOOK_URL (только сервер, не VITE_).
 */

function sendJson(res, statusCode, data) {
  if (typeof res.status === 'function') {
    try {
      res.status(statusCode).json(data);
      return;
    } catch {
      /* fall through to Node HTTP */
    }
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

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

async function readJsonBody(req) {
  if (req.body != null && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  if (Buffer.isBuffer(req.body)) {
    try {
      return JSON.parse(req.body.toString('utf8'));
    } catch {
      return {};
    }
  }
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader?.('Allow', 'POST');
    return sendJson(res, 405, { ok: false, error: 'Method not allowed' });
  }

  const webhookUrl = process.env.BITRIX24_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return sendJson(res, 503, {
      ok: false,
      error: 'Заявки временно недоступны (не настроен BITRIX24_WEBHOOK_URL на сервере).',
    });
  }

  const body = await readJsonBody(req);
  if (body === null) {
    return sendJson(res, 400, { ok: false, error: 'Неверное тело запроса (JSON).' });
  }
  if (!body || typeof body !== 'object') {
    return sendJson(res, 400, { ok: false, error: 'Неверное тело запроса.' });
  }

  const phone = body.phone;
  if (!phone || String(phone).replace(/\D/g, '').length < 10) {
    return sendJson(res, 400, { ok: false, error: 'Укажите корректный телефон.' });
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
      return sendJson(res, 502, { ok: false, error: msg, bitrixError: data.error });
    }

    if (typeof data.result === 'number') {
      return sendJson(res, 200, { ok: true, id: data.result });
    }

    return sendJson(res, 502, { ok: false, error: 'Неожиданный ответ CRM.' });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Сеть';
    return sendJson(res, 502, { ok: false, error: msg });
  }
}
