# Pipedrive — AI та Custom Extensions (розробка)

## Вбудовані AI-функції

| Функція | Тариф | Опис |
|---------|-------|------|
| **AI Sales Assistant** | All (Essential+) | Аналізує дії, пропонує наступні кроки, дає аналітичні підказки |
| **AI Lead / Deal Scoring** | Professional+ | ML-алгоритм оцінює ймовірність закриття на основі历史 даних |
| **AI Email Writing** | Professional+ | Генерація персоналізованих листів за параметрами |
| **Smart Contact/Org Enrichment** | Professional+ | Авто-заповнення профілів з публічних джерел (100 кредитів/міс на Pro, 500 на вищих) |
| **Deal rotting** | All | Візуальний індикатор угод без активності (rule-based, не AI) |

## Custom UI Extensions (iframe-розширення)

Розробники можуть вбудувати власний веб-інтерфейс у Pipedrive через **iframe**.

### Формати розширень

| Тип | Розміщення | Призначення |
|-----|-----------|-------------|
| **Custom panels** | Бічна панель у детальному view угоди/контакту/компанії | Додаткова інформація з ERP, інших систем |
| **Custom floating window** | Плаваюче вікно (вільно переміщується) | VoIP-телефонія, чати; залишається при навігації |
| **Custom modals** | Модальне вікно великого розміру | Складні форми, action-сторінки |
| **Custom UI for app settings** | Панель налаштувань додатку | Конфігурація підключення користувачем |

**Обмеження:** максимум 1 Custom Panel на детальне відображення для одного додатка.

### App Extensions SDK

Для взаємодії між Pipedrive і iframe — обов'язково використовувати `@pipedrive/app-extensions-sdk`:

```javascript
import AppExtensionsSDK from '@pipedrive/app-extensions-sdk';

(async () => {
  // Ініціалізація та отримання контексту (Deal ID, User ID тощо)
  const sdk = await new AppExtensionsSDK().initialize({ size: { height: 500 } });

  // Показати системне повідомлення
  await sdk.execute('showSnackbar', {
    message: 'Дані синхронізовано з ERP',
    state: 'success'
  });
})();
```

**Критично:** iframe має завантажитись за **< 10 секунд**, інакше система фіксує помилку.

### Custom UI Actions

- Додатки можуть передавати контекст (Deal ID, User ID) у зовнішній URL при кліку на кастомні кнопки

## Marketplace та Developer Hub

- Для публікації додатка у Marketplace — аудит безпеки + OAuth 2.0
- Тестування — на безкоштовних **Developer Sandbox** акаунтах
- Developer Hub: керування OAuth Client ID / Client Secret, тестування інтеграцій

## Невизначеності

- Нативна інтеграція з OpenAI — не задокументована ⚠️
- API-ендпоінти для отримання AI-скорингу програмно — не задокументовані ⚠️
