# Pipedrive — Вебхуки (Webhooks v2)

> Webhooks v2 — стандарт з 17 березня 2025. V1 — legacy.

## Огляд

Pipedrive передає події в реальному часі через POST-запити на URL розробника.

**Налаштування:** Settings → Tools and apps → Webhooks або через `POST /v1/webhooks`

**Поточна версія:** Webhooks v2 (стандарт з 17.03.2025)

**Формат подій (v2):** `{event_action}.{event_object}` — наприклад, `create.deal`, `delete.person`, `*.*` (всі)

## Підтримувані об'єкти подій

### Webhooks v2 (повний список)
`deal`, `lead`, `deal_installment`, `deal_product`, `person`, `organization`, `activity`, `note`, `board`, `phase`, `project`, `task`, `user`

### Тільки v1 (legacy)
`pipeline`, `stage`, `activityType`

### Дії
`create`, `update`, `delete`, `*` (wildcard)

## Формат Payload (v2)

```json
{
  "meta": {
    "action": "updated",
    "entity": "deal",
    "entity_id": 12345,
    "company_id": 98765,
    "user_id": 112233,
    "timestamp": 1717184000,
    "correlation_id": "5863a8ad-06f6-4d30-96e1-52f88e564a80"
  },
  "current": {
    "id": 12345,
    "title": "Нова назва угоди",
    "stage_id": 3
  },
  "previous": {
    "title": "Стара назва угоди",
    "stage_id": 2
  }
}
```

- `current` — новий стан сутності
- `previous` — стан до зміни
- При змінах Users — `current` і `previous` передаються масивами

## Переваги v2 vs v1

- Менше дублікатів та пропущених тригерів
- Нові типи об'єктів: `lead`, `deal_installment`, `deal_product`, `board`, `phase`, `project`, `task`
- Краща надійність і зменшені затримки
- Покращений debugging і моніторинг

## Безпека

- Підтримується **HTTP Basic Auth** (логін + пароль при реєстрації вебхука)
- OAuth scopes: `webhooks:read` / `webhooks:full`

## Retry-логіка та Ban System

**Таймаут відповіді:** 10 секунд. Якщо не 2XX або таймаут — вебхук вважається недоставленим.

**3 повторні спроби:**

| Спроба | Затримка |
|--------|----------|
| 1-ша (retry) | через 3 сек |
| 2-га | через 30 сек |
| 3-тя | через 150 сек |

Номер спроби передається в полі `attempt` (v2) або `retry` (v1).

**Ban System:**
- Лічильник збільшується **тільки при збої першої доставки** (повтори не рахуються)
- При **10 послідовних збоїв** першої доставки → вебхук **блокується на 30 хвилин**
- Всі події під час блокування **безповоротно втрачаються**
- Після 30 хвилин лічильник скидається, вебхук активується знову

**Автоматичне видалення:** жодна успішна доставка за **3 послідовних дні** → підписка видаляється назавжди.

## Обмеження

- Максимум **40 активних вебхуків** на одного користувача
- Вихідні вебхуки **НЕ підпадають** під API rate limits
- Лог спроб: Tools and integrations → Webhooks

## Кращі практики

```
Отримати POST → негайно відповісти HTTP 200 → передати тіло у фонову чергу
```

**Помилка:** тривала синхронна обробка → таймаут 10с → Ban System.

## API для управління підписками

```
POST /v1/webhooks    — створити підписку
GET  /v1/webhooks    — список підписок
```

**Джерела:** pipedrive.readme.io/docs/guide-for-webhooks-v2 | pipedrive.readme.io/docs/list-of-webhooks-v2 | developers.pipedrive.com/changelog/post/introducing-webhooks-v2
