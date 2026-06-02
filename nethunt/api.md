# NetHunt CRM — API Документация

## Обзор

NetHunt предоставляет **два независимых API**:
1. **Integration API (REST v1)** — для пользовательских интеграций
2. **Partner API** — для дистрибьюторов и системных интеграторов

> ⚠️ Термин «API v6» — миф. Возникает из-за индексации каталогов, где рядом с NetHunt находится «Daktela V6 Connector». У NetHunt один API — **REST v1**, стабильный, без смены мажорной версии.

---

## Аутентификация

Оба API используют **HTTP Basic Authentication** по протоколу HTTPS.

### Integration API
```
Authorization: Basic base64(email:api_key)
```
- `email` — регистрационный email пользователя NetHunt
- `api_key` — сгенерированный API-ключ

**Где получить ключ:**
`Settings → Apps and Other Integrations → Generate API Key`

### Partner API
```
Authorization: Basic base64(partner_id:partner_api_key)
```

---

## Форматы данных

| Операция | Content-Type |
|----------|-------------|
| Обычные запросы | `application/json` |
| Частичное обновление (PATCH) | `application/merge-patch+json` |
| Протокол | HTTPS (GET, POST, PUT, PATCH, DELETE) |

---

## Обработка ошибок

| Код | Причина |
|-----|---------|
| `401` | Некорректный Authorization заголовок |
| `404` | Неверный URL, папка или запись не существует |
| `500` | Временные проблемы на стороне серверов |

**Рекомендация:** внедрять экспоненциальную задержку (exponential backoff) для повторных запросов при превышении rate limits.

---

## Integration API (v1) — Эндпоинты

Base URL: `https://nethunt.com`

### Папки (Folders)

```
GET /api/v1/zapier/triggers/readable-folder
```
Возвращает массив папок, доступных для чтения. Содержит ID и название каждой папки.

```
GET /api/v1/zapier/triggers/writable-folder
```
Возвращает папки, в которых пользователь имеет права на создание записей.

```
GET /api/v1/zapier/triggers/folder-field/{folderId}
```
Извлекает структуру полей конкретной папки.

---

### Записи (Records)

```
GET /api/v1/zapier/searches/find-record/{folderId}
    ?recordId={recordId}
    &query={textQuery}
    &limit={n}
```
Поиск записей по ID или текстовому запросу с ограничением выборки.

```
POST /api/v1/zapier/actions/create-record/{folderId}
```
Создать новую запись в указанной папке.

```
POST /api/v1/zapier/actions/update-record/{recordId}
```
Обновить существующую запись.

```
DELETE /api/v1/zapier/actions/delete-record/{recordId}
```
Удалить запись.

---

### Триггеры (Triggers)

```
GET /api/v1/zapier/triggers/new-record/{folderId}
```
Триггер: новая запись создана.

```
GET /api/v1/zapier/triggers/new-comment/{folderId}
```
Триггер: новый комментарий к записи.

```
GET /api/v1/zapier/triggers/new-call-log/{folderId}
```
Триггер: новая запись звонка.

---

## Partner API — Эндпоинты

Base URL: `https://nethunt.com/api`

### Управление Workspaces

```
GET /partners/{partnerId}/workspaces
```
Список всех workspace-ов, созданных партнёром.

```
GET /partners/{partnerId}/workspaces/{workspaceId}
```
Детальная информация о конкретном workspace.

```
POST /partners/{partnerId}/workspaces
```
Создать новый workspace.

**Обязательные параметры (JSON):**
```json
{
  "name": "Название пространства",
  "expirationTime": "2027-01-01T00:00:00Z",
  "permissions": [
    {
      "email": "user@example.com",
      "fullName": "Имя Фамилия"
    }
  ]
}
```

**Опциональные параметры:**
```json
{
  "phoneNumber": "+380...",
  "teamSize": 10,
  "seatNumber": 5
}
```

```
PATCH /partners/{partnerId}/workspaces/{workspaceId}
Content-Type: application/merge-patch+json
```
Частичное обновление настроек workspace.

### Управление партнёрскими аккаунтами

Аналогичный набор методов для эндпоинтов семейства `/partners`:
- Создание дочерних партнёрских кабинетов
- Настройка брендированных логотипов и веб-сайтов
- Управление параметрами технической поддержки

---

## Доступ к API по тарифам

| Тарифный план | API доступ |
|---------------|-----------|
| Basic | ❌ Нет |
| Basic Plus | ❌ Нет |
| Business | ❌ Нет |
| **Business Plus** | ✅ До 10 000 вызовов/мес |
| **Advanced** | ✅ Безлимитно |

---

## Make API Call — действие внутри Workflows

Особое действие в сценариях автоматизации, позволяющее отправлять произвольные HTTP-запросы на внешние серверы прямо из Workflow.

**Поддерживаемые методы:** GET, POST, PUT, PATCH, DELETE

**Возможности:**
- Кастомные заголовки запроса
- Динамические макросы в теле запроса (подставляет поля из записи CRM)
- Парсинг ответа (Response data) для использования на следующих шагах сценария

**Практический пример — SMS через AlphaSMS:**
```
Триггер: стадия сделки → "Кампания"
  ↓
Make API Call → POST https://alphasms.ua/api/...
  Body: {
    "phone": "{{record.phone}}",
    "message": "Привет, {{record.first_name}}! ..."
  }
```

---

## Python пример — получение записей

```python
import requests
import base64

email = "your@email.com"
api_key = "your_api_key"
folder_id = "your_folder_id"

credentials = base64.b64encode(f"{email}:{api_key}".encode()).decode()
headers = {
    "Authorization": f"Basic {credentials}",
    "Content-Type": "application/json"
}

# Поиск записей
response = requests.get(
    f"https://nethunt.com/api/v1/zapier/searches/find-record/{folder_id}",
    headers=headers,
    params={"query": "search text", "limit": 10}
)

records = response.json()
```

---

## Источники

- [NetHunt Integration API](https://nethunt.com/integration-api)
- [NetHunt Partner API](https://nethunt.com/partner-api)
- [Endgrate — Python examples](https://endgrate.com/blog/using-the-nethunt-api-to-get-records-(with-python-examples))
- [Composio MCP Integration](https://composio.dev/toolkits/nethunt_crm)
- [Pipedream NetHunt](https://pipedream.com/apps/nethunt-crm)
