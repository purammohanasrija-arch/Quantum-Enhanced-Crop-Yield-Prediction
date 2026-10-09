# Q-FARM TWIN Backend: Python, FastAPI & Qiskit ML

This directory provides the backend architecture for **Q-FARM TWIN: Quantum-Enhanced Crop Yield Prediction & Intelligent Farm Decision Support**.

---

## 🌟 Technology Stack

- **Framework**: FastAPI (Asynchronous Python REST API)
- **Scientific Computing**: NumPy, Pandas, Scikit-learn
- **Quantum Computing**: IBM Qiskit & Qiskit Machine Learning
- **Server**: Uvicorn ASGI Server

---

## ⚡ Quickstart

### 1. Create a Python Virtual Environment
```bash
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Launch the FastAPI Development Server
```bash
uvicorn main:app --reload --port 8000
```

The interactive Swagger API documentation will be available at:
`http://localhost:8000/docs`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend and Qiskit engine status check |
| `POST` | `/api/dataset/upload` | Upload & ingest CSV/Excel farm datasets |
| `POST` | `/api/dataset/analyze` | Perform statistical distribution & correlation analysis |
| `POST` | `/api/predict` | Predict crop yield via agronomic ML model |
| `POST` | `/api/simulate` | Execute real-time What-If climate simulations |
| `POST` | `/api/quantum/predict` | Execute Qiskit Variational Quantum Regressor (VQR) |
| `GET` | `/api/weather` | Fetch agro-meteorological station telemetry |
| `GET` | `/api/analytics` | Retrieve historical yield and factor correlations |
| `GET` | `/api/recommendations` | Prescriptive field decision support |

---

## ⚛️ Quantum Variational Architecture

The QML pipeline uses a `ZZFeatureMap` to encode 4 normalized agricultural variables:
1. $x_0$: Rainfall volume index
2. $x_1$: Diurnal temperature variation
3. $x_2$: Root zone dielectric soil moisture
4. $x_3$: Available nitrate nitrogen (N)

The encoded state $|\psi(x)\rangle$ is passed into a parameterized `TwoLocal` ansatz ($RY$, $RZ$, $CX$ entanglement) and trained using the COBYLA optimizer via the Qiskit Aer primitive estimator.
