from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    keycrm_api_key: str
    keycrm_base_url: str = "https://openapi.keycrm.app/v1"

    # ID статусу у воронці, який встановлюється при бронюванні
    keycrm_booked_status_id: int

    # ID воронки (pipeline) в KeyCRM
    keycrm_pipeline_id: int

    # Ключ кастомного поля в KeyCRM для зберігання Servio booking ID
    keycrm_booking_id_field: str = "servio_booking_id"

    # Секретний токен для верифікації запитів від Servio
    webhook_secret: str

    class Config:
        env_file = ".env"


settings = Settings()
