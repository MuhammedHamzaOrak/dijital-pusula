export const RECORD_STORAGE_KEY = 'dijital-pusula:last-record';

export type PhoneUseRecord = {
  intent: string;
  plannedMinutes: number;
  previousActivity: string;
  mood: string;
  actualActivity: string;
  actualMinutes: number;
  createdAt: string;
};

export const intentLabels: Record<string, string> = {
  mesaj: 'Mesajlara bakmak',
  'sosyal-medya': 'Sosyal medyada gezinmek',
  okul: 'İş veya okul ile ilgili bir şeyi kontrol etmek',
  aliskanlik: 'Can sıkıntısı veya otomatik alışkanlık',
  diger: 'Diğer',
};

export function isPhoneUseRecord(value: unknown): value is PhoneUseRecord {
  if (!value || typeof value !== 'object') return false;

  const record = value as Partial<PhoneUseRecord>;

  return (
    typeof record.intent === 'string' &&
    typeof record.plannedMinutes === 'number' &&
    typeof record.previousActivity === 'string' &&
    typeof record.mood === 'string' &&
    typeof record.actualActivity === 'string' &&
    typeof record.actualMinutes === 'number' &&
    typeof record.createdAt === 'string'
  );
}
