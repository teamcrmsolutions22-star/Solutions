# OneBox — API

> Джерело: YouTube-транскрипти OneBox (автоматичні субтитри), дистиляція 2026-06-09

---

## Загальні відомості

OneBox (OneBox OS) надає REST API для інтеграції зовнішніх систем. Через API можна:
- Передавати дані з зовнішніх систем у OneBox (створення замовлень, товарів, платежів тощо)
- Отримувати дані з OneBox у зовнішні системи
- Видаляти та редагувати записи

Документація API доступна за адресою:

```
https://<ваш-домен>/dog/
```

У документації → розділ **Box REST API** → підрозділи по сутностях (orders, products, categories, brands, payments, warehouses, users тощо).

---

## Отримання ключа (логін + пароль для API)

Кожен API-запит потребує двох обов'язкових параметрів:
- `login` — логін користувача-адміністратора
- `password` — пароль у форматі **md5-хеш**

### Спосіб 1 — Через картку контакту з правами адміністратора

1. Відкрити додаток **Контакти** → відфільтрувати по рівню доступу «Адміністратор»
2. Вибрати контакт → передати його в додаток **Пользователи/Сотрудники**
3. Вкладка **Доступ для пользователей** → тут відображається поле **REST API пароль** (md5-хеш)
4. Якщо поле порожнє — встановити будь-який пароль і зберегти; після збереження md5-хеш з'явиться

> Цей md5-хеш і є `password` для API-запитів.

### Спосіб 2 — Через додаток «API» (генерація ключа)

1. Відкрити список усіх додатків → знайти додаток **API**
   - Якщо відсутній — встановити з офіційного сайту `crm-onebox.com` через кнопку «+»
2. У правому верхньому куті натиснути іконку **Генерація ключа**
3. Вибрати співробітника → натиснути **Сгенерировать**
4. Отриманий ключ використовується як `password` у запитах

### Рекомендація: використовувати віртуального співробітника

**Обов'язково** створюйте окремого «псевдо-співробітника» (без фізичної людини) з правами адміністратора спеціально для API-запитів. Причина:

- Якщо API-запит виконується з md5-паролем реального адміністратора, який в цей момент працює в системі → система **вилогінить реального користувача** (API-запит займає сесію)
- Після відправки запиту реальному користувачу доведеться повторно авторизуватися

### Нюанс: сесії

API-запит займає одну вільну сесію в системі. Якщо всі ліцензовані сесії зайняті реальними користувачами — відправити API-запит **не вдасться**. Врахуйте це при плануванні ліцензій.

---

## Структура API-запиту

Загальний формат URL-запиту:

```
https://<ваш-домен>/api/<метод>/?login=<логін>&password=<md5-хеш>&param1=value1&param2=value2...
```

- Параметри розділяються символом `&` (ampersand)
- Кожен параметр: `назва=значення`
- Запит можна тестувати прямо в адресному рядку браузера

### Формат відповіді (приклад успіху)

```json
{"status": "ok", "order_id": 207}
```

---

## API замовлень (Orders / Processes)

> У OneBox «замовлення» = «процеси» (бізнес-процеси). API orders охоплює замовлення, задачі, проєкти, ліди.

**Методи:**

| Метод | Дія |
|---|---|
| `api/order/set` | Створити замовлення |
| `api/order/delete` | Видалити замовлення |
| `api/order/update` | Редагувати замовлення |
| `api/order/get` | Отримати одне замовлення |
| `api/orders/get` | Отримати всі замовлення |
| `api/order/comments/get` | Отримати коментарі процесу |

### Створення замовлення — `api/order/set`

Обов'язкові параметри: `login`, `password`

Ключові параметри:

| Параметр | Опис |
|---|---|
| `order_code` | Зовнішній унікальний ідентифікатор замовлення з вашої системи |
| `workflow` | Назва бізнес-процесу (BP), в якому створюється замовлення; якщо не вказати — обирається BP за замовчуванням |
| `status` | Назва статусу, в якому має створитися замовлення |
| `name` | Назва процесу/замовлення |
| `client_phone` | Телефон клієнта (якщо контакт існує в системі — він підв'яжеться автоматично) |
| `comment` | Коментар до замовлення |
| `products_array[0][id]` | ID першого товару в замовленні |
| `products_array[0][name]` | Назва товару (відображається тільки в процесі, не змінює картку товару) |
| `products_array[0][price]` | Ціна товару |
| `products_array[0][count]` | Кількість товару |
| `products_array[1][id]` | ID другого товару (індекс масиву з 0) |

**Приклад запиту:**

```
https://<домен>/api/order/set/?login=rstp&password=<md5>&order_code=123zzz12&workflow=Заказ клиента&status=Подтвержден логистикой&name=Тестовый заказ через api&client_phone=+380XXXXXXXXX&comment=текст&products_array[0][id]=6&products_array[0][name]=Диван&products_array[0][price]=7000&products_array[0][count]=1&products_array[1][id]=15&products_array[1][name]=Угловой&products_array[1][price]=4000&products_array[1][count]=1
```

**Відповідь:**

```json
{"status": "ok", "order_id": 207}
```

### Видалення замовлення — `api/order/delete`

Параметри: `login`, `password`, `order_id`

**Приклад:**

```
https://<домен>/api/order/delete/?login=rstp&password=<md5>&order_id=207
```

**Відповідь:**

```json
{"order": 207, "result": "ok"}
```

> Після видалення через API в історії змін процесу фіксується запис: видалено користувачем rstp через API.

---

## API товарів (Products)

**Методи:**

| Метод | Дія |
|---|---|
| `api/product/set` | Додати товар |
| `api/product/delete` | Видалити товар |
| `api/product/update` | Редагувати товар |
| `api/product/get` | Отримати один товар або всі товари |

### Додавання товару — `api/product/set`

Обов'язкові поля: `login`, `password`, `name`

Ключові параметри:

| Параметр | Опис |
|---|---|
| `name` | Назва товару (обов'язкове) |
| `description` | Опис |
| `price` | Ціна |
| `currency_name` | Валюта (наприклад, `USD`) |
| `available` | Наявність: `1` = в наявності |
| `filter[0][filter_id]` | ID фільтра/характеристики першого атрибута |
| `filter[0][filter_value]` | Значення першого атрибута |
| `filter[1][filter_id]` | ID другого атрибута |
| `filter[1][filter_value]` | Значення другого атрибута |
| `custom_field_<id>` | Значення кастомного поля товару (id — ідентифікатор поля) |

**Приклад запиту:**

```
https://<домен>/api/product/set/?login=rstp&password=<md5>&name=Тестовый товар через api&description=тест&price=1000&currency_name=USD&available=1&filter[0][filter_id]=1&filter[0][filter_value]=Красный&filter[1][filter_id]=2&filter[1][filter_value]=XL
```

**Відповідь:**

```json
{"status": "ok", "product_id": 20}
```

### Редагування товару — `api/product/update`

Обов'язкові: `login`, `password` + один з ідентифікаторів: `id` або `code` (зовнішній ID) або `article`.

**Приклад:**

```
https://<домен>/api/product/update/?login=rstp&password=<md5>&id=20&name=Тестовый товар через api измененный&description=тест&price=1500
```

### Видалення товару — `api/product/delete`

Параметри: `login`, `password` + `id` або `code` або `article`.

```
https://<домен>/api/product/delete/?login=rstp&password=<md5>&id=666
```

### Отримання одного товару — `api/product/get`

```
https://<домен>/api/product/get/?login=rstp&password=<md5>&id=20&custom_fields=true
```

- `custom_fields=true` — повертати також значення кастомних полів

У відповіді: масив з даними товару, включно з фільтрами (`filter_id`, `filter_name`, `filter_value`) та кастомними полями (`custom_field_array`).

### Отримання всіх товарів — `api/product/get` з параметром `part`

```
https://<домен>/api/product/get/?login=rstp&password=<md5>&part=1&custom_fields=true&relate=true
```

- `part` — номер порції (обов'язковий): `1`, `2`, `3`... Кожна порція — до **1000 товарів**
- Для 10 000 товарів потрібно 10 запитів з `part=1` до `part=10`

---

## API категорій (Categories)

**Методи:**

| Метод | Дія |
|---|---|
| `api/category/set` | Додати категорію |
| `api/category/delete` | Видалити категорію |
| `api/category/update` | Редагувати категорію |
| `api/category/get` | Отримати одну категорію або всі |

### Додавання категорії — `api/category/set`

Обов'язкові: `login`, `password`, `name`

| Параметр | Опис |
|---|---|
| `name` | Назва категорії |
| `code` | Зовнішній унікальний ID категорії з вашої системи (якщо категорія з таким `code` вже існує — повернеться помилка) |
| `description` | Опис |

**Приклад:**

```
https://<домен>/api/category/set/?login=rstp&password=<md5>&name=API категорія&code=777888&description=Ця категорія створена через api
```

**Відповідь:**

```json
{"status": "ok", "category_id": 9}
```

### Редагування категорії — `api/category/update`

Обов'язкові: `login`, `password` + `id` або `code`

```
https://<домен>/api/category/update/?login=rstp&password=<md5>&id=9&name=API2&parent_id=3
```

- `parent_id` — ID батьківської категорії (для побудови ієрархії)

### Видалення категорії — `api/category/delete`

```
https://<домен>/api/category/delete/?login=rstp&password=<md5>&id=9
```

### Отримання однієї категорії

```
https://<домен>/api/category/get/?login=rstp&password=<md5>&id=3
```

### Отримання всіх категорій

```
https://<домен>/api/category/get/?login=rstp&password=<md5>
```

(без вказання `id` або `code` — повертаються всі категорії)

---

## API брендів (Brands)

**Методи:**

| Метод | Дія |
|---|---|
| `api/brand/set` | Додати бренд |
| `api/brand/delete` | Видалити бренд |
| `api/brand/update` | Редагувати бренд |
| `api/brand/get` | Отримати один або всі бренди |

### Додавання бренду — `api/brand/set`

Обов'язкові: `login`, `password`, `name`

| Параметр | Опис |
|---|---|
| `name` | Назва бренду |
| `code` | Зовнішній ID бренду |
| `description` | Опис |
| `image` | Зображення ⚠️ потребує перевірки (формат передачі не уточнено) |
| `hidden` | Приховати бренд: `1` = прихований, `0` = видимий |

**Приклад:**

```
https://<домен>/api/brand/set/?login=rstp&password=<md5>&name=Brand new api&code=9d555&description=Test description
```

**Відповідь:**

```json
{"status": "ok", "brand_id": 2}
```

### Редагування бренду — `api/brand/update`

Обов'язкові: `login`, `password`, `name` + `id` або `code`

```
https://<домен>/api/brand/update/?login=rstp&password=<md5>&id=2&name=Brand new api&description=тест edited
```

### Видалення бренду — `api/brand/delete`

```
https://<домен>/api/brand/delete/?login=rstp&password=<md5>&id=2
```

### Отримання одного бренду

```
https://<домен>/api/brand/get/?login=rstp&password=<md5>&id=2
```

Відповідь містить: `id`, `name`, `code`, `image`, `description`, `hidden` (0/1).

### Отримання всіх брендів

```
https://<домен>/api/brand/get/?login=rstp&password=<md5>
```

---

## API платежів (Payments)

**Методи:**

| Метод | Дія |
|---|---|
| `api/payment/set` | Додати фактичний платіж |
| `api/payment/provision/set` | Додати очікуваний платіж |
| `api/payment/delete` | Видалити фактичний платіж |
| `api/payment/provision/delete` | Видалити очікуваний платіж |
| `api/payment/update` | Редагувати фактичний платіж |
| `api/payment/provision/update` | Редагувати очікуваний платіж |
| `api/payment/provision/get` | Отримати очікуваний платіж |
| `api/payment/provision/get` | Отримати всі очікувані платежі |
| `api/payment/get` | Отримати фактичний платіж |
| `api/payment/get` | Отримати всі фактичні платежі |
| `api/finance/accounts/balance/get` | Отримати баланси всіх фінансових рахунків |
| `api/finance/budgets/balance/get` | Отримати баланси всіх бюджетів |

### Додавання фактичного платежу — `api/payment/set`

Обов'язкові: `login`, `password`, `sum`

| Параметр | Опис |
|---|---|
| `sum` | Сума платежу (обов'язкове). Позитивне число → вхідний платіж; від'ємне → вихідний |
| `direction` | Напрям платежу (необов'язковий): визначається автоматично по знаку `sum` |
| `se_date` | Дата створення платежу (формат: `YYYY-MM-DD HH:MM:SS` ⚠️ або схожий) |
| `currency_name` | Валюта (наприклад, `USD`, `UAH`) — має відповідати валюті рахунку |
| `account_id` | ID гаманця/рахунку (валюта рахунку повинна відповідати валюті платежу) |
| `client_id` | ID клієнта-контакту |
| `manager_id` | ID менеджера (автор платежу) |
| `comment` | Коментар |
| `order_id` | ID замовлення для прив'язки платежу |
| `phone_client` | Телефон клієнта (пошук існуючого контакту) |
| `email_client` | Email клієнта (пошук існуючого контакту) |

**Приклад (вхідний платіж):**

```
https://<домен>/api/payment/set/?login=rstp&password=<md5>&se_date=2020-09-01 10:00:00&sum=100&currency_name=USD&account_id=2&client_id=97&manager_id=3&comment=тест
```

**Відповідь:**

```json
{"status": "ok", "payment_id": 29, "payment_code_1c": false}
```

- `payment_code_1c: false` — якщо зовнішній ID (`code`) не передавався

**Приклад (вихідний платіж — від'ємна сума):**

```
https://<домен>/api/payment/set/?login=rstp&password=<md5>&se_date=2020-09-02 10:00:00&sum=-50&currency_name=USD&account_id=2&comment=тест2
```

### Додавання очікуваного платежу — `api/payment/provision/set`

| Параметр | Опис |
|---|---|
| `ki_date` | Очікувана дата отримання платежу |
| `sum` | Сума |
| `currency_name` | Валюта |
| `account_id` | ID рахунку |
| `order_id` | ID замовлення для прив'язки |
| `manager_id` | ID менеджера |
| `receive` | `1` = отримано, `0` = не отримано |

**Відповідь:**

```json
{"status": "ok", "payment_id": 3}
```

### Отримання одного фактичного платежу — `api/payment/get`

```
https://<домен>/api/payment/get/?login=rstp&password=<md5>&payment_id=29
```

### Отримання всіх фактичних платежів — `api/payment/get` з `part`

```
https://<домен>/api/payment/get/?login=rstp&password=<md5>&part=1
```

- `part=1` → перші до 1000 платежів; `part=2` → наступні 1000 тощо

---

## API складів (Warehouses / Storage)

**Методи:**

| Метод | Дія |
|---|---|
| `api/storage/transaction` | Оприбуткування / Переміщення / Списання |
| `api/storage/transaction/edit` | Редагування складської операції |
| `api/storage/transaction/update_balance` | Оновлення балансу на складі |
| `api/storage/transaction/get` | Отримати операції |
| `api/storage/balance/get` | Отримати залишки на складі |
| `api/storage/get` | Отримати список складів |
| `api/storage/product/balance/change` | Змінити баланс продуктів на складі |

### Складські операції — `api/storage/transaction`

Параметр `type` визначає тип операції:

| Значення `type` | Дія |
|---|---|
| `incoming` | Оприбуткування |
| `transfer` | Переміщення між складами |
| `writeoff` | Списання |

**Ключові параметри:**

| Параметр | Опис |
|---|---|
| `type` | Тип операції (`incoming`, `transfer`, `writeoff`) |
| `storageto` | ID або назва складу призначення (якщо складу не існує — система створить новий) |
| `storagefrom` | ID складу-джерела (для переміщення) |
| `products_array[0][code]` | ID/код першого товару |
| `products_array[0][count]` | Кількість |
| `products_array[0][price]` | Ціна |
| `products_array[0][currency]` | Валюта (наприклад, `UAH`) |
| `products_array[0][serial_number]` | Серійний номер |
| `products_array[1][code]` | ID/код другого товару |

**Приклад (оприбуткування двох товарів):**

```
https://<домен>/api/storage/transaction/?login=rstp&password=<md5>&type=incoming&storageto=5&products_array[0][code]=15&products_array[0][count]=2&products_array[0][price]=100&products_array[0][currency]=UAH&products_array[0][serial_number]=123456&products_array[1][code]=17&products_array[1][count]=3&products_array[1][price]=150&products_array[1][currency]=UAH&products_array[1][serial_number]=789
```

**Відповідь:**

```json
{"status": "ok", "transaction_id": 27}
```

### Оновлення балансу на складі — `api/storage/transaction/update_balance`

Автоматично оприбутковує або списує різницю до потрібного рівня:

| Параметр | Опис |
|---|---|
| `storageto` | ID складу |
| `supplier_code` | ID постачальника |
| `products_array[0][code]` | ID товару |
| `products_array[0][amount]` | Цільова кількість |

**Приклад:** якщо на складі є 2 штуки, а `amount=10` → система оприбуткує 8 штук. Якщо потім відправити `amount=7` → спишеться 3 штуки.

### Зміна балансу продуктів — `api/storage/product/balance/change`

Дозволяє: оприбуткувати, списати або **встановити** точну кількість.

| Параметр | Опис |
|---|---|
| `data[count]` | Кількість. Позитивне → оприбуткування; від'ємне → списання |
| `data[is_total_balance]` | `1` → встановити залишок рівним `count` (не дельта, а абсолютне значення) |

> Якщо `is_total_balance=1` і `count=2` → залишок на складі стане рівно 2 шт., незалежно від поточного стану.

### Отримання залишків — `api/storage/balance/get`

```
https://<домен>/api/storage/balance/get/?login=rstp&password=<md5>&storage_name_id=5
```

- `storage_name_id` — ID складу

**Відповідь:** масив з даними про залишки товарів на вказаному складі.

---

## Стандартний контакт rstp (rest api)

У кожній новій інсталяції OneBox за замовчуванням створюється системний контакт:
- **Ім'я:** `rstp` (або `rest api`)
- **Email:** `rstp@crm-onebox.com`
- **ID:** зазвичай `1`
- **Рівень доступу:** Адміністратор

Його логін і REST API пароль можна використовувати для API-запитів. Знайти через **Глобальний пошук** → ввести `rstp`.

> Якщо використовуєте цього системного користувача — все одно рекомендується перевірити, щоб рівень доступу залишався «Адміністратор», інакше запити не виконуватимуться.

---

## Підсумок: чек-ліст інтегратора

- [ ] Створити окремого «віртуального» адмін-співробітника для API
- [ ] Отримати його `login` і `password` (md5) одним із двох методів
- [ ] Документацію читати за адресою `https://<домен>/dog/`
- [ ] Усі запити — GET з параметрами в URL (⚠️ потребує перевірки: чи підтримується POST)
- [ ] Масиви передаються як `param[0][field]=value&param[1][field]=value`
- [ ] Кастомні поля товарів передаються як `custom_field_<id>=value`
- [ ] Пагінація великих списків — через `part=1`, `part=2`... (до 1000 записів на частину)
- [ ] Врахувати ліміт сесій: API займає одну сесію під час виконання запиту
