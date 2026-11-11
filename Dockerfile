FROM node:20-bookworm-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
COPY static/ /app/static/
RUN npm run build

FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1 \
    PORT=10000 \
    SABI_DATA_DIR=/tmp/sabi-runtime

RUN apt-get update \
    && apt-get install -y --no-install-recommends libreoffice-calc fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
COPY --from=frontend-build /app/static/react/ ./static/react/

EXPOSE 10000
CMD ["sh", "-c", "uvicorn sabi_server:app --host 0.0.0.0 --port ${PORT:-10000}"]
