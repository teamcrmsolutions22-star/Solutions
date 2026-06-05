# Pipedrive — Оновлення та Дебаг

## Хронологія змін 2024–2025

| Дата | Зміна |
|------|-------|
| **02.12.2024** | Token-based Daily Budget rate limits для нових реєстрацій |
| **01.03.2025** | Token-based rate limits для всіх існуючих клієнтів |
| **Березень 2025** | AI Report Generation (через натуральну мову) — Premium+ |
| **12.03.2025** | Installments API (розстрочки) |
| **17.03.2025** | Webhooks v2 стає стандартом за замовчуванням |
| **29.05.2025** | Ліміт "Active Leads + Deals" замінює "Open Deals" для нових акаунтів |
| **15.07.2025** | **РЕБРЕНДИНГ ПЛАНІВ:** Essential→Lite, Advanced→Growth, Professional→Premium, Power/Enterprise→Ultimate |
| **15.07.2025** | Запуск Pulse toolkit (beta): Feed, Data Enrichment, Custom Scoring, Sequences |
| **22.08.2025** | Smart Contact Data видалено; замінено на Data Enrichment (Pulse) |
| **25.08.2025** | Product Images API |
| **01.10.2025** | Ліміт Active Leads+Deals для існуючих акаунтів |
| **Жовтень 2025** | Deal Products bulk operations API; нова сортировка Products API |
| **Листопад 2025** | LeadBooster + Projects включено в Premium/Ultimate; Product Duplication API |
| **10.12.2025** | Fields API v2 (повний CRUD для всіх типів полів) |
| **31.07.2026** | **Deadline міграції API v1 → v2** |

## Критичні зміни для розробників

### 1. Ребрендинг планів (липень 2025)
| Старе ім'я | Нова назва | Ціна (річна) |
|------------|-----------|--------------|
| Essential | **Lite** | $14/user/міс |
| Advanced | **Growth** | $39/user/міс |
| Professional | **Premium** | $49/user/міс |
| Power/Enterprise | **Ultimate** | $79/user/міс |

### 2. Rate Limits (нова система)
- Нові реєстрації: з 2 грудня 2024
- Всі клієнти: з 1 березня 2025
- API v2 запити коштують 50% менше токенів

### 3. Deprecations
- **Webhooks v1**: Legacy. Тільки через старі API методи. Мігруйте на v2 негайно.
- **API v1 endpoints**: Повне видалення — 31 липня 2026. Мігруйте на v2.
- **Smart Contact Data**: Видалено 22 серпня 2025, замінено Data Enrichment.
- Публічний Roadmap не публікується ⚠️

## Інструменти розробника

- **Developer Hub:** Панель для Marketplace-додатків, OAuth Client ID/Secret, Sandbox
- **Webhook log:** Візуальний моніторинг доставки — Tools and integrations → Webhooks
- **API Explorer:** swagger-ui на developers.pipedrive.com
- Лог безкодових автоматизацій — не задокументований ⚠️

## Типові проблеми та рішення

### 401 / 403 Unauthorized / Forbidden
**Причини:**
- Недійсний `api_token` або OAuth без потрібного scope
- API v2 — токен в query param замість `x-api-token` header
- Блокування через visibility groups або permission sets

**Рішення:** Перевірити токен, оновити OAuth-сесію, перевірити всі scopes. Для v2 — тільки header.

### 429 Too Many Requests
**Причини:**
- Перевищено Burst Limit (2-секундне вікно)
- Вичерпано денний бюджет токенів

**Рішення:** Черга запитів + Exponential Backoff + читати `Retry-After`. Переходити на API v2 (50% економія токенів).

### Кастомне поле не оновлюється
**Причини:**
- Передано Label (назву поля) замість 40-символьного хеш-ключа
- Для Option-полів передано текст замість числового id опції

**Рішення:** `GET /v1/dealFields` → знайти хеш за назвою → використати в запиті.

### Вебхуки не надходять / підписка зникає
**Причини:**
- Сервер не відповів за 10 сек або повернув не 2XX → Ban System → блокування на 30 хв
- 3 дні без успішної доставки → автоматичне видалення

**Рішення:** Негайно відповідати HTTP 200, фонова обробка тіла в async черзі.

### API v2 — Strict Validation Errors
**Причина:** v2 не приймає `1`/`0` для boolean — треба `true`/`false`; не приймає рядки замість чисел.

**Рішення:** Оновити маппінг даних перед міграцією на v2.

## Відомі протиріччя між джерелами

| Питання | Застаріле (❌) | Актуальне (✅) |
|---------|--------------|----------------|
| Кастомні поля в API | Передавати Label або ID | 40-символьний хеш-код |
| Rate limits | 100 запитів / 10 сек | Daily Budget токенів + Burst 2-секундне вікно |
| Вебхуки та rate limits | Підпадають під API ліміти | Вихідні вебхуки виключені |
| AI Scoring | Всі тарифи | Growth+ (в рамках Pulse) |
| Назви планів | Essential/Advanced/Professional/Power/Enterprise | Lite/Growth/Premium/Ultimate (з 15.07.2025) |

**Джерела:** developers.pipedrive.com/changelog | support.pipedrive.com/en/article/new-pipedrive-plans | pipedrive.com/en/newsroom/pipedrive-launches-smart-prospecting-toolkit-pulse | help.make.com/pipedrive-api-v1-to-v2-transition-by-july-31-2026
