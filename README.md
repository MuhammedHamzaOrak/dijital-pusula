# Dijital Pusula

Dijital alışkanlıklarda kullanıcının niyeti ile gerçekleşen davranışı karşılaştıran farkındalık uygulaması.

## Proje yapısı

- `frontend/`: Vinext ve React ile hazırlanan kullanıcı arayüzü
- `feature/frontend`: Güncel frontend geliştirme dalı

## Frontend'i çalıştırma

```bash
cd frontend
npm install
npm run dev
```

Yerel adres: `http://localhost:3000`

## AI analiz endpoint sözleşmesi

Frontend, analiz servisine `POST` isteği gönderir. Endpoint adresi frontend içindeki `.env` dosyasına eklenir:

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

- Eksik veya geçersiz alanlar için `400`
- AI servisine ulaşılamadığında `502` veya `503`
- Başarılı yanıtta `200` ve `Content-Type: application/json`
- Backend farklı bir adreste çalışıyorsa frontend adresine CORS izni verilmelidir
