import type { PhoneUseRecord } from '@/lib/record-data';

export type AnalysisResponse = {
  yansitma: string;
  tetikleyici_analizi: string;
  mini_deney: string;
};

function isAnalysisResponse(value: unknown): value is AnalysisResponse {
  if (!value || typeof value !== 'object') return false;

  const response = value as Partial<AnalysisResponse>;

  return (
    typeof response.yansitma === 'string' &&
    typeof response.tetikleyici_analizi === 'string' &&
    typeof response.mini_deney === 'string'
  );
}

function normalizeResponse(value: unknown): unknown {
  if (!value || typeof value !== 'object') return value;

  const wrappedResponse = (value as { response?: unknown }).response;
  if (typeof wrappedResponse !== 'string') return value;

  try {
    return JSON.parse(wrappedResponse) as unknown;
  } catch {
    return value;
  }
}

export async function requestAnalysis(
  record: PhoneUseRecord,
  signal?: AbortSignal,
): Promise<AnalysisResponse | null> {
  const apiUrl = process.env.NEXT_PUBLIC_ANALYZE_API_URL?.trim();

  if (!apiUrl) return null;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Analiz isteği başarısız oldu (${response.status}).`);
  }

  const payload: unknown = await response.json();
  const normalizedPayload = normalizeResponse(payload);

  if (!isAnalysisResponse(normalizedPayload)) {
    throw new Error('Analiz servisi beklenen veri biçimini döndürmedi.');
  }

  return normalizedPayload;
}
