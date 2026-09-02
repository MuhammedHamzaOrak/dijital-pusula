'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Brain, Plus, Smartphone, Target } from 'lucide-react';

import { ActivityCard } from '@/components/digital-compass/activity-card';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  intentLabels,
  isPhoneUseRecord,
  RECORD_STORAGE_KEY,
  type PhoneUseRecord,
} from '@/lib/record-data';
import { cn } from '@/lib/utils';

function getStoredRecord() {
  try {
    const storedValue = sessionStorage.getItem(RECORD_STORAGE_KEY);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : null;
    return isPhoneUseRecord(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

function formatRecordDate(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return 'Latest record';

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function DashboardData() {
  const [record, setRecord] = useState<PhoneUseRecord | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRecord(getStoredRecord());
      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <Card className="min-h-52 animate-pulse border-0 bg-card shadow-sm ring-1 ring-border">
        <CardContent className="flex min-h-52 items-center justify-center text-sm text-muted-foreground">
          Preparing your records...
        </CardContent>
      </Card>
    );
  }

  if (!record) {
    return (
      <Card className="border-0 bg-card py-0 shadow-[0_12px_32px_rgb(55_98_130/8%)] ring-1 ring-border">
        <CardContent className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Brain className="size-7" aria-hidden="true" />
          </span>
          <CardTitle className="mt-5 text-2xl font-semibold">You do not have any records yet</CardTitle>
          <CardDescription className="mt-2 max-w-md text-base leading-6">
            Start building awareness by recording your first intention and actual use.
          </CardDescription>
          <Link
            href="/yeni-kayit"
            className={cn(buttonVariants({ size: 'lg' }), 'mt-6 h-11 rounded-xl px-5')}
          >
            <Plus data-icon="inline-start" />
            Create Your First Record
          </Link>
        </CardContent>
      </Card>
    );
  }

  const intention = intentLabels[record.intent] ?? record.intent;
  const difference = record.actualMinutes - record.plannedMinutes;
  const adherence = Math.min(
    Math.round((record.plannedMinutes / Math.max(record.actualMinutes, 1)) * 100),
    100,
  );
  const stayedWithinPlan = difference <= 0;

  return (
    <>
      <section className="grid gap-5 md:grid-cols-12" aria-label="Latest record summary">
        <Card className="border-0 bg-card py-0 shadow-[0_12px_32px_rgb(55_98_130/8%)] ring-1 ring-border md:col-span-4">
          <CardHeader className="px-6 pt-6">
            <CardDescription className="font-medium">Time difference in your latest record</CardDescription>
            <CardTitle className="mt-2 flex items-baseline gap-2">
              <span className={`text-4xl font-bold tracking-tight ${stayedWithinPlan ? 'text-primary' : 'text-destructive'}`}>
                {stayedWithinPlan ? `${Math.abs(difference)} min` : `+${difference} min`}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-auto px-6 pb-6">
            <Progress
              aria-label={`${adherence} percent adherence to your intention`}
              value={adherence}
              className="[&_[data-slot=progress-indicator]]:bg-primary [&_[data-slot=progress-track]]:h-2"
            />
            <p className="mt-3 text-xs font-medium text-muted-foreground">
              {record.plannedMinutes} min planned, {record.actualMinutes} min actual.
            </p>
          </CardContent>
        </Card>

        <Card className="relative min-h-56 overflow-hidden border-0 bg-gradient-to-br from-[#dce8f1] via-[#edf5f7] to-[#f7fafd] py-0 shadow-[0_12px_32px_rgb(55_98_130/8%)] ring-1 ring-border md:col-span-8">
          <div className="absolute inset-0 compass-grid opacity-55" aria-hidden="true" />
          <CardContent className="relative flex h-full min-h-56 items-center justify-center p-8 text-center">
            <div className="max-w-lg">
              <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Target className="size-7" aria-hidden="true" />
              </span>
              <CardTitle className="text-2xl font-semibold text-accent-foreground">
                You stayed {adherence}% aligned with your intention
              </CardTitle>
              <CardDescription className="mt-2 text-base leading-6">
                {intention} · You were feeling {record.mood.toLocaleLowerCase('en-US')} at that moment.
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="recent-activities" aria-labelledby="activities-title">
        <div className="mb-5">
          <p className="text-sm font-medium text-primary">Your records</p>
          <h2 id="activities-title" className="mt-1 text-2xl font-semibold tracking-tight">
            Latest Activity
          </h2>
        </div>

        <div className="max-w-md">
          <ActivityCard
            title={intention}
            time={formatRecordDate(record.createdAt)}
            status={stayedWithinPlan ? 'Within plan' : 'Exceeded'}
            intended={`${record.plannedMinutes} min`}
            actual={`${record.actualMinutes} min`}
            tone={stayedWithinPlan ? 'success' : 'danger'}
            icon={Smartphone}
          />
        </div>
      </section>
    </>
  );
}
