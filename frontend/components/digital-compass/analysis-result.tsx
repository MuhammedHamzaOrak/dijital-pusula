'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock3,
  Lightbulb,
  LoaderCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

import { InsightCard } from '@/components/digital-compass/insight-card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAnalysis } from '@/lib/mock-analysis';
import {
  intentLabels,
  isPhoneUseRecord,
  RECORD_STORAGE_KEY,
  type PhoneUseRecord,
} from '@/lib/record-data';
import { cn } from '@/lib/utils';

const exampleRecord: PhoneUseRecord = {
  intent: 'okul',
  plannedMinutes: mockAnalysis.plannedMinutes,
  previousActivity: 'Ders çalışıyordum',
  mood: 'Yorgun',
  actualActivity: 'Araştırmadan sonra sosyal medyada gezindim',
  actualMinutes: mockAnalysis.actualMinutes,
  createdAt: '',
};

export function AnalysisResult() {
  const [record, setRecord] = useState<PhoneUseRecord | null>(null);
  const [isExample, setIsExample] = useState(false);

  useEffect(() => {
    let storedRecord: PhoneUseRecord | null = null;

    try {
      const storedValue = sessionStorage.getItem(RECORD_STORAGE_KEY);
      const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : null;
      storedRecord = isPhoneUseRecord(parsedValue) ? parsedValue : null;
    } catch {
      storedRecord = null;
    }

    const timer = window.setTimeout(() => {
      setRecord(storedRecord ?? exampleRecord);
      setIsExample(!storedRecord);
    }, 650);

    return () => window.clearTimeout(timer);
  }, []);

  if (!record) {
    return (
      <div className="flex min-h-[55vh] flex-col items-center justify-center text-center" aria-live="polite">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <LoaderCircle className="size-7 animate-spin" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight">Kaydın analiz ediliyor</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Planladığın kullanım ile gerçekleşen durumu karşılaştırıyoruz.
        </p>
      </div>
    );
  }

  const intention = intentLabels[record.intent] ?? record.intent;
  const unintendedMinutes = Math.max(record.actualMinutes - record.plannedMinutes, 0);
  const plannedRatio = Math.min(
    Math.round((record.plannedMinutes / Math.max(record.actualMinutes, 1)) * 100),
    100,
  );

  return (
    <>
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold tracking-wide text-primary">Son kaydının özeti</p>
          {isExample && <Badge variant="outline">Örnek analiz</Badge>}
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
          Analiz Sonucu
        </h1>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Son oturumuna dair yansımalar ve farkındalıklar.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2" aria-label="Kullanım analizi kartları">
        <Card className="border-0 bg-card py-0 shadow-[0_12px_34px_rgb(55_98_130/8%)] ring-1 ring-border md:col-span-2">
          <CardHeader className="flex flex-row items-center gap-3 px-6 pt-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <RefreshCw className="size-5" aria-hidden="true" />
            </span>
            <div>
              <CardTitle className="text-xl font-semibold">Niyet vs. Gerçeklik</CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Planladığın süre ile gerçek kullanımın karşılaştırması
              </p>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-7">
            <Badge variant="outline" className="mb-6 h-auto max-w-full whitespace-normal px-3 py-2 text-sm">
              Niyet: {intention}
            </Badge>

            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="mb-3 flex items-end justify-between gap-4 text-sm">
                  <p className="text-muted-foreground">
                    Planlanan: <strong className="text-foreground">{record.plannedMinutes} dk</strong>
                  </p>
                  <p className="text-right text-muted-foreground">
                    Gerçek: <strong className="text-foreground">{record.actualMinutes} dk</strong>
                  </p>
                </div>
                <div
                  className="flex h-4 overflow-hidden rounded-full bg-muted"
                  role="img"
                  aria-label={`${record.plannedMinutes} dakika planlandı, ${record.actualMinutes} dakika kullanıldı`}
                >
                  <div className="h-full bg-primary" style={{ width: `${plannedRatio}%` }} />
                  <div
                    className="analysis-stripes h-full bg-secondary"
                    style={{ width: `${100 - plannedRatio}%` }}
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-primary" /> Planlanan süre
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-secondary" /> Niyet dışı kullanım
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-secondary/55 px-4 py-3 text-secondary-foreground">
                <Clock3 className="size-4" aria-hidden="true" />
                <span className="text-sm font-semibold">
                  {unintendedMinutes > 0
                    ? `+${unintendedMinutes} dk niyet dışı kullanım`
                    : 'Planlanan süre içinde kaldın'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-card py-0 shadow-[0_12px_34px_rgb(55_98_130/8%)] ring-1 ring-border md:col-span-2">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-lg font-semibold">Bu kayıtta neler vardı?</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 px-6 pb-6 sm:grid-cols-3">
            <div className="rounded-xl bg-muted/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Öncesinde</p>
              <p className="mt-1.5 text-sm leading-6">{record.previousActivity}</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Duygu</p>
              <p className="mt-1.5 text-sm leading-6">{record.mood}</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Gerçekte</p>
              <p className="mt-1.5 text-sm leading-6">{record.actualActivity}</p>
            </div>
          </CardContent>
        </Card>

        <InsightCard
          title="Tekrarlayan Örüntü"
          description={mockAnalysis.pattern}
          icon={RefreshCw}
          tone="primary"
        />
        <InsightCard
          title="Olası Tetikleyici"
          description={mockAnalysis.possibleTrigger}
          icon={Sparkles}
          tone="secondary"
        />

        <Card className="relative overflow-hidden border-0 bg-accent py-0 text-accent-foreground shadow-[0_12px_34px_rgb(55_98_130/9%)] ring-1 ring-primary/10 md:col-span-2">
          <div className="absolute -right-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
          <CardContent className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <Lightbulb className="size-6" aria-hidden="true" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-xl font-semibold">Küçük Davranış Deneyi</CardTitle>
                <Badge variant="outline" className="border-primary/20 bg-background/50">Demo yorum</Badge>
              </div>
              <p className="mt-2 text-base leading-7 text-accent-foreground/85 sm:text-lg">
                {mockAnalysis.behaviorExperiment}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 rounded-xl px-5')}
        >
          Dashboard’a Dön
        </Link>
        <Link
          href="/yeni-kayit"
          className={cn(buttonVariants({ size: 'lg' }), 'h-11 rounded-xl px-5')}
        >
          Yeni Kayıt Oluştur
          <ArrowRight data-icon="inline-end" />
        </Link>
      </div>
    </>
  );
}
