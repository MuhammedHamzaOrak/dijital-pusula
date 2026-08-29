import { AnalysisResult } from '@/components/digital-compass/analysis-result';
import { MobileNav } from '@/components/digital-compass/mobile-nav';
import { SiteHeader } from '@/components/digital-compass/site-header';

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader activePage="İçgörüler" />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 pb-28 md:px-10 md:py-14 lg:px-14">
        <AnalysisResult />
      </main>

      <MobileNav activePage="İçgörüler" />
    </div>
  );
}
