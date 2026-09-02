'use client';

import type { SubmitEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, Brain, History } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { RECORD_STORAGE_KEY, type PhoneUseRecord } from '@/lib/record-data';

const moods = [
  { emoji: '😌', label: 'Calm' },
  { emoji: '🥱', label: 'Tired' },
  { emoji: '😟', label: 'Stressed' },
  { emoji: '😫', label: 'Overwhelmed' },
] as const;

export function NewRecordForm() {
  const router = useRouter();
  const [plannedTime, setPlannedTime] = useState(15);
  const [actualTime, setActualTime] = useState(30);
  const [mood, setMood] = useState<(typeof moods)[number]['label']>('Calm');

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const getTextValue = (name: string) => {
      const value = formData.get(name);
      return typeof value === 'string' ? value : '';
    };
    const record: PhoneUseRecord = {
      intent: getTextValue('intent'),
      plannedMinutes: plannedTime,
      previousActivity: getTextValue('previousActivity'),
      mood,
      actualActivity: getTextValue('actualActivity'),
      actualMinutes: actualTime,
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem(RECORD_STORAGE_KEY, JSON.stringify(record));
    router.push('/analiz');
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <Card className="border-0 bg-card/90 py-0 shadow-[0_12px_34px_rgb(55_98_130/8%)] ring-1 ring-border backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center gap-3 border-b border-border px-6 py-5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Brain className="size-5" aria-hidden="true" />
          </span>
          <div>
            <CardTitle className="text-xl font-semibold">Initial Intention</CardTitle>
            <p className="mt-0.5 text-sm text-muted-foreground">Your plan before opening your phone</p>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="intent">Why are you opening your phone?</FieldLabel>
              <NativeSelect id="intent" name="intent" required defaultValue="" className="w-full">
                <NativeSelectOption value="" disabled>
                  Select an option...
                </NativeSelectOption>
                <NativeSelectOption value="messages">Check messages</NativeSelectOption>
                <NativeSelectOption value="social-media">Browse social media</NativeSelectOption>
                <NativeSelectOption value="work-or-school">Check something related to work or school</NativeSelectOption>
                <NativeSelectOption value="habit">Boredom or an automatic habit</NativeSelectOption>
                <NativeSelectOption value="other">Other</NativeSelectOption>
              </NativeSelect>
            </Field>

            <Field>
              <div className="flex items-center justify-between gap-4">
                <FieldLabel htmlFor="planned-time">Planned usage time</FieldLabel>
                <output className="min-w-16 text-right text-sm font-semibold text-primary">
                  {plannedTime} min
                </output>
              </div>
              <Slider
                id="planned-time"
                aria-label="Planned usage time"
                min={1}
                max={60}
                step={1}
                value={[plannedTime]}
                onValueChange={(value) =>
                  setPlannedTime(Array.isArray(value) ? (value[0] ?? 15) : value)
                }
                className="py-2 [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-thumb]]:size-4"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="previous-activity">
                What were you doing before reaching for your phone?
              </FieldLabel>
              <Input
                id="previous-activity"
                name="previousActivity"
                placeholder="For example: I was studying or having a meal..."
                className="h-11 bg-muted/60 px-4"
                required
              />
            </Field>

            <Field>
              <FieldLabel>How were you feeling?</FieldLabel>
              <FieldDescription>Select the feeling closest to that moment.</FieldDescription>
              <div className="flex flex-wrap gap-3">
                {moods.map((item) => {
                  const selected = mood === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setMood(item.label)}
                      className={`flex min-w-20 flex-col items-center gap-1 rounded-xl border px-3 py-2 text-sm transition-all ${
                        selected
                          ? 'border-primary bg-primary/8 text-primary shadow-sm'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted'
                      }`}
                    >
                      <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="mood" value={mood} />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card className="border-0 bg-card/90 py-0 shadow-[0_12px_34px_rgb(55_98_130/8%)] ring-1 ring-border backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center gap-3 border-b border-border px-6 py-5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <History className="size-5" aria-hidden="true" />
          </span>
          <div>
            <CardTitle className="text-xl font-semibold">What Actually Happened</CardTitle>
            <p className="mt-0.5 text-sm text-muted-foreground">Your actual use after putting down the phone</p>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="actual-activity">What did you actually do?</FieldLabel>
              <Textarea
                id="actual-activity"
                name="actualActivity"
                placeholder="Instead of what I had planned..."
                className="min-h-28 resize-none bg-muted/60 px-4 py-3"
                required
              />
            </Field>

            <Field>
              <div className="flex items-center justify-between gap-4">
                <FieldLabel htmlFor="actual-time">Actual usage time</FieldLabel>
                <output className="min-w-16 text-right text-sm font-semibold text-secondary-foreground">
                  {actualTime} min
                </output>
              </div>
              <Slider
                id="actual-time"
                aria-label="Actual usage time"
                min={1}
                max={120}
                step={1}
                value={[actualTime]}
                onValueChange={(value) =>
                  setActualTime(Array.isArray(value) ? (value[0] ?? 30) : value)
                }
                className="py-2 [&_[data-slot=slider-range]]:bg-secondary-foreground [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-thumb]]:size-4"
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-1">
        <Button type="submit" size="lg" className="h-11 rounded-xl px-6 shadow-sm">
          <BarChart3 data-icon="inline-start" />
          Analyze
        </Button>
      </div>
    </form>
  );
}
