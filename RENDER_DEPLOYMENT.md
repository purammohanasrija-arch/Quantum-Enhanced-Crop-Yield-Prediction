# 🚀 Deploying Q-FARM TWIN to Render (Complete Guide)

This guide provides step-by-step instructions for deploying both the **React 19 Frontend** and **FastAPI Python IBM Qiskit Backend** to [Render](https://render.com).

---

## 🌟 Method 1: 1-Click Blueprint Deployment (Recommended)

Render Blueprints automatically parse [render.yaml](file:///c:/Users/Asus/OneDrive/Desktop/qiskit/render.yaml) and configure both the frontend static site and backend web service in one click.

### Steps:
1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Configure Render deployment"
   git push origin main
   ```
2. Log in to [dashboard.render.com](https://dashboard.render.com/).
3. Click **New +** in the top navigation bar and select **Blueprint**.
4. Connect your GitHub repository.
5. Render will automatically detect `render.yaml` and create:
   - **`q-farm-twin-backend`**: Python FastAPI Web Service (Free Tier)
   - **`q-farm-twin-frontend`**: React 19 Static Site (Free Tier with global CDN)
6. Click **Apply**.
7. Both services will build and deploy automatically! The frontend's `VITE_API_BASE_URL` will be automatically wired to your backend URL.

---

## 🛠️ Method 2: Manual Setup via Render Dashboard

If you prefer setting up the services manually without Blueprints:

### Step A: Deploy the Backend (Web Service)
1. In Render Dashboard, click **New +** ➔ **Web Service**.
2. Connect your GitHub repository.
3. Configure the following settings:
   - **Name**: `q-farm-backend`
   - **Region**: Choose closest to you (e.g., Oregon or Frankfurt)
   - **Language / Runtime**: `Python`
   - **Branch**: `main`
   - **Build Command**: `pip install --upgrade pip && pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`
4. Under **Environment Variables**, add:
   - `PYTHON_VERSION`: `3.11.9`
   - `CORS_ORIGINS`: `*`
   - `QUANTUM_EXECUTION_MODE`: `simulator`
   - `QISKIT_SIMULATOR_BACKEND`: `aer_simulator`
   - `QUANTUM_CIRCUIT_QUBITS`: `3`
   - *(Optional)* `QISKIT_IBM_TOKEN`: Your IBM Quantum Platform Token (if using real QPUs)
5. Click **Create Web Service**.
6. Note down the public URL Render gives your backend (e.g. `https://q-farm-backend.onrender.com`).

---

### Step B: Deploy the Frontend (Static Site)
1. In Render Dashboard, click **New +** ➔ **Static Site**.
2. Connect the same GitHub repository.
3. Configure:
   - **Name**: `q-farm-frontend`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Environment Variables**, add:
   - `NODE_VERSION`: `20.12.0`
   - `VITE_API_BASE_URL`: Paste your backend URL from Step A (e.g. `https://q-farm-backend.onrender.com`)
   - `VITE_ENABLE_MOCK_FALLBACK`: `true`
5. Under **Redirects/Rewrites**:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
   *(This ensures client-side routing like `#quantum-lab` works without 404 errors)*
6. Click **Create Static Site**.

---

## 🐳 Method 3: Single Unified Container (Docker)

If you prefer running everything inside a single container on Render:
1. In Render Dashboard, click **New +** ➔ **Web Service**.
2. Select **Docker** as the environment.
3. Render will automatically detect [Dockerfile](file:///c:/Users/Asus/OneDrive/Desktop/qiskit/Dockerfile).
4. The Dockerfile compiles the Vite frontend, places it in `dist/`, and starts FastAPI to serve both `/api` endpoints and the interactive React UI from one URL!

---

## ⚡ Verifying Your Live Deployment

Once deployed, verify:
- **Frontend App**: `https://<your-frontend>.onrender.com/`
- **Quantum Lab Direct Link**: `https://<your-frontend>.onrender.com/#quantum-lab`
- **Backend API Health Check**: `https://<your-backend>.onrender.com/api/health`
- **Interactive Swagger Docs**: `https://<your-backend>.onrender.com/docs`
