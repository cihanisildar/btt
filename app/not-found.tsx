import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div id="not-found-page" className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div id="not-found-container" className="max-w-md w-full text-center">
        <div id="not-found-content" className="mb-8">
          <h1 id="not-found-code" className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 id="not-found-title" className="text-2xl font-semibold text-gray-900 mb-2">
            Sayfa Bulunamadı
          </h2>
          <p id="not-found-message" className="text-gray-600 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>
        
        <div id="not-found-actions" className="space-y-4">
          <Link
            id="not-found-home-link"
            href="/"
            className="btn-primary flex items-center justify-center space-x-2 w-full"
          >
            <Home id="not-found-home-icon" className="w-4 h-4" />
            <span id="not-found-home-text">Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
