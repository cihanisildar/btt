'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div id="error-page" className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div id="error-container" className="max-w-md w-full text-center">
        <div id="error-content" className="mb-8">
          <div id="error-icon-container" className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle id="error-icon" className="w-8 h-8 text-red-600" />
          </div>
          <h2 id="error-title" className="text-2xl font-semibold text-gray-900 mb-2">
            Bir Hata Oluştu
          </h2>
          <p id="error-message" className="text-gray-600 mb-8">
            Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
          </p>
        </div>
        
        <div id="error-actions" className="space-y-4">
          <button
            id="error-retry-button"
            onClick={reset}
            className="btn-primary flex items-center justify-center space-x-2 w-full"
          >
            <RefreshCw id="error-retry-icon" className="w-4 h-4" />
            <span id="error-retry-text">Tekrar Dene</span>
          </button>
          
          <Link
            id="error-home-link"
            href="/"
            className="btn-secondary flex items-center justify-center space-x-2 w-full"
          >
            <Home id="error-home-icon" className="w-4 h-4" />
            <span id="error-home-text">Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
