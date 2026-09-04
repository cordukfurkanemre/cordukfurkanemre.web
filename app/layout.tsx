import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Furkan Emre Çördük | Yazılım Geliştirici',
  description: 'Furkan Emre Çördük’ün seçili dijital ürün ve yazılım çalışmaları.',
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
