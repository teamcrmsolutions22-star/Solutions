# NetHunt CRM — Интеграции

## Нативные интеграции (без Zapier/Make)

### Gmail (ключевая интеграция)
CRM живёт внутри Gmail как Chrome-расширение. Все функции доступны без переключения вкладок.

**Автолинкинг писем:**
- `Settings → Folder → Email Field → enable auto-link`
- Все входящие/исходящие письма привязываются к записям по email-адресу
- Для компаний — привязка по домену email
- Связанные письма маркируются синей иконкой NetHunt со снипетом

**Email Privacy (конфиденциальность писем):**
- `Settings → Workspace Management → Linked Emails Visibility`
- **Public** — все видят переписку
- **Private** — только владелец; другие видят факт письма, но не содержимое; могут запросить доступ
- Только администраторы видят все письма в любом режиме
- Исключение доменов из автолинкинга: `Settings → Workspace Management → Exclude domains`
- ⚠️ Настройки Privacy НЕ распространяются на письма через Campaigns и Workflows

---

### LinkedIn
**Установка:**
1. Chrome Web Store → "NetHunt CRM for LinkedIn" → Add to Chrome → войти
2. На профиле: белая иконка = нет в CRM, синяя = уже есть
3. Один клик → "Create new record" или "Link to existing"
4. Личная страница → папка Contacts, страница компании → папка Companies

**Совместимость:** LinkedIn Sales Navigator (рекомендован для B2B, от $79.99/мес)

**Доступно:** с плана Business и выше

---

### WhatsApp Personal
**Настройка:**
1. `Settings → Chats → Connect Chat → WhatsApp Personal`
2. На мобильном: `WhatsApp → Settings → Link Devices → Link Device → сканировать QR`
3. Выбрать фильтр контактов: все чаты / только от одобренных / whitelist / blacklist

**После подключения:**
- Раздел **Chats** в левом сайдбаре (фильтры: все / мои / не отвечено / не назначено)
- Создание записи: иконка NetHunt в правом углу чата → Create/Link
- WhatsApp-переписка видна в таймлайне записи
- Отвечать на WhatsApp можно прямо из таймлайна

**Ограничение:** только владелец аккаунта WhatsApp может отправлять сообщения (Personal WhatsApp API)

Несколько WhatsApp-аккаунтов разных пользователей можно подключить к одному workspace.

---

### Instagram
- Входящие DM, комментарии, упоминания в Stories
- Создание записей и сохранение истории переписки
- Управление из вкладки Chats без выхода из CRM

---

### Facebook Messenger
Управление сообщениями через вкладку Chats.

---

### Telegram / Viber
Подключение через `Settings → Chats → Connect Chat`.

---

### VoIP
- Интеграция с Aircall, Ringostat и другими VoIP-системами
- Автоматическое логирование звонков
- Триггер Workflow: "Новый VoIP-звонок"
- Доступно: с плана Business и выше

---

### Google Calendar
- Автоматическая привязка событий к записям CRM
- Синие иконки NetHunt на событиях в Calendar
- Скрыть иконки: `Settings → Preferences → Show record linking icon on calendar overview` (привязка сохраняется)

---

### Google Contacts
- `Settings → Google Contacts Sync → выбрать Gmail-лейбл → целевая папка → Sync`
- Двусторонняя синхронизация в реальном времени
- Business Plus: ежечасная синхронизация

---

### Slack
- Уведомления из Workflows при любых триггерах
- Настраивается через действие Workflow → "Send Slack notification"

---

### Google Chat
- Альтернатива Slack для внутренних уведомлений
- Команда NetHunt сама перешла с Slack на Google Chat

---

### Google Looker Studio
- Нативный бесплатный коннектор
- Используется для сложных когортных отчётов и финансового прогнозирования
- Доступен пользователям с Google Workspace
- ⚠️ Недоступен без Google Workspace

---

### Intercom
- Добавление лидов из Intercom в CRM
- Прикрепление чатов к карточкам клиентов
- Просмотр последних разговоров с контактом прямо в записи

---

## Интеграции через платформы-коннекторы

### Make.com (Integromat)

**Настройка подключения:**
1. NetHunt: `иконка профиля → Settings → API Key → Generate → скопировать ключ и email`
2. Make.com: добавить модуль NetHunt → Create a connection → ввести email + API key

**Доступные модули Make:**
- Watch Records
- Watch Comments
- Watch Call Logs
- Create Record
- Search Record
- Update Record
- Create Record Call Log
- Create Comment

---

### Zapier

Связывает NetHunt с **9 000+ веб-сервисами**.

**Продвинутые возможности:**

| Функция | Описание |
|---------|----------|
| New Push | Триггер через Chrome-расширение Zapier; передаёт URL, заголовок страницы, имя пользователя, временную метку |
| Reply to Chrome | Возвращает результат сценария в окно браузерного расширения |
| New or Updated Record in Filter | Триггер только при соответствии записи SQL-подобному запросу |

**Стандартные триггеры:**
- New Record Created
- New Record Comment
- Record Deleted
- Record Updated

---

### Worksection (управление проектами)

**Настройка (5 шагов):**
1. NetHunt: `Settings → Integrations → API Key` → скопировать
2. Worksection: настройки аккаунта
3. Активировать модуль интеграции с NetHunt CRM
4. Ввести email + API-ключ → Сохранить
5. Создать правило: сделка → Won → создать задачу в Worksection с данными клиента, дедлайном, приоритетом, ответственным

---

### Другие платформы

| Платформа | Кол-во интеграций |
|-----------|------------------|
| Integrately | 290 000+ |
| Apix-Drive | 350+ |
| Pipedream | есть |
| APIANT | есть |

---

## Источники

- [NetHunt Integrations](https://nethunt.com/integrations)
- [WhatsApp Integration](https://nethunt.com/integrations/whatsapp)
- [Instagram Integration](https://nethunt.com/integrations/instagram)
- [Make Documentation](https://apps.make.com/nethunt)
- [Zapier NetHunt](https://pipedream.com/apps/nethunt-crm)
- [Worksection — NetHunt FAQ](https://worksection.com/en/faq/nethunt.html)
