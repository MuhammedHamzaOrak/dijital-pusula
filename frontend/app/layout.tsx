import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dijital Pusula',
  description:
    'Niyetinle gerçek telefon kullanımın arasındaki farkı görünür hâle getiren dijital iyi oluş aracı.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
