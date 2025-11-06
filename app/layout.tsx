import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Beyin Fırtınası',
  description: 'Beyin fırtınası konuları oluşturun ve fikirleri paylaşın',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Global header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">BF</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">Beyin Fırtınası</h1>
                    <p className="text-sm text-gray-500">Konu başlatın, fikir ekleyin, birlikte geliştirin</p>
                  </div>
                </div>

                <nav className="flex items-center space-x-4 text-sm">
                  <a href="/" className="text-gray-700 hover:text-primary-600">Ana Sayfa</a>
                  <a href="/topics" className="text-gray-700 hover:text-primary-600">Konular</a>
                  <a href="https://github.com/cihanisildar/btt/tree/beyin-firtinasi" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-700">Repo</a>
                </nav>
              </div>
            </div>
          </header>

          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
