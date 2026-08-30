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

