import {
  ArrowUpRight,
  BookOpen,
  Brain,
  FileText,
  Plus,
  Smartphone,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

import { ActivityCard } from '@/components/digital-compass/activity-card';
import { MobileNav } from '@/components/digital-compass/mobile-nav';
import { SiteHeader } from '@/components/digital-compass/site-header';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const activities = [
  {
    title: 'Ders Çalışma',
    time: 'Bugün, 14:30',
    status: 'Başarılı',
    intended: '45 dk',
    actual: '50 dk',
    tone: 'success' as const,
    icon: BookOpen,
  },
  {
    title: 'Sosyal Medya',
    time: 'Bugün, 12:00',
    status: 'Aşıldı',
    intended: '15 dk',
    actual: '45 dk',
    tone: 'danger' as const,
    icon: Smartphone,
  },
  {
    title: 'Makale Okuma',
    time: 'Dün, 20:15',
    status: 'Kısmen',
    intended: '60 dk',
    actual: '30 dk',
    tone: 'neutral' as const,
    icon: FileText,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader activePage="Ana Sayfa" />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 pb-28 md:px-10 md:py-14 lg:px-14">
        <section className="max-w-3xl space-y-5" aria-labelledby="dashboard-title">
          <p className="text-sm font-semibold tracking-wide text-primary">
            Dijital alışkanlıklarına kısa bir bakış
          </p>
          <h1
            id="dashboard-title"
            className="text-3xl font-bold tracking-[-0.025em] text-accent-foreground sm:text-4xl"
          >
            Niyetinle gerçek kullanımın arasındaki farkı keşfet.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Dijital alışkanlıklarını fark et, odaklanmanı artır ve zamanını daha
            bilinçli yönet.
          </p>
          <Link
            href="/yeni-kayit"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-11 w-fit rounded-xl px-5 shadow-[0_10px_24px_rgb(53_96_127/18%)]',
            )}
          >
            <Plus data-icon="inline-start" />
            Yeni Kayıt Oluştur
          </Link>
        </section>

        <section
          className="grid gap-5 md:grid-cols-12"
          aria-label="Haftalık özet"
        >
          <Card className="border-0 bg-card py-0 shadow-[0_12px_32px_rgb(55_98_130/8%)] ring-1 ring-border md:col-span-4">
            <CardHeader className="px-6 pt-6">
              <CardDescription className="font-medium">
                Bu haftaki niyet dışı kullanım
              </CardDescription>
              <CardTitle className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-destructive">
                  2s 45d
                </span>
                <span className="text-sm font-normal text-muted-foreground">/ hafta</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-auto px-6 pb-6">
              <Progress
                aria-label="Haftalık niyet dışı kullanım oranı"
                value={35}
                className="[&_[data-slot=progress-indicator]]:bg-destructive [&_[data-slot=progress-track]]:h-2"
              />
              <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <TrendingUp className="size-3.5" aria-hidden="true" />
                Geçen haftaya göre %12 artış
              </p>
            </CardContent>
          </Card>

          <Card className="relative min-h-56 overflow-hidden border-0 bg-gradient-to-br from-[#dce8f1] via-[#edf5f7] to-[#f7fafd] py-0 shadow-[0_12px_32px_rgb(55_98_130/8%)] ring-1 ring-border md:col-span-8">
            <div className="absolute inset-0 compass-grid opacity-55" aria-hidden="true" />
            <CardContent className="relative flex h-full min-h-56 items-center justify-center p-8 text-center">
              <div className="max-w-lg">
                <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Brain className="size-7" aria-hidden="true" />
                </span>
                <CardTitle className="text-2xl font-semibold text-accent-foreground">
                  Odaklanma Puanın: İyi
                </CardTitle>
                <CardDescription className="mt-2 text-base leading-6">
                  Son 3 gün içinde niyetlerine %70 sadık kaldın.
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="son-aktiviteler" aria-labelledby="activities-title">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-primary">Kayıtların</p>
              <h2 id="activities-title" className="mt-1 text-2xl font-semibold tracking-tight">
                Son Aktiviteler
              </h2>
            </div>
            <Button variant="ghost" className="text-primary">
              Tümünü Gör
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <ActivityCard key={activity.title} {...activity} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-secondary/70 bg-secondary/35 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div className="flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <Brain className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-semibold text-secondary-foreground">Küçük bir hatırlatma</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary-foreground/80">
                Amaç kusursuz olmak değil; hangi anlarda niyetinden uzaklaştığını
                fark etmek.
              </p>
            </div>
          </div>
        </section>
      </main>

      <MobileNav activePage="Ana Sayfa" />
    </div>
  );
}
