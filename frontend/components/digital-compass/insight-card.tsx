import type { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type InsightCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: 'primary' | 'secondary';
};

const tones = {
  primary: {
    border: 'border-t-primary',
    icon: 'bg-primary/10 text-primary',
  },
  secondary: {
    border: 'border-t-secondary-foreground',
    icon: 'bg-secondary text-secondary-foreground',
  },
};

export function InsightCard({
  title,
  description,
  icon: Icon,
  tone,
}: InsightCardProps) {
  const styles = tones[tone];

  return (
    <Card
      className={`border-0 border-t-4 bg-card py-0 shadow-[0_10px_28px_rgb(55_98_130/7%)] ring-1 ring-border ${styles.border}`}
    >
      <CardHeader className="flex flex-row items-center gap-3 px-6 pt-6">
        <span className={`flex size-10 items-center justify-center rounded-xl ${styles.icon}`}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <p className="text-base leading-7 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
