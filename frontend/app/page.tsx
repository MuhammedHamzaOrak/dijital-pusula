import { Brain, Plus } from 'lucide-react';
import Link from 'next/link';

import { DashboardData } from '@/components/digital-compass/dashboard-data';
import { MobileNav } from '@/components/digital-compass/mobile-nav';
import { SiteHeader } from '@/components/digital-compass/site-header';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

        <DashboardData />

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
