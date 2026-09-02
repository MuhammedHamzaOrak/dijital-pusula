import type { PhoneUseRecord } from '@/lib/record-data';

export type AnalysisResponse = {
  yansitma: string;
  tetikleyici_analizi: string;
  mini_deney: string;
};

export class AnalysisApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'AnalysisApiError';
  }
}

export function isAnalysisResponse(value: unknown): value is AnalysisResponse {
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
): Promise<AnalysisResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_ANALYZE_API_URL?.trim();

  if (!apiUrl) {
    throw new AnalysisApiError(0, 'The analysis service URL is not configured.');
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
    signal,
  });

  if (!response.ok) {
    let message = `The analysis request failed (${response.status}).`;

    try {
      const errorPayload: unknown = await response.json();
      if (
        errorPayload &&
        typeof errorPayload === 'object' &&
        typeof (errorPayload as { detail?: unknown }).detail === 'string'
      ) {
        message = (errorPayload as { detail: string }).detail;
      }
    } catch {
      // Use the status code when the server does not return a JSON error body.
    }

    throw new AnalysisApiError(response.status, message);
  }

  const payload: unknown = await response.json();
  const normalizedPayload = normalizeResponse(payload);

  if (!isAnalysisResponse(normalizedPayload)) {
    throw new Error('The analysis service returned an unexpected data format.');
  }

  return normalizedPayload;
}
