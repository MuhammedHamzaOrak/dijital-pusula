# Dijital Pusula — MVP Kapsamı

## MVP Amacı

Kullanıcının telefon kullanım niyeti ile gerçekleşen davranışı arasındaki farkı kısa bir kayıt akışıyla görünür kılmak ve bu fark için empatik, uygulanabilir bir AI içgörüsü sunmak.

## MVP’de Yer Alan Özellikler

- Ana sayfa, yeni kayıt ve içgörüler ekranları
- İlk kullanım için boş durumlar
- Niyet ve gerçekleşen kullanım bilgilerinin form üzerinden alınması
- Planlanan ve gerçek sürenin karşılaştırılması
- Son kayıt özeti ve niyete sadakat oranı
- FastAPI üzerinden Gemini analizi
- Ana model kullanılamadığında yedek modele geçiş
- Üç kartlık yapılandırılmış AI sonucu
- Yükleme, servis yoğunluğu, genel hata ve yeniden deneme durumları
- Son kayıt ve analizin tarayıcı oturumunda saklanması
- Başarılı analizlerin backend'de yerel ve Git dışı dosyaya yazılması

## Temel Akış

1. Kullanıcı **Yeni Kayıt** ekranını açar.
2. Niyet, süre, önceki aktivite, ruh hâli ve gerçekleşen kullanım bilgilerini girer.
3. **Analiz Et** seçeneğine basar.
4. Frontend kaydı oturumda saklar ve `POST /api/analyze` isteği gönderir.
5. Backend girdiyi doğrular ve Gemini'den üç alanlı JSON yanıtı alır.
6. İçgörüler ekranı süre farkını ve AI sonuçlarını gösterir.
7. Aynı kayıt yeniden açılırsa oturumda saklanan analiz kullanılır.

## Zorunlu Kullanıcı Girdileri

- Niyet (`intent`)
- Planlanan süre (`plannedMinutes`)
- Telefon öncesindeki aktivite (`previousActivity`)
- Ruh hâli (`mood`)
- Gerçekte yapılan aktivite (`actualActivity`)
- Gerçek kullanım süresi (`actualMinutes`)

`createdAt` alanı kullanıcı tarafından değil, sistem tarafından otomatik oluşturulur.

## AI Çıktıları

- `yansitma`: Niyet ile gerçek kullanım arasındaki farkı empatik biçimde ele alan metin
- `tetikleyici_analizi`: Kullanıcının verdiği bağlama dayalı olası tetikleyici açıklaması
- `mini_deney`: Bir sonraki benzer durumda denenebilecek küçük davranış önerisi

## MVP’de Yer Almayan Özellikler

- Üyelik, giriş ve kullanıcı profili
- Kalıcı veritabanı ve çoklu kayıt geçmişi
- Cihazlar arası senkronizasyon
- Otomatik ekran süresi veya uygulama kullanım verisi toplama
- Bildirim ve hatırlatıcı sistemi
- Uzun dönem istatistikleri ve gelişmiş raporlama
- Sosyal özellikler veya uzman görüşmesi
- Tamamlanmış üretim ortamı dağıtımı

## Gelecekte Eklenebilecek Özellikler

- Kullanıcı hesabı ve güvenli bulut senkronizasyonu
- Tarih bazlı kayıt geçmişi, filtreleme ve trend grafikleri
- Hedefler, hatırlatıcılar ve kişiselleştirilebilir mini deneyler
- İzinli cihaz kullanım verileriyle otomatik kayıt desteği
- Veri silme, dışa aktarma ve ayrıntılı gizlilik kontrolleri
- Erişilebilirlik ve çoklu dil seçeneklerinin genişletilmesi
- Üretim ortamında merkezi izleme ve oran sınırlama

## MVP Tamamlanmış Sayılma Kriterleri

- Kullanıcı zorunlu alanlarla yeni kayıt oluşturabilmelidir.
- Frontend ve backend tanımlı API sözleşmesiyle haberleşebilmelidir.
- Gerçek Gemini isteği üç zorunlu AI alanını döndürebilmelidir.
- Sonuç ekranı süre karşılaştırmasını ve üç AI çıktısını gösterebilmelidir.
- Kayıt bulunmadığında demo veri yerine boş durum gösterilmelidir.
- Aynı kaydın analizi oturum içinde tekrar API çağrısı yapılmadan açılabilmelidir.
- Servis yoğunluğu veya hata durumunda kayıt kaybolmamalı ve yeniden deneme sunulmalıdır.
- API anahtarı Git deposuna veya frontend'e taşınmamalıdır.
- Frontend üretim derlemesi ve backend sağlık kontrolü başarılı olmalıdır.

---

# English Version

# Digital Compass — MVP Scope

## MVP Goal

Make the gap between a user's phone usage intention and actual behavior visible through a short record flow, then provide an empathetic and actionable AI insight about that difference.

## Features Included in the MVP

- Home, new record, and insights screens
- Empty states for first-time use
- Form-based collection of intended and actual usage information
- Comparison of planned and actual duration
- Latest record summary and intention adherence ratio
- Gemini analysis through FastAPI
- Fallback model support when the primary model is unavailable
- Structured three-card AI result
- Loading, service busy, general error, and retry states
- Browser-session storage for the latest record and analysis
- Local, Git-excluded backend storage for successful analyses

## Core Flow

1. The user opens the **New Record** screen.
2. The user enters intention, duration, previous activity, mood, and actual usage information.
3. The user selects **Analyze**.
4. The frontend stores the record in the session and sends a `POST /api/analyze` request.
5. The backend validates the input and receives a three-field JSON response from Gemini.
6. The insights screen displays the duration difference and AI results.
7. If the same record is reopened, the analysis stored in the session is reused.

## Required User Inputs

- Intention (`intent`)
- Planned duration (`plannedMinutes`)
- Activity before using the phone (`previousActivity`)
- Mood (`mood`)
- Actual activity (`actualActivity`)
- Actual usage duration (`actualMinutes`)

The `createdAt` field is generated automatically by the system rather than entered by the user.

## AI Outputs

- `yansitma`: An empathetic reflection on the gap between intention and actual usage
- `tetikleyici_analizi`: An explanation of a possible trigger based on the user's context
- `mini_deney`: A small behavioral suggestion for a similar future situation

## Features Not Included in the MVP

- Registration, sign-in, and user profiles
- Persistent database and multi-record history
- Cross-device synchronization
- Automatic collection of screen time or application usage data
- Notifications and reminders
- Long-term statistics and advanced reporting
- Social features or expert consultation
- Completed production deployment

## Potential Future Features

- User accounts and secure cloud synchronization
- Date-based history, filtering, and trend charts
- Goals, reminders, and customizable behavioral experiments
- Automatic records based on permission-based device usage data
- Data deletion, export, and detailed privacy controls
- Expanded accessibility and multilingual support
- Centralized monitoring and rate limiting in production

## MVP Completion Criteria

- The user can create a new record using all required fields.
- The frontend and backend communicate through the defined API contract.
- A real Gemini request returns all three required AI fields.
- The result screen displays both the duration comparison and the three AI outputs.
- When no record exists, an empty state is displayed instead of demo data.
- The analysis for the same record can be reopened within the session without another API request.
- During service availability or general errors, the record is preserved and retry is available.
- The API key is not moved into the repository or frontend.
- The frontend production build and backend health check succeed.
