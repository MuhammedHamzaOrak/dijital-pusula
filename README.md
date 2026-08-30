[Demo](https://github.com/user-attachments/assets/2ca34cb2-324e-40f1-991a-1a47e3cadc8d)
# Dijital Pusula

Dijital alışkanlıklarda kullanıcının niyeti ile gerçekleşen davranışı karşılaştıran farkındalık uygulaması.

## Proje yapısı

- `frontend/`: Vinext ve React ile hazırlanan kullanıcı arayüzü
- `backend/`: FastAPI ve Gemini ile çalışan analiz servisi

## Backend'i çalıştırma

```bash
cd backend
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
.venv\Scripts\python -m uvicorn main:app --reload
```

Önce `.env.example` dosyasını `.env` adıyla kopyalayın ve kendi `GEMINI_API_KEY` değerinizi ekleyin. Gerçek anahtarı Git'e göndermeyin.

## Frontend'i çalıştırma

```bash
cd frontend
npm install
npm run dev
```

Yerel adres: `http://localhost:3000`

Frontend klasöründeki `.env.example` dosyasını `.env.local` adıyla kopyalayın.

## AI analiz endpoint sözleşmesi

Frontend, analiz servisine `POST` isteği gönderir. Endpoint adresi frontend içindeki `.env.local` dosyasına eklenir:

```env
NEXT_PUBLIC_ANALYZE_API_URL=http://localhost:8000/api/analyze
```

AI servisinin API anahtarı frontend'e veya `NEXT_PUBLIC_` ile başlayan bir değişkene konulmamalıdır. Anahtar yalnızca backend tarafında gizli tutulmalıdır.

### İstek gövdesi

```json
{
  "intent": "okul",
  "plannedMinutes": 20,
  "previousActivity": "Ders çalışmaya hazırlanıyordum",
  "mood": "Stresli",
  "actualActivity": "Instagram'da gezindim",
  "actualMinutes": 60,
  "createdAt": "2026-08-30T10:00:00.000Z"
}
```

### Başarılı cevap

```json
{
  "yansitma": "Kullanıcıyı yargılamayan kısa yansıtma metni",
  "tetikleyici_analizi": "Olası tetikleyiciye ilişkin teşhis koymayan açıklama",
  "mini_deney": "Küçük ve uygulanabilir davranış deneyi"
}
```

Frontend geçiş sürecinde aşağıdaki metin içine alınmış cevabı da okuyabilir; ancak backend'in doğrudan üstteki temiz JSON'u döndürmesi tercih edilir:

```json
{
  "response": "{\"yansitma\":\"...\",\"tetikleyici_analizi\":\"...\",\"mini_deney\":\"...\"}"
}
```

### Hata davranışı

- Eksik veya geçersiz alanlar için `422`
- AI servisine ulaşılamadığında `502` veya `503`
- Başarılı yanıtta `200` ve `Content-Type: application/json`
- Backend farklı bir adreste çalışıyorsa frontend adresine CORS izni verilmelidir

---

# English Version

# Digital Compass

An awareness application that compares a user's intention with their actual behavior in digital habits.

## Project Structure

- `frontend/`: User interface built with Vinext and React
- `backend/`: Analysis service powered by FastAPI and Gemini

## Running the Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
.venv\Scripts\python -m uvicorn main:app --reload
```

Copy `.env.example` as `.env` and add your own `GEMINI_API_KEY`. Never commit the real key to Git.

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Local address: `http://localhost:3000`

Copy `.env.example` in the frontend directory as `.env.local`.

## AI Analysis Endpoint Contract

The frontend sends a `POST` request to the analysis service. Add the endpoint address to `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_ANALYZE_API_URL=http://localhost:8000/api/analyze
```

The AI service API key must not be placed in the frontend or in a variable beginning with `NEXT_PUBLIC_`. It must remain private on the backend.

### Request Body

```json
{
  "intent": "okul",
  "plannedMinutes": 20,
  "previousActivity": "I was preparing to study",
  "mood": "Stressed",
  "actualActivity": "I browsed Instagram",
  "actualMinutes": 60,
  "createdAt": "2026-08-30T10:00:00.000Z"
}
```

### Successful Response

```json
{
  "yansitma": "A brief, non-judgmental reflection",
  "tetikleyici_analizi": "A non-diagnostic explanation of a possible trigger",
  "mini_deney": "A small and practical behavioral experiment"
}
```

During the integration transition, the frontend can also read the wrapped response below. However, the backend should preferably return the clean JSON object shown above:

```json
{
  "response": "{\"yansitma\":\"...\",\"tetikleyici_analizi\":\"...\",\"mini_deney\":\"...\"}"
}
```

### Error Behavior

- `422` for missing or invalid fields
- `502` or `503` when the AI service is unavailable
- `200` with `Content-Type: application/json` for successful responses
- If the backend runs at a different address, the frontend origin must be allowed through CORS
