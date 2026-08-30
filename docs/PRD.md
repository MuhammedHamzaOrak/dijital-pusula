# Dijital Pusula — Ürün Gereksinimleri

## Proje Özeti

Dijital Pusula, kullanıcının telefonu açarken belirlediği niyet ile gerçekleşen kullanım arasındaki farkı görünür hâle getiren bir dijital farkındalık uygulamasıdır. Kullanıcıdan alınan kısa bağlam bilgileri, Gemini destekli bir servis tarafından yargılayıcı olmayan üç parçalı bir içgörüye dönüştürülür.

## Problem Tanımı

Telefon kullanımı çoğu zaman başlangıçtaki amaçtan sapabilir. Kullanıcılar ne planladıklarını, gerçekte ne yaptıklarını ve bu farkın hangi duygu veya bağlamda oluştuğunu birlikte değerlendirmekte zorlanabilir. Proje, bu farkı suçluluk üretmeden anlaşılır hâle getirmeyi amaçlar.

## Hedef Kullanıcı

- Telefon kullanım alışkanlıklarını fark etmek isteyen kişiler
- Planladığı süre ile gerçek kullanımını karşılaştırmak isteyen öğrenciler ve genç yetişkinler
- Klinik değerlendirme yerine kısa, uygulanabilir farkındalık desteği arayan kullanıcılar

## Değer Önerisi

Dijital Pusula; niyet, süre, gerçekleşen eylem ve duygu bilgisini tek akışta birleştirir. Kullanıcıya yalnızca süre farkını göstermekle kalmaz; bu farkı empatik bir dille yorumlar ve bir sonraki benzer durum için küçük bir davranış deneyi önerir.

## Temel Kullanıcı Akışı

1. Kullanıcı ana sayfada son kayıt özetini veya ilk kullanım boş durumunu görür.
2. **Yeni Kayıt** ekranında niyetini, planlanan süreyi ve kullanım öncesi bağlamını girer.
3. Gerçekte yaptığı eylemi ve gerçek kullanım süresini ekler.
4. **Analiz Et** seçeneğiyle kayıt tarayıcı oturumuna alınır ve analiz servisine gönderilir.
5. Backend girdiyi doğrular ve Gemini üzerinden yapılandırılmış analiz üretir.
6. Kullanıcı; süre karşılaştırmasını, yansıtmayı, olası tetikleyiciyi ve küçük davranış deneyini görür.
7. Aynı kayıt için başarılı analiz tarayıcı oturumunda yeniden kullanılır; gereksiz tekrar isteği gönderilmez.

## Ana Özellikler

- Ana sayfa, yeni kayıt ve içgörülerden oluşan üç ekranlı responsive arayüz
- İlk kullanım için boş kayıt ve boş içgörü durumları
- Niyet ile gerçek kullanım süresinin görsel karşılaştırması
- Son kayda ait süre farkı, niyete sadakat oranı ve aktivite özeti
- FastAPI üzerinden Gemini destekli analiz
- `gemini-2.5-flash` ana model ve kota/yoğunluk durumunda `gemini-2.5-flash-lite` yedek model
- Yükleniyor, servis yoğun ve genel hata durumları ile yeniden deneme akışı
- Aynı kayıt için oturumluk analiz önbelleği
- Backend sağlık kontrolü ve yapılandırılabilir CORS desteği

## Kullanıcı Girdileri

- Telefonu açma niyeti
- Planlanan kullanım süresi: 1–60 dakika
- Telefona yönelmeden önce yapılan aktivite
- Ruh hâli: Sakin, Yorgun, Stresli veya Bunalmış
- Gerçekte yapılan aktivite
- Gerçek kullanım süresi: 1–120 dakika

Kayıt zamanı sistem tarafından otomatik eklenir.

## Sistem Çıktıları

- Planlanan ve gerçek süre karşılaştırması
- Niyet dışı kullanım süresi veya plan içinde kalma bilgisi
- Son kayda ait niyete sadakat oranı ve aktivite özeti
- `yansitma`: Yargılamayan kısa değerlendirme
- `tetikleyici_analizi`: Sağlanan bağlama dayalı olası tetikleyici açıklaması
- `mini_deney`: Düşük eforlu, uygulanabilir davranış deneyi
- Boş, yükleniyor, servis yoğun ve hata durumlarına uygun kullanıcı mesajları

## MVP Dışı Kapsam

- Kullanıcı hesabı, giriş ve yetkilendirme
- Veritabanına dayalı kalıcı ve çoklu cihaz kayıt geçmişi
- Telefonun ekran süresini veya uygulama kullanımını otomatik okuma
- Bildirim, hatırlatıcı ve hedef takibi
- Uzun dönem trendleri, gelişmiş grafikler ve kişiselleştirilmiş raporlar
- Sosyal paylaşım, topluluk veya uzman paneli
- Yerel geliştirme ortamı dışında tamamlanmış üretim dağıtımı

## Başarı Kriterleri

- Zorunlu alanlar doldurulduğunda kayıt analiz servisine doğru veri yapısıyla gönderilebilmelidir.
- Başarılı analiz, yalnızca `yansitma`, `tetikleyici_analizi` ve `mini_deney` alanlarıyla işlenebilmelidir.
- Kullanıcı niyet–gerçeklik farkını ve üç AI içgörüsünü tek sonuç ekranında görebilmelidir.
- Kayıt yokken demo analiz yerine anlaşılır boş durum gösterilmelidir.
- Aynı kayıt tekrar açıldığında mevcut analiz kullanılmalı ve yeni API isteği oluşturulmamalıdır.
- Kota, yoğunluk ve bağlantı hatalarında kayıt korunmalı ve kullanıcı yeniden deneyebilmelidir.
- Gemini API anahtarı frontend kodunda veya Git deposunda bulunmamalıdır.

## Etik ve Gizlilik

- AI yanıtları yargılayıcı, suçlayıcı veya klinik teşhis içeren bir dil kullanmamalıdır.
- Analiz yalnızca kullanıcının sağladığı girdilere dayanmalı; kişilik, yaşam veya sağlık hakkında veri dışı varsayım üretmemelidir.
- Kullanıcı girdileri analiz sırasında Gemini API'ye gönderilir; bu durum ürün sunumunda açıkça belirtilmelidir.
- Son kayıt ve analiz frontend tarafında yalnızca tarayıcı oturumunda tutulur.
- Başarılı istekler backend tarafında Git tarafından izlenmeyen yerel `kayitlar.local.json` dosyasına yazılır.
- Gemini API anahtarı yalnızca backend `.env` dosyasında saklanır ve repoya eklenmez.

