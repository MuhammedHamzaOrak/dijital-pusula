# Dijital Pusula — Proje Raporu

## 1. Seçilen Dijital Bağımlılık Problemi
Bu projede, dijital bağımlılık ve dijital iyi oluş teması altında kullanıcıların sorunlu dijital kullanımlarını anlamalarına yardımcı olacak bir çözüm geliştirmeyi hedefledik. Sorun yalnızca "ekranda ne kadar zaman geçirildiği" değil, "telefonu açma niyeti ile gerçekte yapılan eylem arasındaki sapmanın fark edilememesi" olarak belirlenmiştir. Dijital Pusula, bu niyet-gerçeklik boşluğunu ölçerek kullanıcının hangi duygu veya bağlamlarda (tetikleyicilerde) amacından saptığını analiz eden ve sağlıklı dijital alışkanlıklar kazanmasını destekleyen bir farkındalık aracıdır. 

**Çalışan MVP Akışı:** Kullanıcı niyetini, planlanan süreyi, önceki aktivitesini, ruh hâlini, gerçekleşen eylemi ve gerçek süreyi girer. Sistem süre farkını gösterir ve yansıtma, olası tetikleyici ve mini deneyden oluşan üçlü yapay zekâ analizi sunar. 

## 2. Kullanılan Üretken Yapay Zekâ Modeli
Projeyi hayata geçirmek için ana model olarak Google Gemini 2.5 Flash, olası kesintilere karşı yedek model olarak ise Gemini 2.5 Flash-Lite kullanılmıştır. Üretken yapay zekâ, doğrudan API çağrılarımaracılığıyla Python (FastAPI) arka ucuna entegre edilmiş ve uygulamanın merkezine yerleştirilmiştir. 

## 3. Prompt Tasarımı ve Gerekçesi
Modelin çıktılarını istenen formatta, kalitede ve tonda tutmak için "Structured Step-by-Step" ve katı "Guardrails" (sınırlandırma) prompt teknikleri kullanılmıştır. Rapor sınırlarını aşmamak adına sistem promptunun tamamı GitHub depomuzda prompts/main-prompt.md dizininde paylaşılmış olup, temel tasarım mantığı aşağıda özetlenmiştir:  
* **Rol Tanımı ve Etik Sınırlar:** Modele "yargılamayan, empatik ve bilimsel temelli bir dijital esenlik asistanı" rolü verilmiştir. Modelin teşhis koyucu klinik terimler (DEHB, bağımlılık, depresyon vb.) kullanması engellenmiş; sadece verilen değişkenler üzerinden çıkarım yapması sağlanarak halüsinasyon riski azaltılmaya 
çalışılmıştır. 
* **Adım Adım Düşünce Yapısı:** Modele, doğrudan çıktı üretmeden önce zihninde adım adım düşünmesi talimatı verilmiştir. Önce niyet ile gerçek eylem arasındaki sapmayı ölçmesi, ardından bunu bağlamsal tetikleyiciyle ilişkilendirmesi sağlanmıştır.  
* **Yapılandırılmış Çıktı:** API ile arayüzün tutarlı haberleşebilmesi için modelin yanıtı sınırlandırılmıştır. Çıktının, hiçbir ek metin veya markdown karakteri içermeyen; yalnızca yansitma, tetikleyici_analizi ve mini_deney anahtarlarını barındıran saf bir JSON objesi olarak dönmesi zorunlu kılınmıştır. 

## 4. Karşılaşılan Zorluklar ve Çözüm Süreci
Geliştirme sürecinde karşılaşılan teknik ve tasarımsal zorluklar şu şekilde aşılmıştır: 
* **Frontend-Backend İletişimi:** Arayüzün (React/Next.js) backend API'si ile haberleşmesi sırasında veri formatı uyumsuzlukları ve CORS politikalarından kaynaklı erişim hataları yaşanmış, veriler ortak bir JSON yapısında senkronize edilerek çözülmüştür. 
* **Önbellek (Cache) ve Durum Yönetimi:** Gemini ücretsiz kullanım kotası ve geçici model yoğunluğu nedeniyle 429 ve 503 hatalarıyla karşılaşılmıştır. Ana model kullanılamadığında yedek modele geçiş eklenmiş; aynı kayıt için gereksiz API çağrılarını önlemek amacıyla analiz sonucu tarayıcı oturumunda saklanmıştır. 
* **Bilişsel Yükün Azaltılması:** Yapay zekâdan dönen detaylı içgörüler, kullanıcının bilişsel yükünü azaltmak amacıyla arayüzde kart tasarımlarına bölünmüştür. Renk kodları ve ikonlar kullanılarak geri bildirimin yargılayıcı değil, destekleyici hissedilmesi sağlanmıştır. 

## 5. Etik Değerlendirme
Uygulamamızın, tıbbi bir teşhis koyma riski veya yargılayıcı, önyargılı çıktılar üretme potansiyeli gibi etik riskleri titizlikle değerlendirilmiştir.  
* **Tıbbi Teşhis ve Yargılamadan Kaçınma:** Sistem promptuna, modelin teşhis koyucu klinik bir dil kullanma ve kullanıcıyı yargılama riskini en aza indirmek amacıyla etik sınırlar eklenmiştir. Bu kurallar sayesinde yapay zekânın tıbbi tavsiye niteliğinde içerik üretme ihtimali büyük ölçüde sınırlandırılmış ve uygulamanın yalnızca destekleyici bir farkındalık aracı olarak kalması hedeflenmiştir. 
* **Kişisel Veri Gizliliği:** Uygulama kullanıcı hesabı veya doğrudan kimlik bilgisi toplamaz. Kullanıcı girdileri analiz için Gemini API’ye gönderilir. Son kayıt ve analiz tarayıcı oturumunda, başarılı analizler ise backend tarafında Git’e eklenmeyen yerel dosyada saklanır. 

## 6. Gelecek Vizyonu ve Geliştirme Potansiyeli
Projenin ilerleyen aşamalarında; kullanıcı hesapları oluşturularak verilerin güvenli bulut ortamında senkronize edilmesi, tarih bazlı kayıt geçmişinin gelişmiş trend grafikleriyle analiz edilmesi ve cihaz ekran süresi verileriyle entegre otomatik kayıt oluşturulması gibi özellikler eklenebilir. Sistemin daha proaktif bir yapıya kavuşması amacıyla kişiselleştirilebilir iyi oluş hedefleri, akıllı hatırlatıcılar ve genişletilmiş mini deney kütüphanesi entegre edilebilir. Buna ek olarak, takımımızın ek vizyon sunumuyla şimdiden konseptleştirdiği üzere; uygulamanın küresel pazara açılması için globalleşme (İngilizce dil desteği) araştırmaları ve farklı kullanıcı alışkanlıklarına hitap edecek alternatif yeni nesil arayüz (UI/UX) tasarımları hayata geçirilebilir. Uygulamanın ileriye dönük 
ölçeklendirilmesi durumunda ise veri dışa aktarma ve silme gibi gizlilik kontrolleri sağlanabilir; erişilebilirlik standartları, merkezi log izleme ve API oran sınırlama gibi sağlam altyapı iyileştirmeleri devreye alınabilir.

## 7. Ekip Rolleri ve Görev Dağılımı
* **Sinem Can:** Backend Geliştirme (FastAPI), Gemini API Entegrasyonu, Prompt Tasarımı ve Rapor Hazırlanması.
* **Muhammed Hamza Orak:** Frontend Geliştirme (Vinext — Vite tabanlı Next.js uyumlu React yapı), UI/UX Tasarımı Kullanıcı Deneyimi Optimizasyonu ve API İletişiminin Sağlanması. 
* **Ziya İpek:** Proje Koordinasyonu, Demo Senaryosunun Yönetimi ve Video Çekimi.
* **Şule Nur Bağyut:** Alternatif Konsept Tasarımı, Globalleşme Araştırmaları ve Sunumun Hazırlanması. 

---

# English Version

## Digital Compass — Project Report

### 1. Selected Digital Addiction Problem
In this project, under the theme of digital addiction and digital well-being, we aimed to develop a solution that helps users understand their problematic digital usage. The problem was identified not simply as "how much time is spent on the screen", but as "the inability to notice the deviation between the intention of opening the phone and the action actually performed". Digital Compass is an awareness tool that measures this intentionreality gap, analyzes in which emotions or contexts (triggers) the user deviates from their purpose, and supports them in developing healthy digital habits. 

**Working MVP Flow:** The user enters their intention, planned duration, previous activity, mood, actual action, and actual duration. The system shows the duration difference and provides a three-part AI analysis consisting of reflection possible trigger, and mini experiment. 

### 2. Generative Artificial Intelligence Model Used
To bring the project to life, Google Gemini 2.5 Flash was used as the primary model, while Gemini 2.5 Flash-Lite was used as a backup model against possible interruptions. Generative artificial intelligence was integrated into the Python (FastAPI) backend through direct API calls and placed at the center of the application.

### 3. Prompt Design and Rationale
To keep the model's outputs in the desired format, quality, and tone, "Structured Step-byStep" and strict "Guardrails" (restriction) prompt techniques were used. To avoid exceeding the report limits, the entire system prompt has been shared in our GitHub repository at prompts/main-prompt.md, and the basic design logic is summarized below: 
* **Role Definition and Ethical Boundaries:** The model was given the role of a "nonjudgmental, empathetic, and scientifically grounded digital well-being assistant". The model was prevented from using diagnostic clinical terms (ADHD, addiction, depression, etc.); by ensuring that it only made inferences based on the given variables, an attempt was made to reduce the risk of hallucination. 
* **Step-by-Step Thought Structure:** The model was instructed to think step by step in its mind before directly producing an output. It was ensured that it first measured the deviation between intention and actual action, and then associated this with the contextual trigger. 
* **Structured Output:** The model's response was constrained so that the API and interface could communicate consistently. It was made mandatory for the output to be returned as a pure JSON object containing only the yansitma, tetikleyici_analizi, and mini_deney keys, without any additional text or markdown characters. 

### 4. Challenges Encountered and Solution Process
The technical and design challenges encountered during the development process were overcome as follows:
* **Frontend-Backend Communication:** During communication between the interface (React/Next.js) and the backend API, data format incompatibilities and access errors caused by CORS policies were encountered, and these were resolved by synchronizing the data in a common JSON structure.
* **Cache and State Management:** Due to the Gemini free usage quota and temporary model congestion, 429 and 503 errors were encountered. A fallback to the backup model was added when the primary model was unavailable; the analysis result was stored in the browser session to prevent unnecessary API calls for the same record.
* **Reducing Cognitive Load:** Detailed insights returned by the AI were divided into card designs in the interface in order to reduce the user's cognitive load. By using color codes and icons, the feedback was made to feel supportive rather than judgmental.

### 5. Ethical Evaluation
Ethical risks of our application, such as the risk of making a medical diagnosis or the potential to produce judgmental, biased outputs, were carefully evaluated.
* **Avoiding Medical Diagnosis and Judgment:** Ethical boundaries were added to the system prompt in order to minimize the risk of the model using diagnostic clinical language and judging the user. Thanks to these rules, the possibility of the AI producing content in the nature of medical advice was largely limited, and the application was intended to remain only as a supportive awareness tool.
* **Personal Data Privacy:** The application does not collect a user account or direct identification information. User inputs are sent to the Gemini API for analysis. The latest record and analysis are stored in the browser session, while successful analyses are stored on the backend in a local file that is not added to Git.

### 6. Future Vision and Development Potential
In the later stages of the project, features such as creating user accounts and 
synchronizing data in a secure cloud environment, analyzing date-based record history 
with advanced trend graphs, and automatically creating records integrated with device 
screen-time data can be added. To make the system more proactive, customizable well
being goals, smart reminders, and an expanded mini-experiment library can be 
integrated. In addition, as already conceptualized by our team through the supplementary 
vision presentation, globalization research (including English language support) for the 
application’s expansion into the global market and alternative next-generation UI/UX 
designs that cater to different user habits can be implemented. If the application is scaled 
in the future, privacy controls such as data export and deletion can be provided; robust 
infrastructure improvements such as accessibility standards, multi-language support, 
centralized log monitoring, and API rate limiting can be implemented. 

### 7. Team Roles and Task Distribution
* **Sinem Can:** Backend Development (FastAPI), Gemini API Integration, Prompt Design, and Report Preparation.
* **Muhammed Hamza Orak:** Frontend Development (Vinext — Vite-based Next.js compatible React structure), UI/UX Design, User Experience Optimization, and Ensuring API Communication. 
* **Ziya İpek:** Project Coordination, Management of the Demo Scenario, and Video Recording.
* **Şule Nur Bağyut:** Alternative Concept Design, Globalization Research, and Presentation Preparation. 