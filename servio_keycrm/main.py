import logging
from fastapi import FastAPI, HTTPException, Query, status
from .models import ServioWebhookPayload
from .config import settings
from . import keycrm

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger(__name__)

app = FastAPI(title="Servio → KeyCRM Integration")


@app.post("/webhook/servio", status_code=status.HTTP_200_OK)
async def receive_servio_webhook(
    payload: ServioWebhookPayload,
    secret: str = Query(...),
):
    if secret != settings.webhook_secret:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    booking_id = payload.reservation.id
    guest = payload.reservation.guest

    log.info("Отримано подію '%s' для booking_id=%s", payload.event, booking_id)

    card_id = await keycrm.find_card_by_booking_id(booking_id)

    if card_id:
        await keycrm.update_card_status(card_id)
    else:
        await keycrm.create_card(
            booking_id=booking_id,
            guest_name=guest.name if guest else None,
            guest_phone=guest.phone if guest else None,
            guest_email=guest.email if guest else None,
        )

    return {"status": "ok", "booking_id": booking_id}


@app.get("/health")
async def health():
    return {"status": "ok"}
