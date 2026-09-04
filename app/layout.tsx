import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Furkan Emre Çördük | Yazılım Geliştirici',
  description: 'Emre’nin geliştirdiği projeler, Bave Software ve devam eden yazılım yolculuğu.',
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
