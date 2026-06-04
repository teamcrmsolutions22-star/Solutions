# Odoo — Архітектура та розширення моделей

## БЛОК 3: АРХІТЕКТУРА

### 3.1 Технічний стек

```
Frontend:  OWL (Odoo Web Library, JS/CSS) — реактивний фреймворк
Backend:   Python + Werkzeug WSGI
ORM:       → PostgreSQL 12+
Кеш:       Memory Cache (рівень транзакції/сесії)
Черга:     ir.cron + OCA queue_job (для async/heavy ops)
```

### 3.2 Типи моделей ORM

| Тип | Опис |
|---|---|
| `models.Model` | Персистентна; таблиця в БД |
| `models.TransientModel` | Тимчасова (візарди); автоочищення |
| `models.AbstractModel` | Абстрактна (міксини); без таблиці |

### 3.3 Поля ORM

**Базові:** Char, Text, Html, Integer, Float, Monetary, Boolean, Date, Datetime, Binary, Selection, Reference

**Реляційні:** Many2one, One2many, Many2many

**Computed fields:**
- `compute='_method'` + `@api.depends('field_a', 'field_b')`
- `store=False` (за замовчуванням) — обчислюється в RAM під час запиту
- `store=True` — записується в БД, перераховується при зміні залежностей
- ⚠️ `sudo()` у `store=True` computed → витік конфіденційних даних

**Related fields:** `partner_phone = fields.Char(related='partner_id.phone', store=True)`
⚠️ Не можна будувати ланцюжки залежностей через Many2many та One2many.

**Constraints:**
- SQL: `_sql_constraints = [('name_uniq', 'unique(name)', 'Msg')]`
- Python: `@api.constrains('field')` → `ValidationError`
- ⚠️ `@api.constrains` не підтримує dotted-names; спрацьовує тільки якщо поле є в create/write

### 3.4 Наслідування

| Механізм | Опис | Коли використовувати |
|---|---|---|
| `_inherit = 'model'` | Розширює існуючу таблицю in-place | Основний спосіб розширення |
| `_inherits = {'parent': 'id'}` | Делегація (дві таблиці, One2one) | Рідко; офіційна дока попереджає про ризики — **уникати в ланцюжках** |

### 3.5 Структура кастомного модуля

```
my_module/
├── __init__.py
├── __manifest__.py        # name, version, depends, data, assets, license
├── models/                # Python ORM класи
├── views/                 # XML шаблони інтерфейсу
├── data/                  # XML/CSV ініціалізаційні дані
├── security/              # ir.model.access.csv + record rules
├── controllers/           # HTTP маршрути (Werkzeug)
└── static/                # JS/CSS/OWL ресурси
```

**Формат версії в маніфесті:** `'18.0.1.0.0'`

### 3.6 Ключові декоратори ORM

| Декоратор | Призначення |
|---|---|
| `@api.model` | Метод класу, без конкретного recordset |
| `@api.depends('fields')` | Залежності computed поля |
| `@api.onchange('field')` | Клієнтський тригер (без збереження в БД) |
| `@api.constrains('fields')` | Валідація при збереженні |
| `@api.model_create_multi` | Override create для пакетного створення |

---

---

## БЛОК 7: РОЗШИРЕННЯ МОДЕЛЕЙ (ПРИКЛАДИ)

```python
from odoo import models, fields, api

class CrmLead(models.Model):
    _inherit = 'crm.lead'

    x_additional_info = fields.Text(string='Additional Info')

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if not vals.get('x_additional_info'):
                vals['x_additional_info'] = 'Auto-filled.'
        return super().create(vals_list)
```

**XPath розширення view:**
```xml
<odoo>
  <record id="view_crm_lead_form_inherit" model="ir.ui.view">
    <field name="inherit_id" ref="crm.crm_case_form_view_leads"/>
    <field name="arch" type="xml">
      <xpath expr="//field[@name='email_from']" position="after">
        <field name="x_additional_info"/>
      </xpath>
    </field>
  </record>
</odoo>
```

---
