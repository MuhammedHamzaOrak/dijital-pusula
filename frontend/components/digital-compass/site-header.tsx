import { Compass } from 'lucide-react';
import Link from 'next/link';

const navItems = ['Ana Sayfa', 'Yeni Kayıt', 'İçgörüler'] as const;
const navLinks = {
  'Ana Sayfa': '/',
  'Yeni Kayıt': '/yeni-kayit',
  İçgörüler: '/analiz',
} as const;

type SiteHeaderProps = {
  activePage: (typeof navItems)[number];
};

export function SiteHeader({ activePage }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/90 shadow-[0_4px_18px_rgb(55_98_130/5%)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-10 lg:px-14">
        <Link href="/" className="flex items-center gap-2.5 text-primary">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Compass className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight">Dijital Pusula</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Ana menü">
          {navItems.map((item) => {
            const active = item === activePage;
            return (
              <Link
                key={item}
                href={navLinks[item]}
                aria-current={active ? 'page' : undefined}
                className={`border-b-2 py-5 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-primary'
                }`}
              >
                {item}
              </Link>
            );
          })}
        </nav>

        <span
          className="hidden size-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground md:flex"
          aria-label="Dijital Pusula"
        >
          DP
        </span>
      </div>
    </header>
  );
}
