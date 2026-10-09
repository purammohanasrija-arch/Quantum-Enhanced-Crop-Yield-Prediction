#!/usr/bin/env bash
# ==============================================================
# Q-FARM TWIN: Unified Build Script for Render
# Builds React frontend dist + installs Python Qiskit backend
# ==============================================================
set -o errexit

echo ">>> [1/3] Installing Node.js frontend dependencies..."
npm install

echo ">>> [2/3] Building production Vite React bundle..."
npm run build

echo ">>> [3/3] Installing Python dependencies..."
python -m pip install --upgrade pip
python -m pip install -r backend/requirements.txt

echo ">>> [SUCCESS] Build finished! FastAPI will serve both /api and UI from 'dist'."
