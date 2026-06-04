# Pipedrive — REST API (технічні деталі)

> Актуально: API v2 стабільний з березня 2025. Deadline міграції з v1 → 31 липня 2026.

**Документація:** https://developers.pipedrive.com/docs/api/v1 (v1) | https://{domain}.pipedrive.com/api/v2 (v2)

## Базові URL

| Версія | Base URL |
|--------|----------|
| **API v1** | `https://api.pipedrive.com/v1` |
| **API v2** | `https://{companydomain}.pipedrive.com/api/v2` |
| **OAuth endpoint** | `https://oauth.pipedrive.com` |

## Автентифікація

### API Token (v1)
- Передається як query-параметр: `?api_token=TOKEN`
- Знайти: Settings → Personal preferences → API
- Тільки для приватних скриптів і внутрішніх інтеграцій

### API Token (v2)
- Передається в HTTP-заголовку: `x-api-token: TOKEN` (не query-параметр!)

### OAuth 2.0 (рекомендований для Marketplace-додатків)
- Авторизація: `https://oauth.pipedrive.com/oauth/authorize`
- Обмін коду на токени: `/oauth/token`
- Токен у заголовку: `Authorization: Bearer <access_token>`
- Вимагає `company_domain` в URL запитів

**OAuth Scopes:**

| Scope | Доступ |
|-------|--------|
| `base` | Базова інформація, валюти (завжди активний) |
| `deals:read` / `deals:full` | Читання / повне керування угодами |
| `leads:read` / `leads:full` | Ліди та джерела лідів |
| `webhooks:read` / `webhooks:full` | Вебхуки |

## Відмінності API v1 vs v2

| Аспект | API v1 | API v2 |
|--------|--------|--------|
| **Токен-вартість запитів** | Повна ціна | 50% дешевше |
| **Валідація вхідних даних** | М'яка (1/0 для boolean) | Сувора (true/false тільки) |
| **Формат timestamps** | Змішаний | Тільки RFC 3339 |
| **Пов'язані об'єкти** | Вбудовані у відповідь | Видалені (потрібні окремі запити) |
| **Пагінація** | Offset-based (start/limit) | Cursor-based (cursor/limit) |
| **Заголовок аутентифікації** | Query param | `x-api-token` header |
| **Статус** | Legacy, видалення 31.07.2026 | Стабільний з березня 2025 |

## Rate Limits (нова token-based система, з грудня 2024)

### Денний Token Budget

**Формула:** `30,000 базових токенів × Mplan × кількість ліцензій`

| Тариф | Mplan | Приклад: 10 місць |
|-------|-------|-----------------|
| Lite | 1x | 300,000 токенів/день |
| Growth | 2x | 600,000 токенів/день |
| Premium | 5x | 1,500,000 токенів/день |
| Ultimate | 7x | 2,100,000 токенів/день |

- Бюджет скидається о півночі (серверний час)
- Тільки API-трафік (UI не рахується)
- **API v2 коштує 50% дешевше** за v1 для тих самих операцій
- Можливе придбання додаткових токенів

### Вартість типів запитів (в токенах, v1)

| Тип запиту | Токени |
|------------|--------|
| GET single (один об'єкт) | 2 |
| GET list (список) | 20 |
| PUT/PATCH (оновлення) | 10 |
| DELETE (видалення) | 6–10 |
| Search API | 40 |

### Burst Limits (ковзне 2-секундне вікно, per user)

| Тариф | API Token | OAuth |
|-------|-----------|-------|
| Lite | 20 запитів/2сек | 80 |
| Growth | 40 | 160 |
| Premium | 100 | 400 |
| Ultimate | 120 | 480 |

**Search API:** фіксований ліміт — **10 запитів / 2 сек** для всіх тарифів.

### HTTP Headers лімітів

| Header | Значення |
|--------|----------|
| `x-ratelimit-limit` | Ліміт у 2-секундному вікні |
| `x-ratelimit-remaining` | Залишок у поточному вікні |
| `x-ratelimit-reset` | Секунди до скидання вікна |
| `x-daily-requests-left` | Залишок денного бюджету (api_token) |

При перевищенні → **HTTP 429 Too Many Requests** + `Retry-After`.

## Ключові ендпоінти v1

```
GET  /v1/deals                    — список угод
POST /v1/deals                    — створити угоду
PUT  /v1/deals/{id}               — оновити угоду (зміна стадії → параметр stage_id)

POST /v1/persons                  — створити контакт
POST /v1/organizations            — створити компанію
POST /v1/leads                    — створити лід

POST /v1/files                    — завантажити файл та прив'язати до сутності

GET  /v1/dealFields               — метадані полів угод (хеш-коди)
GET  /v1/personFields             — метадані полів контактів
GET  /v1/organizationFields       — метадані полів компаній
GET  /v1/productFields            — метадані полів товарів

POST /v1/webhooks                 — створити підписку на вебхук
GET  /v1/webhooks                 — список підписок

GET  /v1/goals                    — цілі продажів
GET  /v1/subscriptions            — recurring revenue / installments
```

## Нові ендпоінти (2025)

- **Installments API** — введено 12 березня 2025
- **Fields API v2** — повний CRUD для polів всіх типів з bulk-операціями (грудень 2025)
- **Product Images API** — серпень 2025
- **Deal Products bulk operations** — жовтень 2025

## SDKs

| Мова | Тип | Деталі |
|------|-----|--------|
| **Node.js** | Офіційний | `npm install pipedrive`; MIT; підтримує v1 і v2 |
| **PHP** | Офіційний | `pipedrive/client-php`; MIT |
| **Python** | Community | Доступний через dltHub |
| **Ruby** | Community | Доступний на GitHub |

## Обробка помилок

```json
{
  "success": false,
  "error": "Опис помилки для розробника",
  "error_info": "Додаткові технічні деталі"
}
```

## Типові помилки та рішення

**401/403:**
- Недійсний token або OAuth без потрібного scope
- Блокування через visibility groups / permission sets
- Рішення: перевірити токен, оновити OAuth-сесію, перевірити scopes

**429 Too Many Requests:**
- Перевищено Burst Limit або денний бюджет
- Рішення: черга запитів + Exponential Backoff + читати `Retry-After`

**Кастомне поле не оновлюється:**
- Причина: передано Label замість 40-символьного хеш-ключа, або текст замість числового id для Option-полів
- Рішення: `GET /v1/dealFields` → знайти хеш → використати в запиті

**Джерела:** pipedrive.readme.io/docs/core-api-concepts-rate-limiting | developers.pipedrive.com/changelog/post/breaking-changes-token-based-rate-limits | pipedrive.readme.io/docs/pipedrive-api-v2-migration-guide | help.make.com/pipedrive-api-v1-to-v2-transition-by-july-31-2026
