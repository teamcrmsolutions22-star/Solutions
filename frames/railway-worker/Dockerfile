FROM python:3.12-slim

# ffmpeg для нарезки кадров
RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app

# поллер frame_jobs (чистый stdlib, зависимостей нет)
CMD ["python3", "worker.py"]
