# Uspacy — API та Webhooks

> Оновлено: 2026-06-05 (Deep Research + 94 джерела: База знань Uspacy, вебінар «Uspacy для розробників» Випуск #11 від 02.12.2025)

---

## Архітектура

- **Тип:** API-first мікросервісна архітектура
- **Протокол:** REST (JSON)
- **Версіонування:** через шлях `/v1/`
- **API Reference:** https://uspacy.readme.io/reference/introduction
- **Dev portal:** https://uspacy.dev/
- **Для розробників (KB):** https://uspacy.com/support/knowledgebase/for-developers/

---

## Base URL

```
https://{domain}.uspacy.ua
```

де `{domain}` — унікальний піддомен workspace (наприклад `enterprise.uspacy.ua`).

Приклад для CRM:
```
https://enterprise.uspacy.ua/crm/v1/entities/leads
```

---

## Методи автентифікації

### 1. Direct Login (JWT Bearer)

```http
POST https://{domain}.uspacy.ua/auth/v1/login
Content-Type: application/json

{
  "email": "developer@enterprise.com",
  "password": "SecurePassword123"
}
```

**Відповідь:**
```json
{
  "token": "<JWT access token>",
  "refresh_token": "<JWT refresh token>"
}
```

**Заголовок для всіх запитів:**
```
Authorization: Bearer <token>
```

**Оновлення токена:**
```http
POST /auth/v1/refresh-token
{ "refresh_token": "..." }
```

---

### 2. OAuth 2.0 (App Marketplace)

1. Зареєструвати застосунок у developer console → `client_id` + `client_secret`
2. При встановленні admin встановлює app → система надсилає `authorization_code` на redirect URL
3. Обміняти code на `access_token`

**Використання:** для публічних/приватних застосунків у Marketplace

---

### 3. Incoming Webhooks (без токенів)

- Створити webhook в admin-панелі → отримати унікальний URL
- Цей URL є pre-authenticated endpoint
- Додавати відносні API-шляхи до base URL:

```http
POST {webhook_url}/crm/v1/entities/leads
Content-Type: application/json

{
  "title": "Inbound Lead from API",
  "opportunity": 15000,
  "currency": "EUR"
}
```

**Ліміти:** Free — 1 incoming webhook, Standard/Pro — необмежено

---

## Мікросервіси та API-шляхи

| Мікросервіс | Базовий шлях | Ресурси |
|-------------|-------------|---------|
| authService | `/auth/v1` | Логін, реєстрація, email підтвердження, скидання паролю, 2FA |
| usersService | `/users/v1` | Профілі, відділи, кастомні поля профілів, запрошення |
| roles | `/users/v1/roles` | Ролі доступу, матриці прав |
| tasksService | `/tasks/v1` | Завдання, чеклісти, Kanban-стадії, шаблони, time tracking |
| messengerService | `/messenger/v1` | Чати, групові повідомлення, зовнішні канали, лог дзвінків |
| newsfeedService | `/newsfeed/v1` | Пости, системні сповіщення, коментарі |
| crmService | `/crm/v1` | Ліди, угоди, контакти, компанії, воронки, продукти, шаблони, кастомні сутності |
| filesService | `/files/v1` | Файли, вкладення, архів документів |
| groupService | `/group/v1` | Робочі групи, черги модерації, ролі учасників |
| commentsService | `/comments/v1` | Вкладені коментарі до завдань, CRM, активностей, постів |

**Джерело:** https://uspacy.readme.io/reference/introduction

---

## Відомі ендпоінти (CRM)

| Метод | Шлях | Дія |
|-------|------|-----|
| POST | `/auth/v1/login` | Отримати JWT токен |
| POST | `/auth/v1/refresh-token` | Оновити токен |
| POST | `/auth/v1/logout` | Вийти |
| GET | `/crm/v1/entities/{entity}/` | Список записів |
| POST | `/crm/v1/entities/{entity}/` | Створити запис |
| GET | `/crm/v1/entities/{entity}/{id}/` | Один запис |
| PATCH | `/crm/v1/entities/{entity}/{id}/` | Оновити запис |
| DELETE | `/crm/v1/entities/{entity}/{id}/` | Видалити (в кошик) |
| PATCH | `/crm/v1/entities/{entity}/trash/restore` | Відновити з кошика |
| GET | `/crm/v1/fields/{entity}/` | Поля сутності |
| GET | `/crm/v1/funnels/` | Список воронок |
| GET | `/crm/v1/stages/` | Список стадій |

`{entity}` = `leads` | `deals` | `contacts` | `companies`

---

## Приклад: Відновлення з кошика (Recycle Bin)

**Метод:** `PATCH`  
**URL:** `https://{domain}.uspacy.ua/crm/v1/entities/{entity}/trash/restore`

```bash
curl -X PATCH "https://enterprise.uspacy.ua/crm/v1/entities/deals/trash/restore" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"entity_ids": [301, 302, 303]}'
```

**Джерело:** https://uspacy.readme.io/reference/patch_crm-v1-entities-entity-trash-restore

---

## Вихідні Webhooks — Handshake-верифікація

1. Адмін створює вихідний webhook у панелі → вводить URL зовнішнього сервера
2. Платформа надсилає POST з `validation_link` на зовнішній URL
3. Сервер розробника: розпарсити JSON → витягти `validation_link` → зробити GET на нього
4. Платформа отримує GET → статус webhook → «Confirmed» → починається стрімінг подій

**Статуси:** `Unconfirmed` → `Confirmed`

**Джерело:** https://ua.uspacy.support/en/articles/8186103-webhooks-how-does-it-work

---

## Матриця подій (Outgoing Webhook Events)

| Сутність | Created | Changed | Deleted | Stage Changed |
|----------|---------|---------|---------|---------------|
| Lead | ✅ | ✅ | ✅ | ✅ |
| Deal | ✅ | ✅ | ✅ | ✅ |
| Contact | ✅ | ✅ | ✅ | ❌ |
| Company | ✅ | ✅ | ✅ | ❌ |
| Activity | ✅ | ✅ | ✅ | ❌ |
| Task | ✅ | ✅ | ✅ | ✅ |
| Post | ✅ | ✅ | ✅ | ❌ |
| Comment | ✅ | ✅ | ✅ | ❌ |

**Джерело:** https://uspacy.com/support/knowledgebase/webhooks-how-does-it-work-en/

---

## Rate Limits

> ⚠️ **Не задокументовано публічно.** Офіційних числових значень (req/min) у відкритому доступі не знайдено.

---

## SDK та інструменти розробника

- **Офіційний SDK:** не оголошено (станом на 2026-06-04)
- **API Reference (Readme.io):** https://uspacy.readme.io — основна інтерактивна документація
- **Developer Portal:** https://uspacy.dev/ — хаб для розробників
- **Dev блог (UA):** https://uspacy.ua/blog/category/dev/
- **KB для розробників:** https://uspacy.com/support/knowledgebase/for-developers/

---

## Приклад створення ліда через Incoming Webhook

```http
POST {webhook_url}/crm/v1/entities/leads
Content-Type: application/json

{
  "title": "Inbound Lead from API",
  "opportunity": 15000,
  "currency": "EUR"
}
```

---

## Практичні поради від Кирила Мельничука (CTO Uspacy, вебінар 02.12.2025)

### Як переглянути JWT-токен та його тривалість
1. Скопіюйте токен з заголовка `Authorization` в браузері (DevTools → Network)
2. Вставте на сайт [jwt.io](https://jwt.io/) → розшифруйте
3. Поле `exp` показує дату/час закінчення дії токена
- **Тривалість токена**: ~24 години (уточнюйте при кожному виклику `/auth/v1/refresh-token`)

### Де знайти API Reference
- Основна документація: https://uspacy.readme.io/reference/introduction (Readme.io)
- Developer Portal: https://uspacy.dev/ (планується оновлення)
- Усі ендпоінти перераховані у Swagger-документації всередині readme.io

### Підхід до vibe-coding (без знань програмування)
1. Авторизуйтесь → скопіюйте JWT-токен з заголовка запиту в браузері
2. В ChatGPT/Claude опишіть задачу + вкажіть токен, funnel ID, entity ID
3. AI генерує Python-скрипт для імпорту даних / роботи з API
4. Запустіть скрипт → результат у Uspacy

**Джерело:** Тепер усе ясно: Uspacy для розробників, Випуск #11, 02.12.2025

### Marketplace-застосунки vs. Custom API
- Marketplace: 50+ готових застосунків (встановити без коду)
- Make.com / Zapier / n8n: якщо немає нативної інтеграції (без знань розробки)
- Custom API + AI-coding: повна гнучкість для унікальних сценаріїв

---

## Вайбкодинг (Vibe Coding) для нерозробників (Випуск #15, 26.05.2026)

- Concept: використовувати AI (ChatGPT, Claude) для генерації коду інтеграцій з Uspacy API
- Потрібно знати: JWT токен, ID воронки (funnel_id), ID сутності
- Приклад задачі: масовий імпорт лідів з CSV через API
- Рекомендований підхід: описати задачу AI → отримати Python-скрипт → запустити

---

## Incoming Webhook — приклад з App Marketplace

Якщо в Крамниці налаштовано incoming webhook:
1. Крамниця → Webhooks → «Створити вхідний webhook»
2. Отримати унікальний URL
3. POST-запити на URL автоматично аутентифіковані

Ліміти: Free — 1 вхідний webhook, Standard/Professional — необмежено
