from pydantic import BaseModel
from typing import Optional


class ServioGuest(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None


class ServioReservation(BaseModel):
    id: str
    status: Optional[str] = None
    guest: Optional[ServioGuest] = None
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    room: Optional[str] = None
    total: Optional[float] = None


class ServioWebhookPayload(BaseModel):
    event: str
    reservation: ServioReservation
