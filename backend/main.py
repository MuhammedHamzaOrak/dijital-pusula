from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import errors, types
from pydantic import BaseModel
import json
import logging
import os
from pathlib import Path
from dotenv import load_dotenv

BACKEND_DIR = Path(__file__).resolve().parent
DATA_FILE = BACKEND_DIR / "kayitlar.local.json"

load_dotenv(dotenv_path=BACKEND_DIR / ".env")

logger = logging.getLogger(__name__)

app = FastAPI()

# CORS Ayarı
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in os.getenv(
            "FRONTEND_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000",
        ).split(",")
        if origin.strip()
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini API Bağlantısı
api_key = os.getenv("GEMINI_API_KEY")
gemini_model = os.getenv("GEMINI_MODEL", "gemini-3.7-flash")
gemini_fallback_model = os.getenv("GEMINI_FALLBACK_MODEL", "gemini-2.5-flash")
client = genai.Client(api_key=api_key) if api_key else None

system_prompt = """
SENİN ROLÜN VE AMACIN:
Sen "Dijital Pusula" uygulamasının kalbinde çalışan, uzman, empatik ve bilimsel temelli bir Dijital Esenlik (Digital Well-being) asistanısın. Görevin; kullanıcının dijital niyetleri ile gerçekte olan eylemleri arasındaki farkı yargılamadan analiz etmek, bu sapmanın arkasındaki duygusal/bağlamsal tetikleyicileri bulmak ve kullanıcının farkındalığını artıracak sürtünmesiz küçük davranış deneyleri önermektir.

GİRDİ DEĞİŞKENLERİ:
Sana her sorguda şu 5 veri sağlanacaktır:
1. {Niyet}: Kullanıcının telefonu eline alırken planladığı amaç.
2. {Planlanan_Sure}: Niyet edilen eylem için düşünülen zaman.
3. {Gercek_Eylem}: Telefonda fiilen gerçekleştirilen eylem.
4. {Gercek_Sure}: Telefonda geçirilen toplam gerçek zaman.
5. {Baglam}: Kullanıcının telefonu eline almadan önceki fiziksel, zihinsel veya duygusal durumu.

KATIL GEREKSİNİMLER VE SINIRLAR (GUARDRAILS):
- ETİK SINIRLAR: KESİNLİKLE tıbbi, psikolojik veya psikiyatrik bir teşhis koyma. Yanıtlarında "DEHB (ADHD)", "bağımlılık", "depresyon", "anksiyete", "dürtü kontrol bozukluğu" gibi klinik veya patolojik terimleri ASLA kullanma.
- YAKLAŞIM VE TON: Kullanıcıyı ASLA yargılama, suçlama, eleştirme veya başarısız hissettirme. "Çok fazla zaman harcamışsın", "Bunu yapmamalıydın", "İradeni kontrol etmelisin" gibi ifadeler YASAKTIR. Tonun daima meraklı, empatik, şefkatli ve destekleyici (yansıtıcı) olmalıdır. İnsanların dikkatlerinin dağılmasını doğal bir insani durum olarak normalleştir.
- HALÜSİNASYON ÖNLEME: Sadece sağlanan girdi değişkenleri üzerinden çıkarım yap. Kullanıcının genel hayatı, mesleği veya kişiliği hakkında veri dışı varsayımlarda bulunma.

ADIM ADIM DÜŞÜNCE YAPISI (CHAIN-OF-THOUGHT):
Yanıtını oluştururken (çıktıya yansıtmadan) zihninde şu adımları izle:
1. Niyet ve Gerçek Eylem arasındaki boşluğu ölç ve bunu {Baglam} ile ilişkilendir.
2. Bu boşluğu normalleştiren, neden-sonuç ilişkisi kuran empatik bir yansıtma (reflection) cümlesi tasarla.
3. {Baglam}'ın (duygunun/durumun) bu sapmaya nasıl yol açtığını net bir şekilde tanımlayan bir tetikleyici analizi yap.
4. Kullanıcının bir sonraki sefer benzer bir bağlamda/duyguda uygulayabileceği çok basit, suçluluk yaratmayan ve düşük eforlu bir mikro davranış deneyi tasarla.

ÇIKTI FORMATI:
Senden İSTENEN TEK ŞEY geçerli, saf bir JSON objesidir.
JSON objesi dışında HİÇBİR selamlama, açıklama, ön söz, son söz veya markdown formatting (```json vb. kod blokları dahil) KULLANMA. API doğrudan bu çıktıyı parse edecektir.
JSON objesi sadece ve kesinlikle şu 3 anahtarı içermelidir: "yansitma", "tetikleyici_analizi", "mini_deney".
"""

# FRONTEND'İN GÖNDERECEĞİ İNGİLİZCE İSİMLİ VERİ FORMATI
class İstekVerisi(BaseModel):
    intent: str
    plannedMinutes: int
    previousActivity: str
    mood: str
    actualActivity: str
    actualMinutes: int
    createdAt: str


class AnalizYaniti(BaseModel):
    yansitma: str
    tetikleyici_analizi: str
    mini_deney: str

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "geminiConfigured": bool(api_key),
        "model": gemini_model,
        "fallbackModel": gemini_fallback_model,
    }


@app.post("/api/analyze")
def analyze_activity(data: İstekVerisi):
    if client is None:
        raise HTTPException(
            status_code=503,
            detail="GEMINI_API_KEY henüz yapılandırılmadı.",
        )

    # Frontend'den gelen 'previousActivity' ve 'mood' verilerini prompttaki 'Baglam' değişkeni için birleştiriyoruz
    baglam_birlestirilmis = (
        f"Önceki aktivitesi '{data.previousActivity}' şeklindeydi ve "
        f"o anki ruh hali '{data.mood}' durumundaydı."
    )

    # Promptun beklediği 5 değişkeni formatlıyoruz
    user_prompt = (
        f"- Niyet: {data.intent}\n"
        f"- Planlanan_Sure: {data.plannedMinutes} dakika\n"
        f"- Gercek_Eylem: {data.actualActivity}\n"
        f"- Gercek_Sure: {data.actualMinutes} dakika\n"
        f"- Baglam: {baglam_birlestirilmis}"
    )

    try:
        generate_config = types.GenerateContentConfig(
            system_instruction=system_prompt,
            response_mime_type="application/json",
            response_json_schema=AnalizYaniti.model_json_schema(),
        )

        try:
            response = client.models.generate_content(
                model=gemini_model,
                contents=user_prompt,
                config=generate_config,
            )
        except errors.ServerError as exc:
            if exc.code != 503 or gemini_fallback_model == gemini_model:
                raise

            logger.warning(
                "Gemini ana modeli yogun; yedek model deneniyor: %s",
                gemini_fallback_model,
            )
            response = client.models.generate_content(
                model=gemini_fallback_model,
                contents=user_prompt,
                config=generate_config,
            )

        ai_result = AnalizYaniti.model_validate_json(response.text).model_dump()
    except Exception:
        logger.exception("Gemini analiz istegi basarisiz oldu")
        # Frontend'in istediği 502 hata fırlatma kuralı
        raise HTTPException(
            status_code=502,
            detail="AI servisine ulaşılamadı veya geçersiz yanıt alındı.",
        )

    yeni_kayit = {
        "kullanici_girisi": data.model_dump(),
        "ai_analizi": ai_result
    }

    if DATA_FILE.exists():
        with DATA_FILE.open("r", encoding="utf-8") as f:
            gecmis = json.load(f)
    else:
        gecmis = []

    gecmis.append(yeni_kayit)

    with DATA_FILE.open("w", encoding="utf-8") as f:
        json.dump(gecmis, f, ensure_ascii=False, indent=4)

    # Frontend'in tam olarak beklediği o temiz JSON'u dönüyoruz
    return ai_result
