import httpx
import logging
from typing import Optional
from .config import settings

log = logging.getLogger(__name__)

HEADERS = {
    "Authorization": f"Bearer {settings.keycrm_api_key}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}


async def find_card_by_booking_id(booking_id: str) -> Optional[int]:
    """Шукає картку у воронці за Servio booking ID у кастомному полі."""
    url = f"{settings.keycrm_base_url}/pipelines/cards"
    params = {
        "filter[pipeline_id]": settings.keycrm_pipeline_id,
        "filter[custom_fields][field_key]": settings.keycrm_booking_id_field,
        "filter[custom_fields][value]": booking_id,
        "limit": 1,
    }
    async with httpx.AsyncClient(timeout=15) as client:
        r = await client.get(url, headers=HEADERS, params=params)
        r.raise_for_status()
        data = r.json().get("data", [])
        if data:
            card_id = data[0]["id"]
            log.info("Знайдено картку KeyCRM id=%s для booking_id=%s", card_id, booking_id)
            return card_id
    return None


async def create_card(
    booking_id: str,
    guest_name: Optional[str],
    guest_phone: Optional[str],
    guest_email: Optional[str],
) -> int:
    """Створює нову картку у воронці KeyCRM."""
    url = f"{settings.keycrm_base_url}/pipelines/cards"
    contact = {"full_name": guest_name or "Гість"}
    if guest_phone:
        contact["phone"] = guest_phone
    if guest_email:
        contact["email"] = guest_email

    payload = {
        "pipeline_id": settings.keycrm_pipeline_id,
        "status_id": settings.keycrm_booked_status_id,
        "title": f"Бронювання Servio #{booking_id}",
        "contact": contact,
        "custom_fields": [
            {"field_key": settings.keycrm_booking_id_field, "value": booking_id},
        ],
    }
    async with httpx.AsyncClient(timeout=15) as client:
        r = await client.post(url, headers=HEADERS, json=payload)
        r.raise_for_status()
        card_id = r.json()["id"]
        log.info("Створено нову картку KeyCRM id=%s для booking_id=%s", card_id, booking_id)
        return card_id


async def update_card_status(card_id: int) -> None:
    """Змінює статус існуючої картки на keycrm_booked_status_id."""
    url = f"{settings.keycrm_base_url}/pipelines/cards/{card_id}"
    payload = {"status_id": settings.keycrm_booked_status_id}
    async with httpx.AsyncClient(timeout=15) as client:
        r = await client.put(url, headers=HEADERS, json=payload)
        r.raise_for_status()
        log.info(
            "Статус картки id=%s оновлено на status_id=%s",
            card_id,
            settings.keycrm_booked_status_id,
        )
