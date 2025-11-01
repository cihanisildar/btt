'use client';

import { useState, useEffect } from 'react';
import { X, Save, User } from 'lucide-react';

interface Person {
  _id?: string;
  tcKimlikNo: string;
  ad: string;
  soyad: string;
  kanGrubu: string;
}

interface PersonFormProps {
  person?: Person | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (person: Person) => void;
}

const kanGruplari = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];

export default function PersonForm({ person, isOpen, onClose, onSave }: PersonFormProps) {
  const [formData, setFormData] = useState<Person>({
    tcKimlikNo: '',
    ad: '',
    soyad: '',
    kanGrubu: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (person) {
      setFormData(person);
    } else {
      setFormData({
        tcKimlikNo: '',
        ad: '',
        soyad: '',
        kanGrubu: ''
      });
    }
    setErrors({});
  }, [person, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.tcKimlikNo) {
      newErrors.tcKimlikNo = 'TC Kimlik No gereklidir';
    } else if (!/^[0-9]{11}$/.test(formData.tcKimlikNo)) {
      newErrors.tcKimlikNo = 'TC Kimlik No 11 haneli olmalıdır';
    }

    if (!formData.ad.trim()) {
      newErrors.ad = 'Ad gereklidir';
    } else if (formData.ad.trim().length < 2) {
      newErrors.ad = 'Ad en az 2 karakter olmalıdır';
    }

    if (!formData.soyad.trim()) {
      newErrors.soyad = 'Soyad gereklidir';
    } else if (formData.soyad.trim().length < 2) {
      newErrors.soyad = 'Soyad en az 2 karakter olmalıdır';
    }

    if (!formData.kanGrubu) {
      newErrors.kanGrubu = 'Kan grubu seçilmelidir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div id="person-form-overlay" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div id="person-form-modal" className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div id="person-form-header" className="flex items-center justify-between p-6 border-b border-gray-200">
          <div id="person-form-header-content" className="flex items-center space-x-3">
            <div id="person-form-icon-container" className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User id="person-form-icon" className="w-5 h-5 text-primary-600" />
            </div>
            <h2 id="person-form-title" className="text-xl font-semibold text-gray-900">
              {person ? 'Kişi Düzenle' : 'Yeni Kişi Ekle'}
            </h2>
          </div>
          <button
            id="person-form-close-button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X id="person-form-close-icon" className="w-6 h-6" />
          </button>
        </div>

        <form id="person-form" onSubmit={handleSubmit} className="p-6 space-y-4">
          <div id="person-form-tc-container">
            <label id="person-form-tc-label" htmlFor="tcKimlikNo" className="block text-sm font-medium text-gray-700 mb-1">
              TC Kimlik No *
            </label>
            <input
              type="text"
              id="tcKimlikNo"
              name="tcKimlikNo"
              value={formData.tcKimlikNo}
              onChange={handleChange}
              maxLength={11}
              className={`input-field ${errors.tcKimlikNo ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="11 haneli TC kimlik numarası"
            />
            {errors.tcKimlikNo && (
              <p id="person-form-tc-error" className="text-red-500 text-sm mt-1">{errors.tcKimlikNo}</p>
            )}
          </div>

          <div id="person-form-ad-container">
            <label id="person-form-ad-label" htmlFor="ad" className="block text-sm font-medium text-gray-700 mb-1">
              Ad *
            </label>
            <input
              type="text"
              id="ad"
              name="ad"
              value={formData.ad}
              onChange={handleChange}
              className={`input-field ${errors.ad ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Ad"
            />
            {errors.ad && (
              <p id="person-form-ad-error" className="text-red-500 text-sm mt-1">{errors.ad}</p>
            )}
          </div>

          <div id="person-form-soyad-container">
            <label id="person-form-soyad-label" htmlFor="soyad" className="block text-sm font-medium text-gray-700 mb-1">
              Soyad *
            </label>
            <input
              type="text"
              id="soyad"
              name="soyad"
              value={formData.soyad}
              onChange={handleChange}
              className={`input-field ${errors.soyad ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Soyad"
            />
            {errors.soyad && (
              <p id="person-form-soyad-error" className="text-red-500 text-sm mt-1">{errors.soyad}</p>
            )}
          </div>

          <div id="person-form-kan-grubu-container">
            <label id="person-form-kan-grubu-label" htmlFor="kanGrubu" className="block text-sm font-medium text-gray-700 mb-1">
              Kan Grubu *
            </label>
            <select
              id="kanGrubu"
              name="kanGrubu"
              value={formData.kanGrubu}
              onChange={handleChange}
              className={`input-field ${errors.kanGrubu ? 'border-red-500 focus:ring-red-500' : ''}`}
            >
              <option value="">Kan grubu seçin</option>
              {kanGruplari.map(kanGrubu => (
                <option key={kanGrubu} value={kanGrubu}>
                  {kanGrubu}
                </option>
              ))}
            </select>
            {errors.kanGrubu && (
              <p id="person-form-kan-grubu-error" className="text-red-500 text-sm mt-1">{errors.kanGrubu}</p>
            )}
          </div>

          <div id="person-form-actions" className="flex space-x-3 pt-4">
            <button
              id="person-form-cancel-button"
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              İptal
            </button>
            <button
              id="person-form-submit-button"
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Save id="person-form-submit-icon" className="w-4 h-4" />
              <span id="person-form-submit-text">{isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
