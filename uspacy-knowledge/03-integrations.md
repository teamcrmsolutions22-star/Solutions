# Uspacy — Інтеграції

> Оновлено: 2026-06-04 (Deep Research via WebSearch)

---

## Нативні інтеграції (App Marketplace)

Встановлення через: Settings → Marketplace → Get

| Категорія | Партнери та сервіси | Тип |
|-----------|-------------------|-----|
| **Соцмережі та чати** | Viber (Standard & Business Bot), Telegram (Standard & Business Bot), WhatsApp, Facebook Messenger, Instagram, E-chat, Facebook Lead Forms | Native |
| **Телефонія / Cloud PBX** | Binotel, Phonet, UniTalk, Ringostat, CallsApp, StreamTelecom, Zadarma, IPTel, FMC Kyivstar, Asterisk, FreePBX, Generic PBX, JustCall | Native |
| **CMS / Конструктори сайтів** | Weblium, Horoshop, OpenCart, WordPress, Webflow, Wix, Shopify, Typeform, Magento | Native |
| **Локальні маркетплейси (UA)** | Prom, Kasta, Rozetka, Allo | Native |
| **Маркетинг / Email / SMS** | SendPulse, AlfaSMS, TurboSMS, Twilio, eSputnik (upcoming) | Native |
| **Бухгалтерія / ERP** | Finmap, Checkbox (ПРРО), Vchasno.Kasa, Finline | Native |
| **Банкінг / Платежі** | Monobank (автосинхронізація виписки), AssetPayments | Native |
| **Логістика / Документообіг** | Nova Poshta, Vchasno Documents | Native |
| **AI-асистенти** | Cal.AI, NEURON24 AI | Native |
| **No-code Middleware** | Make.com, Zapier, n8n | Via API |

**Джерело:** https://uspacy.ua/features/integrations/ · https://uspacy.eu/features/integrations/

---

## External Lines — деталі підключення

External Lines — функціонал, що дозволяє спілкуватися з клієнтами прямо в Uspacy, поки вони пишуть у сторонніх месенджерах.

| Канал | URL Knowledge Base | Метод автентифікації |
|-------|-------------------|---------------------|
| WhatsApp | ua.uspacy.support/en/articles/8310625 | API ключ |
| Telegram | ua.uspacy.support/en/articles/8332839 | Bot Token |
| Viber | ua.uspacy.support/en/articles/8332847 | Auth Token (Private Token) |
| Facebook Messenger | ua.uspacy.support/en/articles/9361372 | Facebook App |
| Instagram | ua.uspacy.support/en/articles/9361363 | Facebook App |

**Встановлення:** Marketplace → знайти застосунок → Get → підключити токен

---

## Zapier — Підтримувані тригери та дії

**Сторінка:** https://zapier.com/apps/uspacy/integrations

### Тригери (що запускає сценарій)
| Тригер | Опис |
|--------|------|
| Button Clicked | Клік по кнопці на веб-формі |
| User Created | Додано нового користувача до form project |
| Page Created | Створено нову сторінку у form project |
| Stripe Payment Processed | Обробка платежу через Stripe |

### Дії в Uspacy (що створюється/оновлюється)
| Дія | Опис |
|-----|------|
| Create Task | Нове завдання: назва, відповідальний, учасники, дедлайн |
| Create Entity Item | Новий запис у CRM-воронці (лід або угода) |
| Create Group | Нова робоча група: назва, правила, учасники |
| Update Smart Object Item | Оновлення кастомного бізнес-об'єкта |
| Find or Create User | Пошук за email → якщо немає — створення (антидублювання) |
| Remove User | Видалення користувача з form project |

**Джерело:** https://zapier.com/apps/zapier-forms/integrations/uspacy

---

## Middleware підключення (Make.com / Zapier / n8n)

**Коли:** коли немає нативної інтеграції.

### Автентифікація
1. В App Marketplace: отримати API-ключ
2. Вставити ключ у модуль конектора middleware

### Приклад: Facebook Lead Ads → Uspacy (через Make.com)
1. Тригер: нова заявка в Facebook Lead Ads
2. Дія: `Create a Lead` у Uspacy workspace

**Джерело:** https://uspacy.com/blog/magic-beyond-hogwarts-what-webhooks-are-and-how-they-automate-your-work-uspacy-without-programmers/

---

## Телефонія — деталі

- Дзвінки прямо з картки CRM (клік по номеру)
- IP-телефонія логує дзвінки автоматично
- Запис дзвінків зберігається в картці
- Підтримувані: Binotel, Phonet, UniTalk, Ringostat, CallsApp, StreamTelecom, Zadarma, IPTel, FMC Kyivstar, Asterisk, FreePBX, Generic PBX, JustCall

---

## Розробка застосунків для Marketplace

Сторонні розробники можуть створювати застосунки для Marketplace Uspacy, використовуючи External Lines API.

**Документація:** https://uspacy.eu/support/knowledgebase/app-development-for-a-marketplace-using-external-lines-en/

---

## Quick Replies (Швидкі відповіді)

- Доступно в External Lines чатах з 8 січня 2026
- Дозволяє менеджерам надсилати заздалегідь підготовлені відповіді

**Джерело:** ua.uspacy.support (January 8, 2026 update)
