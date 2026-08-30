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

---

# English Version

# Digital Compass — Product Requirements Document

## Product Summary

Digital Compass is a digital awareness application that makes the gap between a user's intention when opening their phone and their actual usage visible. Brief contextual information provided by the user is transformed into a non-judgmental, three-part insight by a Gemini-powered service.

## Problem Statement

Phone usage can easily drift away from its original purpose. Users may struggle to evaluate what they planned, what they actually did, and the emotional or contextual conditions in which the gap occurred. The project aims to make this difference understandable without creating guilt.

## Target Users

- People who want to become aware of their phone usage habits
- Students and young adults who want to compare planned time with actual usage
- Users seeking brief and actionable awareness support rather than a clinical assessment

## Value Proposition

Digital Compass combines intention, duration, actual action, and emotional context in a single flow. It not only displays the time difference but also interprets it with empathetic language and suggests a small behavioral experiment for a similar future situation.

## Core User Flow

1. On the home page, the user sees either the latest record summary or the first-use empty state.
2. On the **New Record** screen, the user enters their intention, planned duration, and pre-usage context.
3. The user adds the actual action and actual usage duration.
4. By selecting **Analyze**, the record is stored in the browser session and sent to the analysis service.
5. The backend validates the input and generates a structured analysis through Gemini.
6. The user sees the duration comparison, reflection, possible trigger, and small behavioral experiment.
7. A successful analysis is reused for the same record within the browser session, preventing unnecessary repeated requests.

## Key Features

- Responsive three-screen interface consisting of the home, new record, and insights pages
- Empty record and empty insight states for first-time use
- Visual comparison of intended and actual usage duration
- Duration difference, intention adherence ratio, and activity summary for the latest record
- Gemini-powered analysis through FastAPI
- `gemini-2.5-flash` as the primary model and `gemini-2.5-flash-lite` as the fallback during quota or availability issues
- Loading, service busy, general error, and retry states
- Session-level analysis cache for the same record
- Backend health check and configurable CORS support

## User Inputs

- Intention for opening the phone
- Planned usage duration: 1–60 minutes
- Activity performed before reaching for the phone
- Mood: Calm, Tired, Stressed, or Overwhelmed
- Actual activity performed
- Actual usage duration: 1–120 minutes

The record timestamp is added automatically by the system.

## System Outputs

- Comparison of planned and actual duration
- Unintended usage duration or confirmation that usage stayed within the plan
- Intention adherence ratio and activity summary for the latest record
- `yansitma`: A brief, non-judgmental reflection
- `tetikleyici_analizi`: An explanation of a possible trigger based on the provided context
- `mini_deney`: A low-effort, practical behavioral experiment
- Appropriate messages for empty, loading, service busy, and error states

## Out of MVP Scope

- User accounts, sign-in, and authorization
- Database-backed persistent history across multiple devices
- Automatic access to screen time or application usage data
- Notifications, reminders, and goal tracking
- Long-term trends, advanced charts, and personalized reports
- Social sharing, community features, or an expert dashboard
- A completed production deployment outside the local development environment

## Success Criteria

- When all required fields are completed, the record can be sent to the analysis service using the correct data structure.
- A successful analysis can be processed using only the `yansitma`, `tetikleyici_analizi`, and `mini_deney` fields.
- The user can view the intention–reality gap and all three AI insights on one result screen.
- When no record exists, a clear empty state is shown instead of demo analysis.
- When the same record is reopened, the existing analysis is reused without creating another API request.
- During quota, availability, or connection errors, the record is preserved and the user can retry.
- The Gemini API key is not present in the frontend code or Git repository.

## Ethics and Privacy

- AI responses must not use judgmental, blaming, or clinically diagnostic language.
- The analysis must rely only on user-provided inputs and must not make unsupported assumptions about personality, life, or health.
- User inputs are sent to the Gemini API during analysis; this must be stated clearly in the product presentation.
- The latest record and analysis are stored on the frontend only for the browser session.
- Successful requests are written to the local `kayitlar.local.json` file on the backend, which is not tracked by Git.
- The Gemini API key is stored only in the backend `.env` file and is never committed to the repository.
