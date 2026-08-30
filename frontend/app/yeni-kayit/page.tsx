import { MobileNav } from '@/components/digital-compass/mobile-nav';
import { NewRecordForm } from '@/components/digital-compass/new-record-form';
import { SiteHeader } from '@/components/digital-compass/site-header';

export default function NewRecordPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader activePage="Yeni Kayıt" />

      <main className="mx-auto w-full max-w-6xl px-5 py-10 pb-28 md:px-10 md:py-14 lg:px-14">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-primary">Yeni farkındalık kaydı</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">
            Yeni Kayıt Oluştur
          </h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Kullanım niyetini ve gerçekleşen durumu yansıt; farkındalığını artır.
          </p>
        </div>

        <NewRecordForm />
      </main>

      <MobileNav activePage="Yeni Kayıt" />
    </div>
  );
}
