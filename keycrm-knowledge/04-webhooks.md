# KeyCRM — Вебхуки

> Джерело: KeyCRM технічний довідник та API, 2025–2026

## Два типи вебхуків

### 1. Тригерні вебхуки
**Налаштування:** Налаштування → Додатково → Автоматизація → Додати тригер

**Події:**
- `order.change_order_status`
- `order.change_payment_status`
- `lead.change_lead_status`

⚠️ **Підпису HMAC немає** — захист тільки через секретний токен в URL: `?secret=TOKEN`

### 2. Складські вебхуки
**Налаштування:** Налаштування → Товари → Склад → Webhooks

**Payload:**
```json
[{
  "offer_id": 123,
  "sku": "PROD-001",
  "in_stock": 50,
  "in_reserve": 10
}]
```
Вільний залишок = `in_stock - in_reserve`

## Надійність
- Авторетрай при 5xx або відсутності відповіді
- При недоступності >24 год — доставка призупиняється
- Логу в UI **немає** → потрібне зовнішнє логування

## Рекомендований паттерн обробки
```python
# Повернути 200 негайно, обробку — в чергу
@app.post("/webhook/keycrm")
async def handle_webhook(payload: dict, background_tasks: BackgroundTasks):
    background_tasks.add_task(process_event, payload)
    return {"status": "ok"}
```
