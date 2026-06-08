# HubSpot — Вебхуки

> Актуально: червень 2026. Маркери: ✅ офіц. | ⚠️ потребує перевірки

## Налаштування

- **Версія API підписок:** `/webhooks/2026-3/{appId}/...` (новий, замінює `/webhooks/v3/...`). ✅
- **Де:** на рівні додатка в developer-акаунті: **Apps → [App] → Webhooks**, або через `GET/PUT /webhooks/2026-3/{appId}/settings` та `.../subscriptions`. ✅
- **Target URL:** має бути публічний **HTTPS** endpoint; non-HTTPS → **400**. ✅

## Поведінка та ліміти

| Параметр | Значення | Надійність |
|----------|----------|-----------|
| **Concurrency** | макс. **10 одночасних HTTP-запитів** на встановлений портал | ✅ |
| **Подій на запит** | до **100 events** в одному HTTP-запиті | ✅ |
| **Підписок на додаток** | до **1,000** | ✅ |
| **Timeout** | **5 секунд** на відповідь (далі — retry) | ✅ |
| **Retry** | до **10 спроб протягом 24 год** з рандомізованим backoff | ✅ |
| **Гарантія доставки** | **at-least-once**; порядок НЕ гарантується, можливі дублі | ✅ |
| **Підпис** | SHA-256 (app secret + raw body) у `X-HubSpot-Signature` | ✅ |
| **vs API limits** | Webhook-POST'и **не рахуються** в API rate limits | ✅ |

> ⚠️ Точні інтервали між спробами офіційно не публікуються (від секунд до годин, експоненційно).

## Retry — тригери

Повтор відбувається при: connection failures, 4xx/5xx статусах, timeout (>5 сек). ✅

## Типи подій

- Сотні подій: створення/оновлення/видалення об'єктів, зміна властивостей, подієві тригери.
- Приклади: `contact.creation`, `deal.propertyChange` тощо.
- **Формат:** JSON із `eventId`, `subscriptionId`, `occurredAt`, `objectId`; при зміні властивості — `propertyName`, `propertyValue`, `previousValue`. ✅
- **Scopes:** кожен тип підписки вимагає відповідного scope (див. webhooks guide). ✅

## Best practices

- Слухати конкретний `propertyName`, а не всі зміни (інакше шквал сповіщень). ⚠️
- Верифікувати підпис саме **SHA-256** (не SHA-1). ✅
- Відповідати 2xx швидко (<5 сек), обробку — асинхронно в черзі.
- Обробляти **дублі** (at-least-once) через ідемпотентність за `eventId`.

## Дебаг

- **Webhooks journal & management API** (BETA) — історичні в'юхи + фільтрація. ✅
- Журнал подій у налаштуваннях додатка (UI). ✅

**Джерела:** developers.hubspot.com/docs/api-reference/latest/webhooks/guide | developers.hubspot.com/changelog/2018-12-10-updated-webhook-retry-logic | developers.hubspot.com/docs/api-reference/legacy/webhooks/webhooks-journal
