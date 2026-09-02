# Digital Compass - Backend

This directory contains the FastAPI service that analyzes a usage record from the frontend with Gemini 2.5 Flash and returns a three-card JSON response. It uses the supported `google-genai` Python package.

## Setup

1. Create a virtual environment in the backend directory:

   ```bash
   python -m venv .venv
   ```

2. Activate the environment and install the dependencies:

   ```bash
   .venv\Scripts\python -m pip install -r requirements.txt
   ```

3. Copy `.env.example` as `.env` and add your Gemini key only to the local file:

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_MODEL=gemini-2.5-flash
   GEMINI_FALLBACK_MODEL=gemini-2.5-flash-lite
   FRONTEND_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

4. Start the server from the backend directory:

   ```bash
   .venv\Scripts\python -m uvicorn main:app --reload
   ```

## Endpoints

- Health check: `GET http://127.0.0.1:8000/health`
- Analysis: `POST http://127.0.0.1:8000/api/analyze`
- API documentation: `http://127.0.0.1:8000/docs`

Real user records are written to `kayitlar.local.json` and are not committed to GitHub. `kayitlar.json` contains fictional sample data only.
