'use client';

import { useState, useEffect } from 'react';
import { X, Download, RefreshCw } from 'lucide-react';

interface Person {
  _id: string;
  tcKimlikNo: string;
  ad: string;
  soyad: string;
  kanGrubu: string;
}

interface QRModalProps {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QRModal({ person, isOpen, onClose }: QRModalProps) {
  const [qrCode, setQrCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen && person) {
      generateQRCode();
    }
  }, [isOpen, person]);

  const generateQRCode = async () => {
    if (!person) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/persons/${person._id}/qr`);
      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCode);
      } else {
        setError(data.error || 'QR kod oluşturulamadı');
      }
    } catch (error) {
      setError('QR kod oluşturulurken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQR = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `${person?.ad}_${person?.soyad}_QR.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen || !person) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            QR Kod - {person.ad} {person.soyad}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-primary-600 animate-spin mb-4" />
              <p className="text-gray-600">QR kod oluşturuluyor...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <X className="w-12 h-12 mx-auto mb-2" />
                <p className="text-lg font-medium">Hata</p>
              </div>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={generateQRCode}
                className="btn-primary"
              >
                Tekrar Dene
              </button>
            </div>
          ) : qrCode ? (
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block mb-4">
                <img
                  src={qrCode}
                  alt={`${person.ad} ${person.soyad} QR Kodu`}
                  className="w-64 h-64"
                />
              </div>
              
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p><strong>Ad Soyad:</strong> {person.ad} {person.soyad}</p>
                  <p><strong>TC Kimlik No:</strong> {person.tcKimlikNo}</p>
                  <p><strong>Kan Grubu:</strong> {person.kanGrubu}</p>
                </div>
                
                <button
                  onClick={downloadQR}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>QR Kodu İndir</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
