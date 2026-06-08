# HubSpot — Вебхуки

> Актуально: червень 2026 (Deep Research). Маркери: ✅ офіц. | ⚠️ не виявлено/вторинне

## Налаштування

- **Через UI:** developer-акаунт → Apps → [App] → Webhooks.
- **Через API:** `PUT webhooks/v3/{appId}/settings` (body: `targetUrl`, `throttling` з `maxConcurrentRequests`) + `.../subscriptions`. ✅
- **Target URL:** обов'язково публічний **HTTPS**. ✅

## Поведінка та ліміти

| Параметр | Значення | Надійність |
|----------|----------|-----------|
| **Concurrency** | **10 in-flight запитів/акаунт** (`maxConcurrentRequests`) | ✅ |
| **Rate limit** | вебхуки мають ЛИШЕ concurrency, **не rate-limit** (`period`/`rateLimitPolicy` видалено 20.05.2024) | ✅ |
| **Timeout** | **5 секунд** на 2XX (інакше timeout → retry) | ✅ |
| **Retry** | до **10 спроб протягом 24 год** | ✅ |
| **Доставка** | at-least-once (з retry); порядок НЕ гарантується | ⚠️ |
| **vs API ліміт** | webhook-доставки **не рахуються** | ✅ |
| **Max підписок/додаток** | ≈1,000 | ⚠️ (не підтверджено цей раз) |

## Підпис (валідація)

- **v3** — заголовок `X-HubSpot-Signature-v3`:
  1. Reject, якщо `X-HubSpot-Request-Timestamp` старший за **5 хв**.
  2. Конкатенація: `requestMethod + requestUri + requestBody + timestamp`.
  3. **HMAC-SHA256** з app secret → **Base64**.
  4. Порівняти з заголовком. ✅
- **v1/v2** (`X-HubSpot-Signature`) ще існують; **v3 — рекомендований**. ✅

## Payload

JSON-**масив** подій. Поля: `objectId`, `propertyName`, `propertyValue`, `changeSource`, `eventId`, `subscriptionId`, `portalId`, `appId`, `occurredAt` (мс), `subscriptionType`/`eventType`, `attemptNumber`. ✅

## Типи подій

Per-object create/delete/propertyChange: напр. `contact.creation`, `contact.deletion`, `contact.propertyChange`, `deal.propertyChange` тощо. Кожен тип вимагає відповідного scope. ✅

## Best practices

- Слухати конкретний `propertyName` (інакше шквал). ⚠️
- Відповідати 2XX <5с, обробка асинхронно.
- Ідемпотентність за `eventId` (at-least-once → дублі).
- Налаштувати `maxConcurrentRequests` під пропускну здатність ендпоінта.

## Дебаг

- ⚠️ Окремого публічного webhook-activity-log API не виявлено; моніторинг через app logs / UI.

**Джерела:** developers.hubspot.com/docs/api-reference/webhooks-webhooks-v3/guide | developers.hubspot.com/changelog/introducing-version-3-of-webhook-signatures | developers.hubspot.com/changelog/upcoming-sunset-webhooks-ratelimit-policy-field
