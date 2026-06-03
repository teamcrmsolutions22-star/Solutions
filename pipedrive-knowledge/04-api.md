# Pipedrive — REST API (технічні деталі)

**Документація:** https://developers.pipedrive.com/docs/api/v1

## Автентифікація

### API Token
- Передається як query-параметр: `?api_token=TOKEN`
- Знайти: Settings → Personal preferences → API
- Використовувати тільки для приватних скриптів та внутрішніх інтеграцій

### OAuth 2.0 (рекомендований для Marketplace-додатків)
- Авторизація: `https://oauth.pipedrive.com/oauth/authorize`
- Обмін коду на токени: `/oauth/token`
- Токен у заголовку: `Authorization: Bearer <access_token>`

**OAuth Scopes:**

| Scope | Доступ |
|-------|--------|
| `base` | Базова інформація, валюти (завжди активний) |
| `deals:read` / `deals:full` | Читання / повне керування угодами |
| `leads:read` / `leads:full` | Ліди та джерела лідів |
| `webhooks:read` / `webhooks:full` | Вебхуки |

## Базова структура API

- **Base URL:** `https://api.pipedrive.com/v1/` або `https://{COMPANY_DOMAIN}.pipedrive.com/api/v1/`
- **Формат відповіді:** JSON

```json
{
  "success": true,
  "data": { "id": 123 },
  "additional_data": {
    "pagination": {
      "start": 0,
      "limit": 100,
      "more_items_in_collection": false
    }
  }
}
```

- **Пагінація:** API v1 — `start` + `limit`; API v2 — курсори `cursor` + `limit`
- **Пошук:** через спеціалізовані ендпоінти, наприклад `/v1/organizations/search`

## Rate Limits (нова система з грудня 2024)

### Token-based Daily Budget

Денний ліміт = **Mplan × кількість ліцензій × базова константа**

| Тариф | Коефіцієнт (Mplan) |
|-------|-------------------|
| Essential | 1 |
| Advanced | 2 |
| Professional | 5 |
| Power / Enterprise | 7 |

**Вартість запитів у токенах:**

| Тип запиту | Токени |
|------------|--------|
| GET single (один об'єкт) | 2 |
| GET list (список) | 20 |
| PUT/PATCH (оновлення) | 10 |
| DELETE (видалення) | 6–10 |
| Search API | 40 |

### Burst Limits (ковзне 2-секундне вікно, per user/token)

| Тариф | API Token | OAuth |
|-------|-----------|-------|
| Essential | 20 запитів/2сек | 80 |
| Advanced | 40 | 160 |
| Professional | 100 | 400 |
| Power / Enterprise | 120 | 480 |

**Search API:** фіксований ліміт — **10 запитів / 2 сек** для всіх тарифів.

### HTTP Headers лімітів

| Header | Значення |
|--------|----------|
| `x-ratelimit-limit` | Ліміт у 2-секундному вікні |
| `x-ratelimit-remaining` | Залишок у поточному вікні |
| `x-ratelimit-reset` | Секунди до скидання вікна |
| `x-daily-requests-left` | Залишок денного ліміту (тільки api_token) |

При перевищенні → **HTTP 429 Too Many Requests** + заголовок `Retry-After` (секунди).  
При систематичному перевищенні — штрафне вікно до 10 секунд.

## Ключові ендпоінти

```
GET  /v1/deals                    — список угод
POST /v1/deals                    — створити угоду
PUT  /v1/deals/{id}               — оновити угоду (зміна стадії — параметр stage_id)

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
```

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
- Недійсний api_token або OAuth без потрібного scope (наприклад, `leads:full`)
- Блокування через групи видимості
- Рішення: перевірити токен, оновити OAuth-сесію, перевірити scopes

**429 Too Many Requests:**
- Перевищено Burst Limit або денний бюджет токенів
- Рішення: черга запитів з Exponential Backoff + читати `Retry-After`

**Кастомне поле не оновлюється:**
- Причина: передається Label замість 40-символьного хеш-ключа, або текст замість числового id для Option-полів
- Рішення: `GET /v1/dealFields` → знайти хеш → використати в JSON-тілі
