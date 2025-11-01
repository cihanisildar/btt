'use client';

import { useState } from 'react';
import { User, Edit, Trash2, QrCode } from 'lucide-react';

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
  onDelete: (person: Person) => void;
  onShowQR: (person: Person) => void;
}

export default function PersonCard({ person, onEdit, onDelete, onShowQR }: PersonCardProps) {
  const getBloodTypeClass = (kanGrubu: string) => {
    if (kanGrubu.startsWith('A')) return 'blood-type-A';
    if (kanGrubu.startsWith('B')) return 'blood-type-B';
    if (kanGrubu.startsWith('AB')) return 'blood-type-AB';
    return 'blood-type-0';
  };

  return (
    <div id={`person-card-${person._id}`} className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-red-100 hover:border-red-200">
      <div id={`person-card-header-${person._id}`} className="flex items-start justify-between mb-6">
        <div id={`person-card-info-${person._id}`} className="flex items-center space-x-4">
          <div id={`person-card-avatar-${person._id}`} className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
            <User id={`person-card-icon-${person._id}`} className="w-7 h-7 text-red-600" />
          </div>
          <div id={`person-card-details-${person._id}`}>
            <h3 id={`person-card-name-${person._id}`} className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
              {person.ad} {person.soyad}
            </h3>
            <p id={`person-card-tc-${person._id}`} className="text-sm text-gray-500 font-medium">TC: {person.tcKimlikNo}</p>
          </div>
        </div>
        <span id={`person-card-blood-type-${person._id}`} className={`blood-type-badge ${getBloodTypeClass(person.kanGrubu)}`}>
          {person.kanGrubu}
        </span>
      </div>

      <div id={`person-card-actions-${person._id}`} className="flex flex-wrap gap-3">
        <button
          id={`person-card-qr-button-${person._id}`}
          onClick={() => onShowQR(person)}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300"
        >
          <QrCode id={`person-card-qr-icon-${person._id}`} className="w-4 h-4" />
          <span id={`person-card-qr-text-${person._id}`}>QR Kod</span>
        </button>
        
        <button
          id={`person-card-edit-button-${person._id}`}
          onClick={() => onEdit(person)}
          className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300"
        >
          <Edit id={`person-card-edit-icon-${person._id}`} className="w-4 h-4" />
          <span id={`person-card-edit-text-${person._id}`}>Düzenle</span>
        </button>
        
        <button
          id={`person-card-delete-button-${person._id}`}
          onClick={() => onDelete(person)}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300"
        >
          <Trash2 id={`person-card-delete-icon-${person._id}`} className="w-4 h-4" />
          <span id={`person-card-delete-text-${person._id}`}>Sil</span>
        </button>
      </div>
    </div>
  );
}
