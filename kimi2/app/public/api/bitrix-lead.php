<?php
/**
 * Прокси для Bitrix24 crm.lead.add на статическом хостинге reg.ru (Apache + PHP).
 * Webhook URL подставляется при деплое из GitHub Secret BITRIX24_WEBHOOK_URL.
 */

// ---- Настройки ----
$WEBHOOK_URL = '%%BITRIX24_WEBHOOK_URL%%'; // Заменяется в CI при деплое

// ---- CORS ----
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// ---- Проверка конфига ----
if (empty($WEBHOOK_URL) || strpos($WEBHOOK_URL, '%%') !== false) {
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'API не настроен (BITRIX24_WEBHOOK_URL).']);
    exit;
}

// ---- Чтение тела ----
$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!$body || !is_array($body)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Неверное тело запроса (JSON).']);
    exit;
}

// ---- Валидация телефона ----
$phone = isset($body['phone']) ? preg_replace('/\D/', '', $body['phone']) : '';
if (strlen($phone) < 10) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Укажите корректный телефон.']);
    exit;
}

// ---- Нормализация телефона ----
if (strlen($phone) === 11 && $phone[0] === '7') {
    $phoneFormatted = '+' . $phone;
} elseif (strlen($phone) === 10) {
    $phoneFormatted = '+7' . $phone;
} else {
    $phoneFormatted = '+' . $phone;
}

// ---- Имя ----
$fullName = trim(isset($body['name']) ? $body['name'] : '');
if (empty($fullName)) {
    $firstName = 'Клиент';
    $lastName = 'с сайта marrob.ru';
} else {
    $parts = explode(' ', $fullName, 2);
    $firstName = mb_substr($parts[0], 0, 64);
    $lastName = isset($parts[1]) ? mb_substr(trim($parts[1]), 0, 64) : '—';
}

// ---- Заголовок лида ----
$source = isset($body['source']) ? $body['source'] : 'site';
$intent = isset($body['intent']) ? $body['intent'] : '';
$title = '[MARROB] ' . $source;
if (!empty($intent)) $title .= ' — ' . $intent;
$title = mb_substr($title, 0, 255);

// ---- Комментарии ----
$comments = [];
if (!empty($body['message'])) $comments[] = 'Сообщение: ' . $body['message'];
if (!empty($body['company'])) $comments[] = 'Компания: ' . $body['company'];
if (!empty($body['region']))  $comments[] = 'Регион: ' . $body['region'];
if (!empty($body['format']))  $comments[] = 'Формат партнёрства: ' . $body['format'];
if (!empty($body['messenger'])) $comments[] = 'Мессенджер: ' . $body['messenger'];
if (!empty($body['page_url'])) $comments[] = 'Страница: ' . $body['page_url'];

// ---- Bitrix24 поля ----
$fields = [
    'TITLE'     => $title,
    'NAME'      => $firstName,
    'LAST_NAME' => $lastName,
    'PHONE'     => [['VALUE' => $phoneFormatted, 'VALUE_TYPE' => 'WORK']],
    'COMMENTS'  => implode("\n", $comments),
    'SOURCE_ID' => 'WEB',
];
$email = isset($body['email']) ? trim($body['email']) : '';
if (!empty($email)) {
    $fields['EMAIL'] = [['VALUE' => $email, 'VALUE_TYPE' => 'WORK']];
}

// ---- Формирование URL Bitrix24 ----
$base = rtrim($WEBHOOK_URL, '/');
if (strpos($base, 'crm.lead.add') !== false) {
    $bitrixUrl = (substr($base, -5) === '.json') ? $base : $base . '.json';
} else {
    $bitrixUrl = $base . '/crm.lead.add.json';
}

// ---- Запрос к Bitrix24 ----
$payload = json_encode(['fields' => $fields]);

$ch = curl_init($bitrixUrl);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json', 'Accept: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Ошибка сети: ' . $curlError]);
    exit;
}

$data = json_decode($response, true);
if (!$data) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Неожиданный ответ CRM.']);
    exit;
}

if (isset($data['error'])) {
    $msg = isset($data['error_description']) ? $data['error_description'] : $data['error'];
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => $msg]);
    exit;
}

if (isset($data['result']) && is_numeric($data['result'])) {
    echo json_encode(['ok' => true, 'id' => (int)$data['result']]);
    exit;
}

http_response_code(502);
echo json_encode(['ok' => false, 'error' => 'Неожиданный ответ CRM.']);
