FROM python:3.11-slim

WORKDIR /app
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    libpq-dev && \
    rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get remove -y gcc python3-dev && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
COPY . .
ENV PYTHONPATH=/app/src
ENV PYTHONUNBUFFERED=1
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--timeout-keep-alive", "60"]