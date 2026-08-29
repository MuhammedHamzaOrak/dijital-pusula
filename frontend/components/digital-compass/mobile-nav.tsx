import { BarChart3, FilePlus2, Home } from 'lucide-react';
import Link from 'next/link';

const items = [
  { label: 'Ana Sayfa', icon: Home, href: '/' },
  { label: 'Yeni Kayıt', icon: FilePlus2, href: '/yeni-kayit' },
  { label: 'İçgörüler', icon: BarChart3, href: '/analiz' },
] as const;

type MobileNavProps = {
  activePage: (typeof items)[number]['label'];
};

export function MobileNav({ activePage }: MobileNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgb(55_98_130/8%)] backdrop-blur-xl md:hidden"
      aria-label="Mobil menü"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        {items.map(({ label, icon: Icon, href }) => {
          const active = label === activePage;
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-2 text-[11px] font-semibold transition-colors ${
                active
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
