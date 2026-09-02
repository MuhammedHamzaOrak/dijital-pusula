import type { LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ActivityCardProps = {
  title: string;
  time: string;
  status: string;
  intended: string;
  actual: string;
  tone: 'success' | 'danger' | 'neutral';
  icon: LucideIcon;
};

const toneStyles = {
  success: {
    icon: 'bg-secondary text-secondary-foreground',
    badge: 'bg-secondary/65 text-secondary-foreground',
    actual: 'text-primary',
  },
  danger: {
    icon: 'bg-destructive/10 text-destructive',
    badge: 'bg-destructive/10 text-destructive',
    actual: 'text-destructive',
  },
  neutral: {
    icon: 'bg-accent text-accent-foreground',
    badge: 'bg-muted text-muted-foreground',
    actual: 'text-foreground',
  },
};

export function ActivityCard({
  title,
  time,
  status,
  intended,
  actual,
  tone,
  icon: Icon,
}: ActivityCardProps) {
  const styles = toneStyles[tone];

  return (
    <Card className="gap-4 border-0 bg-card py-5 shadow-sm ring-1 ring-border transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgb(55_98_130/8%)]">
      <CardHeader className="grid grid-cols-[auto_1fr_auto] items-start gap-3 px-5">
        <span className={`flex size-10 items-center justify-center rounded-full ${styles.icon}`}>
          <Icon className="size-4.5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <CardTitle className="font-semibold">{title}</CardTitle>
          <p className="mt-0.5 text-xs text-muted-foreground">{time}</p>
        </div>
        <Badge className={styles.badge}>{status}</Badge>
      </CardHeader>
      <CardContent className="px-5">
        <dl className="grid grid-cols-2 gap-3 rounded-xl bg-muted/70 p-3 text-xs">
          <div>
            <dt className="text-muted-foreground">Intended</dt>
            <dd className="mt-1 font-semibold text-foreground">{intended}</dd>
          </div>
          <div className="text-right">
            <dt className="text-muted-foreground">Actual</dt>
            <dd className={`mt-1 font-semibold ${styles.actual}`}>{actual}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
