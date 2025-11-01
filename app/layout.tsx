import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kan Grubu Yönetim Sistemi',
  description: 'Kişilerin kan grubu verilerini tutan, sorgulayabilen ve QR kod ile gösterebilen uygulama',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html id="html-root" lang="tr">
      <body id="body-root" className={inter.className}>
        <div id="root-container" className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
