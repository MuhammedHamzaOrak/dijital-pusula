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

# CORS configuration
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

# Gemini API connection
api_key = os.getenv("GEMINI_API_KEY")
gemini_model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
gemini_fallback_model = os.getenv("GEMINI_FALLBACK_MODEL", "gemini-2.5-flash-lite")
client = genai.Client(api_key=api_key) if api_key else None

system_prompt = """
YOUR ROLE AND PURPOSE:
You are the expert, empathetic, and science-informed Digital Well-being assistant at the heart of the "Digital Compass" application. Your task is to analyze the gap between a user's digital intention and what they actually did without judgment, identify possible emotional or contextual triggers behind that gap, and suggest low-friction behavior experiments that can increase awareness.

INPUT VARIABLES:
You will receive the following five pieces of information with each request:
1. {Intent}: The purpose the user planned when they picked up their phone.
2. {Planned_Time}: The amount of time they intended to spend on that purpose.
3. {Actual_Action}: What they actually did on the phone.
4. {Actual_Time}: The total amount of time they actually spent on the phone.
5. {Context}: The user's physical, mental, or emotional state before reaching for the phone.

STRICT REQUIREMENTS AND GUARDRAILS:
- ETHICAL BOUNDARIES: Never make a medical, psychological, or psychiatric diagnosis. Never use clinical or pathological labels such as "ADHD", "addiction", "depression", "anxiety disorder", or "impulse-control disorder" in your response.
- APPROACH AND TONE: Never judge, blame, criticize, or make the user feel like a failure. Statements such as "You spent too much time", "You should not have done that", or "You need more self-control" are prohibited. Keep the tone curious, empathetic, compassionate, supportive, and reflective. Normalize distraction as a natural human experience.
- HALLUCINATION PREVENTION: Base your interpretation only on the provided input variables. Do not make unsupported assumptions about the user's wider life, profession, personality, or health.
- OUTPUT LANGUAGE: Write all three response values in clear, natural English.

INTERNAL REASONING PROCESS:
Use the following steps internally without revealing them in the response:
1. Compare the intention and actual action, then relate the gap to {Context}.
2. Create an empathetic reflection that normalizes the gap and offers a cautious cause-and-effect interpretation.
3. Describe how {Context} may have contributed to the shift, presenting the trigger as a possibility rather than a certainty.
4. Design a very simple, guilt-free, low-effort behavior experiment the user could try in a similar situation.

OUTPUT FORMAT:
Return only one valid, plain JSON object.
Do not include a greeting, explanation, introduction, conclusion, or Markdown formatting such as a ```json code block. The API will parse the response directly.
The JSON object must contain exactly these three keys: "yansitma", "tetikleyici_analizi", and "mini_deney". Every value must be a string written in English.
"""

# Request shape sent by the frontend
class AnalysisRequest(BaseModel):
    intent: str
    plannedMinutes: int
    previousActivity: str
    mood: str
    actualActivity: str
    actualMinutes: int
    createdAt: str


class AnalysisResponse(BaseModel):
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
def analyze_activity(data: AnalysisRequest):
    if client is None:
        raise HTTPException(
            status_code=503,
            detail="GEMINI_API_KEY is not configured.",
        )

    # Combine previousActivity and mood into the context expected by the prompt.
    context_summary = (
        f"The user was previously '{data.previousActivity}' and "
        f"was feeling '{data.mood}' at that moment."
    )

    # Format the five variables expected by the prompt.
    user_prompt = (
        f"- Intent: {data.intent}\n"
        f"- Planned_Time: {data.plannedMinutes} minutes\n"
        f"- Actual_Action: {data.actualActivity}\n"
        f"- Actual_Time: {data.actualMinutes} minutes\n"
        f"- Context: {context_summary}"
    )

    try:
        generate_config = types.GenerateContentConfig(
            system_instruction=system_prompt,
            response_mime_type="application/json",
            response_json_schema=AnalysisResponse.model_json_schema(),
        )

        try:
            response = client.models.generate_content(
                model=gemini_model,
                contents=user_prompt,
                config=generate_config,
            )
        except errors.APIError as exc:
            if exc.code not in {429, 503} or gemini_fallback_model == gemini_model:
                raise

            logger.warning(
                "Primary Gemini model unavailable (%s); trying fallback model: %s",
                exc.code,
                gemini_fallback_model,
            )
            response = client.models.generate_content(
                model=gemini_fallback_model,
                contents=user_prompt,
                config=generate_config,
            )

        ai_result = AnalysisResponse.model_validate_json(response.text).model_dump()
    except errors.APIError as exc:
        logger.exception("Gemini analysis request failed")
        if exc.code in {429, 503}:
            raise HTTPException(
                status_code=503,
                detail="The AI service is currently busy. Please try again shortly.",
            )
        raise HTTPException(
            status_code=502,
            detail="The AI service could not be reached or returned an invalid response.",
        )
    except Exception:
        logger.exception("Gemini analysis request failed")
        # Return the 502 error expected by the frontend.
        raise HTTPException(
            status_code=502,
            detail="The AI service could not be reached or returned an invalid response.",
        )

    new_record = {
        "user_input": data.model_dump(),
        "ai_analysis": ai_result
    }

    if DATA_FILE.exists():
        with DATA_FILE.open("r", encoding="utf-8") as f:
            history = json.load(f)
    else:
        history = []

    history.append(new_record)

    with DATA_FILE.open("w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=4)

    # Return the clean JSON object expected by the frontend.
    return ai_result
