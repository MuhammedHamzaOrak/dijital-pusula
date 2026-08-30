# Dijital Pusula - Backend

Bu klasör, frontend'den gelen kullanım kaydını Gemini 2.5 Flash ile analiz edip üç kartlık JSON yanıtı döndüren FastAPI servisini içerir. Desteklenen güncel `google-genai` Python paketi kullanılır.

## Kurulum

1. Backend klasöründe sanal ortam oluşturun:

   ```bash
   python -m venv .venv
   ```

2. Sanal ortamı etkinleştirip paketleri kurun:

   ```bash
   .venv\Scripts\python -m pip install -r requirements.txt
   ```

3. `.env.example` dosyasını `.env` adıyla kopyalayın ve Gemini anahtarınızı yalnızca yerel dosyaya ekleyin:

   ```env
   GEMINI_API_KEY=gemini_anahtariniz
   GEMINI_MODEL=gemini-2.5-flash
   GEMINI_FALLBACK_MODEL=gemini-2.5-flash-lite
   FRONTEND_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

4. Sunucuyu backend klasöründe başlatın:

   ```bash
   .venv\Scripts\python -m uvicorn main:app --reload
   ```

## Adresler

- Sağlık kontrolü: `GET http://127.0.0.1:8000/health`
- Analiz: `POST http://127.0.0.1:8000/api/analyze`
- API belgesi: `http://127.0.0.1:8000/docs`

Gerçek kullanıcı kayıtları `kayitlar.local.json` dosyasına yazılır ve GitHub'a gönderilmez. `kayitlar.json` yalnızca kurgusal örnek veridir.
