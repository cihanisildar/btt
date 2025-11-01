'use client';

import { useState } from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

interface Person {
  _id: string;
  tcKimlikNo: string;
  ad: string;
  soyad: string;
  kanGrubu: string;
  createdAt: string;
}

interface DeleteDialogProps {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export default function DeleteDialog({ person, isOpen, onClose, onConfirm }: DeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !person) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(person._id);
      onClose();
    } catch (error) {
      console.error('Error deleting person:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div id="delete-dialog-overlay" className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div id="delete-dialog" className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-red-100">
        {/* Header */}
        <div id="delete-dialog-header" className="flex items-center justify-between p-6 border-b border-red-100">
          <div id="delete-dialog-header-content" className="flex items-center space-x-3">
            <div id="delete-dialog-icon-container" className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle id="delete-dialog-icon" className="w-5 h-5 text-red-600" />
            </div>
            <h3 id="delete-dialog-title" className="text-lg font-bold text-gray-900">Kişiyi Sil</h3>
          </div>
          <button
            id="delete-dialog-close-button"
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            <X id="delete-dialog-close-icon" className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div id="delete-dialog-content" className="p-6">
          <div id="delete-dialog-warning-container" className="mb-6">
            <p id="delete-dialog-confirmation-message" className="text-gray-600 mb-4">
              <span id="delete-dialog-person-name" className="font-semibold text-gray-900">{person.ad} {person.soyad}</span> adlı kişiyi silmek istediğinizden emin misiniz?
            </p>
            
            <div id="delete-dialog-warning-box" className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div id="delete-dialog-warning-content" className="flex items-start space-x-3">
                <AlertTriangle id="delete-dialog-warning-icon" className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div id="delete-dialog-warning-text">
                  <h4 id="delete-dialog-warning-title" className="font-semibold text-red-800 mb-1">Bu işlem geri alınamaz!</h4>
                  <p id="delete-dialog-warning-message" className="text-sm text-red-700">
                    Kişinin tüm bilgileri ve QR kodları kalıcı olarak silinecektir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Person Info */}
          <div id="delete-dialog-person-info" className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 id="delete-dialog-person-info-title" className="font-semibold text-gray-900 mb-3">Silinecek Kişi Bilgileri:</h4>
            <div id="delete-dialog-person-info-list" className="space-y-2 text-sm">
              <div id="delete-dialog-person-info-name" className="flex justify-between">
                <span id="delete-dialog-person-info-name-label" className="text-gray-600">Ad Soyad:</span>
                <span id="delete-dialog-person-info-name-value" className="font-medium text-gray-900">{person.ad} {person.soyad}</span>
              </div>
              <div id="delete-dialog-person-info-tc" className="flex justify-between">
                <span id="delete-dialog-person-info-tc-label" className="text-gray-600">TC Kimlik No:</span>
                <span id="delete-dialog-person-info-tc-value" className="font-medium text-gray-900">{person.tcKimlikNo}</span>
              </div>
              <div id="delete-dialog-person-info-blood" className="flex justify-between">
                <span id="delete-dialog-person-info-blood-label" className="text-gray-600">Kan Grubu:</span>
                <span id="delete-dialog-person-info-blood-value" className={`px-2 py-1 rounded-lg text-xs font-bold ${
                  person.kanGrubu.startsWith('A') ? 'bg-red-100 text-red-800' :
                  person.kanGrubu.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                  person.kanGrubu.startsWith('AB') ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {person.kanGrubu}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div id="delete-dialog-actions" className="flex space-x-3">
            <button
              id="delete-dialog-cancel-button"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              İptal
            </button>
            <button
              id="delete-dialog-confirm-button"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isDeleting ? (
                <>
                  <div id="delete-dialog-loading-spinner" className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span id="delete-dialog-loading-text">Siliniyor...</span>
                </>
              ) : (
                <>
                  <Trash2 id="delete-dialog-confirm-icon" className="w-4 h-4" />
                  <span id="delete-dialog-confirm-text">Sil</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
