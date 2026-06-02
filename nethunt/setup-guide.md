# NetHunt CRM — Пошаговое руководство по настройке

## Предварительные требования

- ✅ Все пользователи имеют аккаунты **Google Workspace** (корпоративный Gmail)
- ✅ Установлено Chrome-расширение NetHunt
- ✅ Выбран тарифный план (минимум Business для автоматизаций)

---

## 1. Первоначальная настройка Workspace

### Структура и пользователи
1. `Settings → Workspace Management → General` — название, timezone, язык
2. `Settings → Users & Roles` — пригласить команду по email
3. Назначить роли: Admin / Member / Read-only (кастомные роли — с плана Advanced)

### Получение API-ключа
1. `иконка профиля (правый верхний угол) → Settings`
2. `API Key → Generate`
3. Сохранить: email + API-ключ (нужны для Make, Zapier, Worksection и прямых запросов)

---

## 2. Настройка папок и полей

### Создание/редактирование папки
1. `Settings → Folder → выбрать папку (Contacts / Deals / Companies)`
2. **Field Management** — список всех существующих полей
3. **Add field** → выбрать тип → заполнить параметры → Save
4. Перетащить поля в нужном порядке
5. **Клонировать поле:** иконка «две страницы» справа от поля

### Типы полей — рекомендации
- Стандартизированные значения (регионы, типы клиентов) → **dropdown** или **picklist** (не текст!)
- Автоматические расчёты → **Formula** (например: First Name + " " + Last Name)
- Суммарные метрики → **Related Summary** (сумма сделок по компании)
- Поведенческая статистика → **Statistical** (Last Email, Total Emails, время на стадии)

### Важно при проектировании
- Текстовый поиск требует точного совпадения — «SQFT» ≠ «square foot»
- Связи между папками — **только односторонние** (Contacts → Companies, не наоборот)

---

## 3. Настройка связей между папками (Related Records)

1. `Settings → Folder (дочерняя папка) → Add field → Related Records`
2. Выбрать родительскую папку
3. Сохранить
4. Дочерняя запись появляется внизу родительской карточки

**Пример:** Contacts → Companies (контакт видит компанию сверху, компания видит контакты снизу)

---

## 4. Настройка воронки продаж (Pipeline)

1. `Settings → Folder (Deals) → Customize fields → поле Stage`
2. Добавить/переименовать/удалить этапы
3. Базовые этапы: New → Presentation → Negotiating → Won → Lost
4. Настроить несколько пайплайнов для разных продуктов/регионов

**При изменении этапов:** старые записи сохраняют прежнее значение. Массовое обновление:
- Выделить записи → drag-and-drop на новый этап

---

## 5. Настройка Pресетов (Presets)

1. `Settings → Folder → Presets`
2. Add Preset → задать имя → установить значения полей по умолчанию
3. Пример: новая сделка → Probability = 50%, Stage = New

---

## 6. Настройка Gmail интеграции

### Автолинкинг писем
1. `Settings → папка Contacts → поле Email → enable auto-link`
2. Для компаний: `Settings → Companies → поле URL → enable auto-link` (привязка по домену)

### Исключение доменов
1. `Settings → Workspace Management → Exclude domains from auto-linking`
2. Добавить домены (например, внутренняя почта, партнёры)

### Конфиденциальность писем
1. `Settings → Workspace Management → Linked Emails Visibility`
2. Выбрать: Public / Private

### Снипеты в инбоксе
1. `Settings → Folder → навести мышь на поле → иконка закладки`
2. Настроить 2–3 снипета максимум
3. Рекомендуется: Должность + Тип контакта + Лид-источник

### Email Tracking
1. `Settings → Preferences → Email open tracking ✓`
2. `Settings → Preferences → Link click tracking ✓`

---

## 7. Подключение Google Calendar

- Привязка событий к записям происходит автоматически
- Скрыть иконки NetHunt на событиях: `Preferences → Show record linking icon on calendar overview → off`

---

## 8. Синхронизация Google Contacts

1. `Settings → Google Contacts Sync`
2. Выбрать Gmail-лейбл(ы) или все контакты
3. Выбрать целевую папку
4. Нажать **Sync**

---

## 9. Подключение мессенджеров

### WhatsApp Personal
1. `Settings → Chats → Connect Chat → WhatsApp Personal`
2. На мобильном: `WhatsApp → Settings → Link Devices → Link Device → QR-код`
3. Выбрать фильтр: все / одобренные / whitelist / blacklist

### Instagram
1. `Settings → Chats → Connect Chat → Instagram`
2. Авторизоваться через бизнес-аккаунт Instagram

### Telegram / Viber
1. `Settings → Chats → Connect Chat → Telegram / Viber`
2. Следовать инструкциям на экране

---

## 10. Подключение LinkedIn

1. Chrome Web Store → "NetHunt CRM for LinkedIn" → Add to Chrome
2. Войти в аккаунт NetHunt
3. Открыть любой профиль LinkedIn — иконка NetHunt появляется автоматически

---

## 11. Настройка Workflows (автоматизаций)

*(Доступно с плана Business)*

### Создание нового сценария
1. Левый сайдбар → **Workflows** → **Add new** → имя
2. Добавить **триггер** (папка + событие)
3. Добавить **действия** (Send Email, Wait, Create Task и т.д.)
4. Опционально: **Split Path** для параллельных веток
5. В конце каждой ветки: **End Workflow**
6. Нажать **Activate**

### Мониторинг
- Виджет **Action limit** показывает расход лимита
- Фильтрация сценариев: по статусу (Active / Draft / Inactive), имени, дате, владельцу

---

## 12. Создание Views (представлений)

1. Открыть папку → настроить фильтры
2. Нажать **Save as** → имя → видимость (личное / общее)
3. Сохранённый вид появляется в сайдбаре

### Полезные Views для старта

| View | Фильтр |
|------|--------|
| Требуют внимания | Last Contact Date > 2 дня |
| Потерянные (без бюджета) | Status = Lost + Reason = No Budget |
| Потерянные (нет функций) | Status = Lost + Reason = Missing Features |
| Лид-источники | Card view, группировка по Lead Source |
| По территориям | Card view, группировка по Country |
| Прогноз закрытия | Forecast view, текущий месяц |

---

## 13. Настройка отчётов

### User Activity Report *(только Business+)*
1. Reports → User Activity → Create
2. Метрики: emails sent/received, campaigns, calendar events, comments, calls, files
3. Параметры: папка, пользователи, период
4. Сохранить
5. Dashboard → Add Widget → User Activity → выбрать отчёт

---

## 14. Интеграция с Make.com

1. NetHunt: `Settings → API Key → Generate → скопировать email + ключ`
2. Make.com: модуль NetHunt → Create a connection → ввести данные
3. Доступные модули: Watch Records, Create Record, Update Record, Search Record, Create Call Log, Create Comment

---

## 15. Интеграция с Zapier

1. Zapier: найти приложение «NetHunt CRM»
2. Connect → ввести email + API-ключ
3. Выбрать триггер (New Record, Updated Record, New Comment, New Call Log)
4. Настроить действия в других сервисах

---

## 16. Интеграция с Worksection

1. NetHunt: `Settings → Integrations → API Key` → скопировать
2. Worksection: `Настройки аккаунта → NetHunt CRM → Активировать`
3. Ввести email + API-ключ → Сохранить
4. Создать правило: сделка Won → создать задачу в проекте

---

## Стратегические рекомендации по внедрению

1. **Аудит инфраструктуры:** убедиться что все пользователи на Google Workspace
2. **Стандартизация ввода:** минимум текстовых полей, максимум dropdown/picklist
3. **Односторонние связи:** Related Records только в одну сторону
4. **Лёгкая аналитика:** встроенные отчёты — для оперативного контроля воронки; сложные отчёты → Google Looker Studio
5. **Постепенная автоматизация:** начинать с простых Workflows, тестировать перед активацией
6. **Защита данных:** настроить роли и права доступа до приглашения команды

---

## Источники

- [Getting started with NetHunt CRM](https://help.nethunt.com/en/collections/1455999-getting-started-with-nethunt-crm)
- [NetHunt CRM Glossary](https://help.nethunt.com/en/articles/14686402-nethunt-crm-glossary)
- [Related Records](https://help.nethunt.com/en/articles/11501511-related-records)
- [Setting up your first sales pipeline](https://help.nethunt.com/en/articles/9897511-setting-up-your-first-sales-pipeline)
- [Reports overview](https://help.nethunt.com/en/articles/9897695-reports-overview)
- [Settings structure](https://help.nethunt.com/en/articles/2813046-settings-structure)
