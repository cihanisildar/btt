'use client';

import { useState } from 'react';
import { User, Edit, Trash2, QrCode, Phone } from 'lucide-react';

interface Person {
  _id: string;
  tcKimlikNo: string;
  ad: string;
  soyad: string;
  kanGrubu: string;
  createdAt: string;
}

interface PersonCardProps {
  person: Person;
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
  onShowQR: (person: Person) => void;
}

export default function PersonCard({ person, onEdit, onDelete, onShowQR }: PersonCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const getBloodTypeClass = (kanGrubu: string) => {
    if (kanGrubu.startsWith('A')) return 'blood-type-A';
    if (kanGrubu.startsWith('B')) return 'blood-type-B';
    if (kanGrubu.startsWith('AB')) return 'blood-type-AB';
    return 'blood-type-0';
  };

  const handleDelete = async () => {
    if (window.confirm(`${person.ad} ${person.soyad} adlı kişiyi silmek istediğinizden emin misiniz?`)) {
      setIsDeleting(true);
      try {
        await onDelete(person._id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="card hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {person.ad} {person.soyad}
            </h3>
            <p className="text-sm text-gray-500">TC: {person.tcKimlikNo}</p>
          </div>
        </div>
        <span className={`blood-type-badge ${getBloodTypeClass(person.kanGrubu)}`}>
          {person.kanGrubu}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onShowQR(person)}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
        >
          <QrCode className="w-4 h-4" />
          <span>QR Kod</span>
        </button>
        
        <button
          onClick={() => onEdit(person)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span>Düzenle</span>
        </button>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium text-sm transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          <span>{isDeleting ? 'Siliniyor...' : 'Sil'}</span>
        </button>
      </div>
    </div>
  );
}
