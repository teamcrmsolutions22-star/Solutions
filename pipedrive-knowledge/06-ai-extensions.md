# Pipedrive — AI та Custom Extensions (розробка)

> Актуально: 2025. Нові AI-функції додано у Growth+ та Premium+.

## Вбудовані AI-функції (повний список 2025)

| Функція | Тариф | Опис |
|---------|-------|------|
| **AI Sales Assistant** | All | Пріоритизація угод, next-best-action, Win Probability score; 60%+ клієнтів використовують |
| **Win Probability** | All | % ймовірності закриття угоди, оновлюється динамічно |
| **Pulse Feed** | All | AI-пріоритизований workspace: follow-up + прострочені + нові можливості |
| **AI Email Writer** | Growth+ | Генерує outreach-лист з контексту угоди + короткого prompt (~44 сек замість 9 хв) |
| **AI Email Summarizer** | Growth+ | Стисло переказує email-ланцюжок + оцінка тональності (sentiment) |
| **AI Suggested Replies** | Growth+ | Варіанти відповіді, адаптовані до стилю спілкування |
| **AI Smart App Recommendations** | All | Рекомендує додатки з Marketplace |
| **AI Marketplace Search** | All | Пошук інтеграцій через натуральну мову |
| **AI Report Generation** | Premium+ | Звіти через натуральну мову (березень 2025) |
| **Data Enrichment (Pulse)** | Premium+ | Авто-заповнення профілів з зовнішніх джерел (Surfe-powered); 100 кредитів/міс (Premium), 500 (Ultimate) |
| **Custom Lead Scoring (Pulse)** | Growth+ | Кастомні правила скорингу лідів та угод |
| **AI Project Health Summaries** | Premium+ | Beta: AI-підсумок стану проекту |

> Smart Contact Data (попередня версія збагачення) — видалено 22 серпня 2025, замінено на Data Enrichment.

**Статистика:** команди, що використовують AI Sales Assistant, закривають у 3× більше угод.

## Custom UI Extensions (iframe-розширення)

Розробники можуть вбудувати власний веб-інтерфейс у Pipedrive через **iframe**.

### Формати розширень

| Тип | Розміщення | Призначення |
|-----|-----------|-------------|
| **Custom panels** | Бічна панель у детальному view угоди/контакту/компанії | Додаткова інформація з ERP, інших систем |
| **Custom floating window** | Плаваюче вікно (вільно переміщується) | VoIP-телефонія, чати; залишається при навігації |
| **Custom modals** | Велике модальне вікно | Складні форми, action-сторінки |
| **Custom UI for app settings** | Панель налаштувань додатку | Конфігурація підключення |

**Обмеження:** максимум 1 Custom Panel на детальне відображення для одного додатка.

### App Extensions SDK

Обов'язкова бібліотека для взаємодії між Pipedrive і iframe:

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

GitHub: github.com/pipedrive/app-extensions-sdk

### Custom UI Actions

- Передача контексту (Deal ID, User ID) у зовнішній URL при кліку на кастомні кнопки

## Marketplace та Developer Hub

- **300+ нативних** інтеграцій у Marketplace
- Для публікації у Marketplace — аудит безпеки + OAuth 2.0
- **Developer Sandbox** — безкоштовні тестові акаунти для розробників
- Developer Hub: управління OAuth Client ID / Client Secret, тестування інтеграцій

**Джерела:** pipedrive.com/en/features/ai-sales-assistant | pipedrive.readme.io/docs/app-extensions | github.com/pipedrive/app-extensions-sdk | support.pipedrive.com/en/article/pulse | support.pipedrive.com/en/article/data-enrichment
