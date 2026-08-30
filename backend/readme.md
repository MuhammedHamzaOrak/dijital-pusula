# Dijital Pusula - Backend

Bu klasör, Gemini API ile haberleşen analiz servisini içerir.

## Çalıştırma Adımları

1. Gerekli kütüphaneleri kurun:
`python -m pip install fastapi uvicorn google-generativeai pydantic python-dotenv`

2. `backend` klasörü içinde `.env` adında bir dosya oluşturun ve içine API anahtarınızı ekleyin:
`GEMINI_API_KEY=sizin_api_anahtariniz_buraya`

3. Sunucuyu başlatın (backend klasörü içindeyken):
`python -m uvicorn main:app --reload`

Servis `http://localhost:8000/api/analyze` adresinde çalışacaktır. Tüm CORS izinleri açıktır.