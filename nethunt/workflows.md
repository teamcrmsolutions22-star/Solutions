# NetHunt CRM — Автоматизация (Workflows)

## Принцип работы

Workflows — модуль автоматизации, доступный в левом сайдбаре Gmail/NetHunt.

```
Триггер (событие)
    ↓
Helpers (условия/фильтры)
    ↓
Actions (действия)
    ↓
End Workflow
```

В интерфейсе: виджет **Action limit** показывает текущий расход лимита операций по тарифу. Сценарии фильтруются и сортируются по имени, дате создания, статусу (Active / Draft / Inactive) и владельцу.

---

## Лимиты по тарифам

| Тарифный план | Сценариев | Действий/мес |
|---------------|-----------|-------------|
| Basic | ❌ | ❌ |
| Basic Plus | ❌ | ❌ |
| **Business** | 50 | 2 000 |
| **Business Plus** | 80 | 5 000 |
| **Advanced** | 120 | 10 000 |

---

## Триггеры (стартовые события)

| Триггер | Описание |
|---------|----------|
| Новая запись создана | Срабатывает при добавлении записи в выбранную папку |
| Поле изменило значение | Статус, тип контакта, любое другое поле |
| Смена этапа сделки | Специальный триггер для папки Deals |
| Входящее письмо получено | Контакт ответил |
| Новый VoIP-звонок | Звонок через интегрированную VoIP-систему |
| Новый чат | WhatsApp/Instagram/Telegram чат создан или переоткрыт |
| Веб-форма заполнена | Срабатывает при отправке формы с сайта |
| Новый комментарий | Комментарий добавлен к записи |
| Временной триггер | Через X дней после события |

---

## Действия (Actions)

| Действие | Описание |
|----------|----------|
| Send Email | Отправить письмо (шаблон, макросы, от имени менеджера лида) |
| Wait for time | Пауза N дней между действиями |
| Wait for incoming email | Ждать ответа от контакта |
| Wait for field update | Ждать изменения поля |
| Change field value | Изменить стадию, статус, любое поле |
| Create record | Создать новую запись |
| Create task | Назначить задачу пользователю |
| Send Slack notification | Уведомление в Slack |
| Send Google Chat notification | Уведомление в Google Chat |
| Send webhook | Отправить данные на внешний URL |
| **Make API Call** | Произвольный HTTP-запрос (GET/POST/PUT/PATCH/DELETE) на любой внешний сервис |
| End Workflow | Завершить сценарий |

---

## Ветвление (Split Path)

Один Workflow может содержать **несколько параллельных веток** одновременно.

**Пример — drip-кампания с тремя ветками:**
```
Триггер: статус → "Lead"
    ├── Ветка A: Email 1 → Wait 3d → Email 2 → Wait 3d → Email 3 → End
    ├── Ветка B: Wait for incoming email → End  (лид ответил)
    └── Ветка C: Wait for status → "Customer" → End
```

Как только срабатывает любая из веток B или C — весь Workflow останавливается.

---

## Готовые примеры сценариев

### 1. Захват лида из веб-формы
```
Триггер: веб-форма заполнена
    ↓
Action: создать запись в Contacts
    (имя, фамилия, email, компания, телефон, landing page, referring page)
```

### 2. Drip-кампания для лидов
```
Триггер: статус → "Lead"
    ├── A: Email 1 → Wait 3d → Email 2 → Wait 3d → Email 3 → End
    ├── B: Wait for incoming email → End
    └── C: Wait for status → "Customer" → End
```

### 3. Смена стадии + назначение задачи
```
Триггер: входящее письмо от лида получено
    ↓
Action: статус → "Negotiating"
    ↓
Action: создать задачу ответственному менеджеру
```

### 4. Уведомление о закрытой сделке
```
Триггер: стадия сделки → "Won"
    ↓
Action: Send Slack notification → Sales Manager
```

### 5. Онбординг новых trial-пользователей
```
Триггер: новая запись создана (регистрация пользователя)
    ↓
Action: статус → "Contacting"
    ├── A: Email 1 (Welcome) → Wait 2d → Email 2 (Tips) → Wait 3d → Email 3 (Offer) → End
    └── B: Wait for incoming email → End (пользователь ответил, подключается менеджер)
```

### 6. Автоматический dispatch лидов
```
Триггер: новый лид входит в систему
    ↓
Action: назначить ответственного менеджера (round-robin)
```

### 7. Уведомление о платеже
```
Триггер: событие оплаты в CRM
    ↓
Action: Send Google Chat notification → вся команда
```

### 8. Bulk SMS через внешний шлюз (Make API Call)
```
Триггер: стадия сделки → "Кампания"
    ↓
Action: Make API Call
    POST https://alphasms.ua/api/...
    Body: {"phone": "{{record.phone}}", "message": "...{{record.first_name}}..."}
```

---

## Принципы работы с Workflows

*(из практики Head of CS — Анастасия, NetHunt)*

- Не автоматизировать всё подряд — только то, в чём уверен на 100%
- Сохранять человеческий контакт там, где он важен
- Автоматизация должна быть дешевле зарплаты человека, делающего это вручную
- При изменении активного workflow — осторожно: изменение затронет уже запущенные процессы
- Не делать циклических связей между папками — ломает роботов

---

## Настройка workflow — общий алгоритм

1. Левый сайдбар → **Workflows** → **Add new** → дать имя
2. Добавить **стартовый триггер** (выбрать папку и событие)
3. Добавить **условия/ветки** (Split Path если нужно)
4. Добавить **действия** в каждую ветку
5. В конце каждой ветки — **End Workflow**
6. Нажать **Activate**

---

## Источники

- [Triggers in automation — NetHunt Help](https://help.nethunt.com/en/articles/4986669-triggers-in-automation)
- [What is Workflows in NetHunt CRM](https://help.nethunt.com/en/articles/4904361-what-is-workflows-in-nethunt-crm)
- [Workflow section overview](https://help.nethunt.com/en/articles/14654741-workflow-section-overview)
- [Bulk messaging via API Call action](https://help.nethunt.com/en/articles/13449977-how-to-set-up-bulk-messaging-in-messengers-in-nethunt-crm-using-the-api-call-action)
- [NetHunt Blog — Automated workflow examples](https://nethunt.com/blog/automated-workflow-examples/)
