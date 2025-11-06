'use client';

import { useState, useEffect } from 'react';
import { Plus, Users, Search, Filter } from 'lucide-react';
import PersonCard from '@/components/PersonCard';
import PersonForm from '@/components/PersonForm';
import QRModal from '@/components/QRModal';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

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
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

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

  const handleSavePerson = async (personData: Person) => {
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

  const handleDeletePerson = async (id: string) => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Beyin Fırtınası</h1>
                <p className="text-sm text-gray-500">Konu başlatın, fikir ekleyin ve birlikte geliştirin</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <a href="/topics" className="btn-secondary">Konulara Git</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-gradient-to-r from-primary-50 to-white rounded-lg p-8 mb-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-2">Hoş geldiniz — Beyin Fırtınası</h2>
            <p className="text-gray-600 mb-4">İstediğiniz konuda bir konu başlatın, diğer kullanıcıların fikirlerini toplayın ve fikirleri birlikte geliştirin. Hemen konulara göz atmak için aşağıdaki butona tıklayın.</p>
            <a href="/topics" className="btn-primary">Konulara Git</a>
          </div>
        </section>

        <section>
  {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Ad, soyad veya TC kimlik no ile ara..."
              />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Toplam: {pagination.total} kişi</span>
              </div>
              <div className="flex items-center space-x-1">
                <Filter className="w-4 h-4" />
                <span>Sayfa: {pagination.page}/{pagination.pages}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Kişiler yükleniyor...</p>
            </div>
          </div>
        ) : persons.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'Arama sonucu bulunamadı' : 'Henüz kişi eklenmemiş'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? 'Farklı arama terimleri deneyin' 
                : 'İlk kişiyi eklemek için yukarıdaki butona tıklayın'
              }
            </p>
            {!searchQuery && (
              <button
                onClick={handleAddPerson}
                className="btn-primary"
              >
                İlk Kişiyi Ekle
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Person Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Önceki
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          pagination.page === page
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
