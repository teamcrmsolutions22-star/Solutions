# KeepinCRM — API Документація

> Офіційна документація: https://keepincrm.com/category/api  
> API ключ: https://keepincrm.com/api-key  
> PHP приклади: https://keepincrm.com/php-example  
> Кастомні фільтри API: https://keepincrm.com/api-custom-filters

---

## Базова інформація

| Параметр | Значення |
|----------|----------|
| Base URL | `https://api.keepincrm.com/v1/` |
| Формат | JSON |
| Автентифікація | Header `X-Auth-Token` |
| Документація | Swagger (доступна в системі) |

---

## Отримання API ключа

1. Зайти в **Налаштування → Профіль компанії → API**
2. API ключ доступний тільки власнику акаунту (хто реєстрував)
3. В цьому ж розділі відображаються останні API запити

---

## Автентифікація

```http
X-Auth-Token: ВАШ_API_КЛЮЧ
Content-Type: application/json
```

---

## Основні ендпоінти

### Угоди (Agreements)

#### Створення угоди
```
POST https://api.keepincrm.com/v1/agreements
```

Тіло запиту:
```json
{
  "title": "Назва угоди",
  "stage_id": 1,
  "source_id": 1,
  "responsible_id": 2,
  "client": {
    "name": "Іван Іванов",
    "email": "ivan@example.com",
    "phone": "+380501234567",
    "lead": true
  },
  "products": [
    {
      "sku": "ARTICLE-001",
      "title": "Назва товару",
      "price": 500.00,
      "amount": 2,
      "currency": "UAH"
    }
  ],
  "comment": "Коментар до угоди"
}
```

#### Отримання списку угод
```
GET https://api.keepincrm.com/v1/agreements
```

#### Отримання конкретної угоди
```
GET https://api.keepincrm.com/v1/agreements/{id}
```

#### Оновлення угоди
```
PUT https://api.keepincrm.com/v1/agreements/{id}
```

---

### Контрагенти (Counterparties)

#### Створення контрагента
```
POST https://api.keepincrm.com/v1/counterparties
```

Тіло запиту:
```json
{
  "name": "Ім'я клієнта",
  "phone": "+380501234567",
  "email": "client@example.com",
  "source_id": 1,
  "responsible_id": 1,
  "lead": true,
  "tags": ["тег1", "тег2"]
}
```

#### Отримання списку контрагентів
```
GET https://api.keepincrm.com/v1/counterparties
```

---

### Кастомні фільтри через API

Документація: https://keepincrm.com/api-custom-filters

Дозволяє передавати додаткові параметри фільтрації при запитах до API.

---

## PHP приклад створення угоди

```php
<?php
$apiKey = 'ВАШ_API_КЛЮЧ';
$apiUrl = 'https://api.keepincrm.com/v1/agreements';

$data = [
    'title' => 'Нове замовлення #' . time(),
    'stage_id' => 1,    // ID першого етапу воронки
    'source_id' => 2,   // ID джерела "Сайт"
    'client' => [
        'name' => 'Петро Петренко',
        'phone' => '+380671234567',
        'email' => 'petro@example.com',
        'lead' => true
    ],
    'products' => [
        [
            'sku' => 'SKU-001',
            'title' => 'Товар 1',
            'price' => 1200,
            'amount' => 1,
            'currency' => 'UAH'
        ]
    ],
    'comment' => 'Замовлення з сайту'
];

$ch = curl_init($apiUrl);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'X-Auth-Token: ' . $apiKey
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => false
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$result = json_decode($response, true);

if ($httpCode === 201) {
    echo "Угода створена! ID: " . $result['id'];
} else {
    echo "Помилка: " . $response;
}
```

---

## PHP приклад створення контрагента

```php
<?php
$apiKey = 'ВАШ_API_КЛЮЧ';
$apiUrl = 'https://api.keepincrm.com/v1/counterparties';

$data = [
    'name' => 'Марія Коваленко',
    'phone' => '+380951234567',
    'email' => 'maria@example.com',
    'source_id' => 1,
    'lead' => true
];

$ch = curl_init($apiUrl);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'X-Auth-Token: ' . $apiKey
    ],
    CURLOPT_RETURNTRANSFER => true
]);

$response = curl_exec($ch);
curl_close($ch);
echo $response;
```

---

## Вихідний Webhook для угод

Документація: https://keepincrm.com/send-from-deals

Можна налаштувати автоматичне відправлення даних при зміні угоди на зовнішній URL.

---

## Swagger документація

Повна Swagger-документація доступна безпосередньо в системі KeepinCRM після авторизації в розділі API.

Включає:
- Всі доступні ендпоінти
- Параметри запитів
- Формати відповідей
- Коди помилок

---

## Помилки API

| Код | Значення |
|-----|----------|
| 200 | Успішно |
| 201 | Створено |
| 400 | Невірний запит |
| 401 | Невірний API ключ |
| 404 | Не знайдено |
| 422 | Помилка валідації |
| 500 | Помилка сервера |
