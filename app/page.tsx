'use client';

import { useState, useEffect } from 'react';
import { Plus, Lightbulb, Search, Filter } from 'lucide-react';
import TopicCard from '@/components/TopicCard';
import TopicForm from '@/components/TopicForm';
import IdeaModal from '@/components/IdeaModal';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

interface Topic {
  _id: string;
  title: string;
  description: string;
  author: string;
  ideas: Idea[];
  createdAt: string;
}

interface Idea {
  _id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function Home() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  // Konuları yükle
  const fetchTopics = async (page = 1, search = '') => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search })
      });

      const response = await fetch(`/api/topics?${params}`);
      const data = await response.json();

      if (response.ok) {
        setTopics(data.topics);
        setPagination(data.pagination);
      } else {
        console.error('Error fetching topics:', data.error);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchTopics(1, query);
  };

  const handlePageChange = (newPage: number) => {
    fetchTopics(newPage, searchQuery);
  };

  const handleAddTopic = () => {
    setEditingTopic(null);
    setIsFormOpen(true);
  };

  const handleEditTopic = (topic: Topic) => {
    setEditingTopic(topic);
    setIsFormOpen(true);
  };

  const handleSaveTopic = async (topicData: Omit<Topic, '_id' | 'ideas' | 'createdAt'>) => {
    try {
      const url = editingTopic?._id ? `/api/topics/${editingTopic._id}` : '/api/topics';
      const method = editingTopic?._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(topicData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsFormOpen(false);
        setEditingTopic(null);
        fetchTopics(pagination.page, searchQuery);
      } else {
        alert(data.error || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error('Error saving topic:', error);
      alert('Konu kaydedilemedi');
    }
  };

  const handleDeleteTopic = async (id: string) => {
    if (!confirm('Bu konuyu ve tüm fikirleri silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/topics/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTopics(pagination.page, searchQuery);
      } else {
        const data = await response.json();
        alert(data.error || 'Konu silinemedi');
      }
    } catch (error) {
      console.error('Error deleting topic:', error);
      alert('Konu silinemedi');
    }
  };

  const handleShowIdeas = (topic: Topic) => {
    setSelectedTopic(topic);
    setIsIdeaModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">Beyin Fırtınası</h1>
                  <p className="text-sm text-gray-600">Fikirlerinizi paylaşın, tartışın, geliştirin</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleAddTopic}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Konu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Konu başlığı veya açıklama ile ara..."
              />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Lightbulb className="w-4 h-4" />
                <span>Toplam: {pagination.total} konu</span>
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
              <p className="text-gray-600">Konular yükleniyor...</p>
            </div>
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'Arama sonucu bulunamadı' : 'Henüz konu eklenmemiş'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? 'Farklı arama terimleri deneyin' 
                : 'İlk konuyu eklemek için yukarıdaki butona tıklayın'
              }
            </p>
            {!searchQuery && (
              <button
                onClick={handleAddTopic}
                className="btn-primary"
              >
                İlk Konuyu Ekle
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Topic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {topics.map((topic) => (
                <div key={topic._id} className="group">
                  <TopicCard
                    topic={topic}
                    onEdit={handleEditTopic}
                    onDelete={handleDeleteTopic}
                    onShowIdeas={handleShowIdeas}
                  />
                </div>
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
      <TopicForm
        topic={editingTopic}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTopic(null);
        }}
        onSave={handleSaveTopic}
      />

      <IdeaModal
        topic={selectedTopic}
        isOpen={isIdeaModalOpen}
        onClose={() => {
          setIsIdeaModalOpen(false);
          setSelectedTopic(null);
        }}
        onUpdate={() => fetchTopics(pagination.page, searchQuery)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
