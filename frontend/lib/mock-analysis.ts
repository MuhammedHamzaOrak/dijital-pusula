export const mockAnalysis = {
  intention: 'Ders için araştırma yapmak',
  plannedMinutes: 10,
  actualMinutes: 38,
  unintendedMinutes: 28,
  pattern:
    'Ders sonrası telefon kullanımlarında sosyal medyaya geçiş tekrar ediyor.',
  possibleTrigger:
    'Uzun süre ders çalıştıktan sonra zihinsel dinlenme ve mola ihtiyacı.',
  behaviorExperiment:
    'Bir sonraki ders molanda önce 5 dakikalık ekransız mola vermeyi dene. Bu, zihninin doğal olarak dinlenmesine alan açabilir.',
} as const;
