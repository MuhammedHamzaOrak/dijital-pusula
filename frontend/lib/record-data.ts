export const RECORD_STORAGE_KEY = 'digital-compass:last-record';

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
  messages: 'Check messages',
  'social-media': 'Browse social media',
  'work-or-school': 'Check something related to work or school',
  habit: 'Boredom or an automatic habit',
  other: 'Other',
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
