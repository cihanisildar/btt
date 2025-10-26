'use client';

import { useState, useEffect } from 'react';
import { Plus, Users, Search, Filter } from 'lucide-react';
import PersonCard from '@/components/PersonCard';
import PersonForm from '@/components/PersonForm';
import QRModal from '@/components/QRModal';
import DeleteDialog from '@/components/DeleteDialog';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

// Disable static generation for this page since it uses client-side features
export const dynamic = 'force-dynamic';

interface Person {
  _id: string;
  tcKimlikNo: string;
  ad: string;
  soyad: string;
  kanGrubu: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function Home() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [deletingPerson, setDeletingPerson] = useState<Person | null>(null);

  // Kişileri yükle
  const fetchPersons = async (page = 1, search = '') => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search })
      });

      const response = await fetch(`/api/persons?${params}`);
      const data = await response.json();

      if (response.ok) {
        setPersons(data.persons);
        setPagination(data.pagination);
      } else {
        console.error('Error fetching persons:', data.error);
      }
    } catch (error) {
      console.error('Error fetching persons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchPersons(1, query);
  };

  const handlePageChange = (newPage: number) => {
    fetchPersons(newPage, searchQuery);
  };

  const handleAddPerson = () => {
    setEditingPerson(null);
    setIsFormOpen(true);
  };

  const handleEditPerson = (person: Person) => {
    setEditingPerson(person);
    setIsFormOpen(true);
  };

  const handleSavePerson = async (personData: { _id?: string; tcKimlikNo: string; ad: string; soyad: string; kanGrubu: string }) => {
    try {
      const url = personData._id ? `/api/persons/${personData._id}` : '/api/persons';
      const method = personData._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsFormOpen(false);
        setEditingPerson(null);
        fetchPersons(pagination.page, searchQuery);
      } else {
        alert(data.error || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error('Error saving person:', error);
      alert('Kişi kaydedilemedi');
    }
  };

  const handleDeletePerson = (person: Person) => {
    setDeletingPerson(person);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/persons/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPersons(pagination.page, searchQuery);
      } else {
        const data = await response.json();
        alert(data.error || 'Kişi silinemedi');
      }
    } catch (error) {
      console.error('Error deleting person:', error);
      alert('Kişi silinemedi');
    }
  };

  const handleShowQR = (person: Person) => {
    setSelectedPerson(person);
    setIsQRModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Kan Grubu Yönetim Sistemi</h1>
                <p className="text-red-100 text-sm font-medium">Kişi verilerini yönetin ve QR kod oluşturun</p>
              </div>
            </div>
            <button
              onClick={handleAddPerson}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Yeni Kişi</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-red-100 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pagination.total}</h3>
                <p className="text-gray-600 font-medium">Toplam Kişi</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pagination.pages}</h3>
                <p className="text-gray-600 font-medium">Toplam Sayfa</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pagination.page}</h3>
                <p className="text-gray-600 font-medium">Mevcut Sayfa</p>
              </div>
            </div>
          </div>

          {/* Search and Stats */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="Ad, soyad veya TC kimlik no ile ara..."
                />
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-red-100">
                  <Users className="w-4 h-4 text-red-600" />
                  <span className="font-medium">Toplam: {pagination.total} kişi</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-red-100">
                  <Filter className="w-4 h-4 text-red-600" />
                  <span className="font-medium">Sayfa: {pagination.page}/{pagination.pages}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-red-200 rounded-full animate-spin"></div>
                <div className="w-20 h-20 border-4 border-transparent border-t-red-600 rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
              <p className="text-gray-600 font-medium mt-6 text-lg">Kişiler yükleniyor...</p>
            </div>
          </div>
        ) : persons.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchQuery ? 'Arama sonucu bulunamadı' : 'Henüz kişi eklenmemiş'}
            </h3>
            <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto">
              {searchQuery 
                ? 'Farklı arama terimleri deneyin' 
                : 'İlk kişiyi eklemek için yukarıdaki butona tıklayın'
              }
            </p>
            {!searchQuery && (
              <button
                onClick={handleAddPerson}
                className="btn-primary text-lg px-8 py-4"
              >
                İlk Kişiyi Ekle
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Person Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {persons.map((person) => (
                <PersonCard
                  key={person._id}
                  person={person}
                  onEdit={handleEditPerson}
                  onDelete={handleDeletePerson}
                  onShowQR={handleShowQR}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Önceki
                </button>
                
                <div className="flex items-center space-x-2">
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                          pagination.page === page
                            ? 'bg-red-600 text-white'
                            : 'text-gray-600 hover:bg-red-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sonraki
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <PersonForm
        person={editingPerson}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPerson(null);
        }}
        onSave={handleSavePerson}
      />

      <QRModal
        person={selectedPerson}
        isOpen={isQRModalOpen}
        onClose={() => {
          setIsQRModalOpen(false);
          setSelectedPerson(null);
        }}
      />

      <DeleteDialog
        person={deletingPerson}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeletingPerson(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
