# Uspacy — Інтеграції

> Джерело: Gemini Deep Research, 2026-06-03

## Нативні інтеграції (App Marketplace)

| Категорія | Партнери та сервіси |
|-----------|-------------------|
| Соцмережі та чати | Viber (Standard & Business), Telegram (Standard & Business Bot), WhatsApp, Facebook Messenger, Instagram, E-chat, Facebook Lead Forms |
| Телефонія / Cloud PBX | Binotel, Phonet, UniTalk, Ringostat, CallsApp, StreamTelecom, Zadarma, IPTel, FMC Kyivstar, Asterisk, FreePBX, Generic PBX, JustCall |
| CMS / Конструктори сайтів | Weblium, Horoshop, OpenCart, WordPress, Webflow, Wix, Shopify, Typeform, Magento |
| Локальні маркетплейси (UA) | Prom, Kasta, Rozetka, Allo |
| Маркетинг / Email | SendPulse, AlfaSMS, TurboSMS, Twilio, eSputnik (upcoming) |
| Бухгалтерія / ERP | Finmap, Checkbox (ПРРО), Vchasno.Kasa, Finline |
| Банкінг / Платежі | Monobank (автосинхронізація виписки), AssetPayments |
| Логістика | Nova Poshta, Vchasno Documents |
| AI-асистенти | Cal.AI, NEURON24 AI |

---

## Middleware (No-Code) підключення

Якщо нативної інтеграції немає — використовуй Make.com, Zapier або n8n.

### Автентифікація middleware
1. В App Marketplace отримати API-ключ
2. Вставити ключ у модуль конектора middleware

### Приклад: Facebook Lead Ads → Uspacy (через Zapier/Make)
1. Тригер: нова заявка в Facebook Lead Ads
2. Дія: `Create a Lead` у Uspacy

---

## Zapier Forms — Підтримувані тригери та дії

### Тригери (що запускає сценарій)
| Тригер | Опис |
|--------|------|
| Button Clicked | Клік по кнопці на опублікованій веб-формі |
| User Created | Додано нового користувача до form project |
| Page Created | Створено нову сторінку у form project |
| Stripe Payment Processed | Обробка платежу через Stripe |

### Дії (що відбувається в Uspacy)
| Дія | Опис |
|-----|------|
| Create Task | Нове завдання: назва, відповідальний, учасники, дедлайн |
| Create Entity Item | Новий запис у CRM-воронці (лід або угода) |
| Create Group | Нова робоча група: назва, правила модерації, учасники |
| Update Smart Object Item | Оновлення кастомного бізнес-об'єкта |
| Find or Create User | Пошук за email, якщо немає — створення (антидублювання) |
| Remove User | Видалення користувача з form project |

---

## Джерела
- https://uspacy.ua/features/integrations/
- https://uspacy.com/features/integrations/
- https://zapier.com/apps/uspacy/integrations
- https://zapier.com/apps/zapier-forms/integrations/uspacy
- https://uspacy.com/blog/magic-beyond-hogwarts-what-webhooks-are-and-how-they-automate-your-work-uspacy-without-programmers/
