# KeepinCRM — Webhook (Вебхуки)

> Документація: https://keepincrm.com/category/webhook  
> Основна стаття: https://keepincrm.com/main-webhook  
> Вихідний webhook угод: https://keepincrm.com/send-from-deals  
> Зміна залишків товарів: https://keepincrm.com/sending-products-movements

---

## Типи Webhook

| Тип | Напрямок | Призначення |
|-----|----------|-------------|
| **Вхідний** (Inbound) | Зовнішній сервіс → KeepinCRM | Отримання даних і створення лідів/угод |
| **Вихідний** (Outbound) | KeepinCRM → Зовнішній сервіс | Відправлення подій при змінах в системі |

---

## Де налаштовується

**Налаштування → Інтеграції → Webhook**

---

## Вхідний Webhook (Inbound)

### Призначення
Отримати дані від будь-якого зовнішнього сервісу і автоматично створити ліда, клієнта або угоду в KeepinCRM.

### Підтримувані інтеграції через Webhook
- WordPress (Contact Form 7)
- WordPress (WooCommerce)
- Facebook Leads
- Weblium форми
- Viber через TurboSMS
- Синхронізація залишків товарів
- WIX форми
- SMS через AlphaSMS
- Google Forms
- Будь-який сервіс що вміє відправляти HTTP запити

### Налаштування вхідного Webhook

1. Перейти в **Налаштування → Інтеграції → Webhook**
2. Натиснути "+" — створити новий вхідний webhook
3. Отримати унікальний URL для вхідного webhook
4. Налаштувати **маппінг полів** (відповідність полів зовнішнього сервісу до полів KeepinCRM)

### Структура маппінгу

```
Ліва частина: змінна від зовнішнього сервісу (JSONPath)
Права частина: поле в KeepinCRM
```

Приклад: якщо сервіс надсилає:
```json
{
  "type": "order",
  "material_sku": "ART-001",
  "amount": 2,
  "cost": 500,
  "comment": "Коментар замовника",
  "customer": {
    "name": "Іван",
    "phone": "+380501234567"
  }
}
```

То в маппінгу вказати:
```
customer.name → name (ім'я контрагента)
customer.phone → phone (телефон)
material_sku → product.sku (артикул товару)
amount → product.amount (кількість)
cost → product.price (ціна)
comment → comment (коментар)
```

### Визначення JSONPath змінних

Для визначення шляхів (JSONPath) з запиту зовнішнього сервісу:
1. Використати сервіс: https://www.site24x7.com/tools/jsonpath-finder-validator.html
2. Вставити тіло запиту що надходить
3. Знайти потрібну змінну та скопіювати її шлях

### Готові шаблони

В KeepinCRM є готові шаблони для популярних сервісів:
- Facebook Lead Ads
- WordPress Contact Form 7
- WooCommerce

---

## Вихідний Webhook (Outbound)

### Призначення
При будь-якій події в KeepinCRM (зміна статусу, оновлення поля) автоматично відправити дані на зовнішній URL.

### Де налаштовується
- Через **Тригери**: Налаштування → Автоматизація → Тригери → Дія "Вихідний webhook"
- Або через розділ: Налаштування → Integrations → Outbound Webhook

### Документація по вихідному webhook для угод
https://keepincrm.com/send-from-deals

Дозволяє відправляти дані угоди при:
- Зміні статусу/етапу
- Оновленні будь-якого поля
- Створенні/видаленні угоди

### Документація: відправлення залишків товарів
https://keepincrm.com/sending-products-movements

Вихідний webhook при зміні залишків товарів на складі.

---

## WordPress + WooCommerce інтеграція через Webhook

Документація: https://keepincrm.com/wordpress-woocommerce

### Налаштування
1. Встановити плагін або використати WooCommerce webhooks
2. Вказати URL вхідного webhook KeepinCRM
3. Налаштувати події (нове замовлення, зміна статусу)
4. Налаштувати маппінг полів

---

## Ringostat інтеграція (телефонія)

Документація: https://help.ringostat.com/uk/articles/6456638

Ringostat → KeepinCRM через webhook:
- При вхідному дзвінку — пошук клієнта, відображення картки
- При пропущеному — створення завдання
- Запис дзвінків прикріплюється до картки клієнта

---

## Google Analytics 4 → KeepinCRM

Документація: https://leadbox.crunch.help/uk/intieghratsiia-z-analitichnimi-sistiemami/pieriedacha-danikh-z-keepin-crm-v-google-analytics-4

Передача конверсій з KeepinCRM в GA4 через вихідний webhook для відстеження ефективності реклами.

---

## Приклад налаштування Webhook (Facebook Lead Ads → KeepinCRM)

### Крок 1: Налаштувати вхідний webhook
1. Налаштування → Інтеграції → Webhook → "+"
2. Тип: Вхідний
3. Джерело: Facebook Lead Ads
4. Скопіювати URL

### Крок 2: Налаштувати в Facebook
1. Facebook → Events Manager → Data Sources
2. Додати webhook з URL від KeepinCRM
3. Підписатися на подію: leadgen

### Крок 3: Маппінг полів
```
full_name → name
phone_number → phone
email → email
```

### Результат
При заповненні Facebook Lead форми → автоматично створюється лід в KeepinCRM
