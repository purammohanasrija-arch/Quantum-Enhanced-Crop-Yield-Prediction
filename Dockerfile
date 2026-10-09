# ==============================================================
# Q-FARM TWIN: Production Multi-Stage Dockerfile for Render
# Combines Node.js (Vite frontend build) + Python 3.11 (FastAPI backend)
# ==============================================================

# Stage 1: Build Vite React Frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Python Backend Runtime
FROM python:3.11-slim
WORKDIR /app

# Install system utilities needed by scientific packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend ./backend/
COPY .env.example ./.env

# Copy built frontend assets from Stage 1 into /app/dist
COPY --from=frontend-builder /app/dist ./dist

# Set production environment variables
ENV HOST=0.0.0.0
ENV PORT=10000
ENV BACKEND_RELOAD=false
ENV QUANTUM_EXECUTION_MODE=simulator

EXPOSE 10000

# Start Uvicorn serving both FastAPI REST endpoints and React UI from /dist
CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-10000}"]
