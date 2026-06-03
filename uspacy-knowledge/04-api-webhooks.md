# Uspacy — API та Webhooks

> Джерело: Gemini Deep Research, 2026-06-03

## Архітектура

- **Тип:** API-first мікросервісна архітектура
- **Протокол:** REST (JSON)
- **Документація:** https://uspacy.readme.io/reference/introduction
- **Dev-портал:** https://uspacy.dev/

---

## Автентифікація

### 1. Direct Login (JWT Bearer)
```http
POST https://{domain}.uspacy.ua/auth/v1/login
Content-Type: application/json

{
  "email": "developer@enterprise.com",
  "password": "SecurePassword123"
}
```
Відповідь: JWT Bearer token → використовується в заголовку `Authorization: Bearer <token>`

### 2. OAuth 2.0 (для App Marketplace)
1. Зареєструвати застосунок у developer console → отримати `client_id` та `client_secret`
2. При встановленні app у workspace — платформа надсилає `authorization_code` на redirect URL
3. Обміняти код на `access_token`

### 3. Incoming Webhooks (без токенів)
- Створити webhook в адмін-панелі → отримати унікальний захардкоджений URL
- Додавати відносні API-шляхи безпосередньо до цього URL:

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

## Мікросервіси та API-шляхи

| Мікросервіс | Базовий шлях | Ресурси |
|-------------|-------------|---------|
| authService | /auth/v1 | Реєстрація, логін, підтвердження email, скидання паролю, 2FA |
| usersService | /users/v1 | Профілі, відділи, кастомні поля профілів, запрошення |
| roles | /users/v1/roles | Ролі доступу, матриці прав |
| tasksService | /tasks/v1 | Завдання, чеклісти, Kanban-стадії, шаблони, таймтрекінг |
| messengerService | /messenger/v1 | Чати, групові повідомлення, зовнішні канали, лог дзвінків |
| newsfeedService | /newsfeed/v1 | Пости корпоративного стріму, системні сповіщення, коментарі |
| crmService | /crm/v1 | Ліди, угоди, контакти, компанії, воронки, продукти, шаблони, кастомні сутності |
| filesService | /files/v1 | Файли, вкладення, архів документів |
| groupService | /group/v1 | Робочі групи, черги модерації, ролі учасників |
| commentsService | /comments/v1 | Вкладені коментарі до завдань, CRM-сутностей, активностей, постів |

---

## Webhooks (вихідні)

### Handshake-верифікація
1. При створенні вихідного webhook → платформа надсилає POST з validation link на зовнішній URL
2. Сервер розробника: отримати запит → розпарсити JSON → витягти link → зробити GET-запит на цей link
3. Платформа отримує GET → статус webhook змінюється на «Confirmed» → починається стрімінг подій

### Матриця подій для сутностей

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

---

## Приклад: Відновлення з кошика (CRM Recycle Bin)

**Метод:** PATCH  
**URL:** `https://{domain}.uspacy.ua/crm/v1/entities/{entity}/trash/restore`  
**Path params:** `{entity}` = `leads` | `deals` | `contacts` | `companies`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "entity_ids": [301, 302, 303]
}
```

**cURL:**
```bash
curl -X PATCH "https://enterprise.uspacy.ua/crm/v1/entities/deals/trash/restore" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"entity_ids": [301, 302, 303]}'
```

Успішна відповідь: відновлені елементи повертаються в активні воронки + підтверджувальний payload.

---

## Джерела
- https://uspacy.readme.io/reference/introduction
- https://uspacy.com/support/knowledgebase/webhooks-how-does-it-work-en/
- https://uspacy.readme.io/reference/patch_crm-v1-entities-entity-trash-restore
- https://uspacy.dev/
