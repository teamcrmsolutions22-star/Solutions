FROM python:3.12-slim

# ffmpeg — нарезка кадров + извлечение аудио-дорожки
RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# yt-dlp — универсальный резолвер медиа (YouTube/Vidyard/Loom/прямые .mp4)
RUN pip install --no-cache-dir -U yt-dlp

WORKDIR /app
COPY . /app

# поллер frame_jobs + audio_jobs (Python stdlib; внешний бинарь — yt-dlp)
CMD ["python3", "worker.py"]
