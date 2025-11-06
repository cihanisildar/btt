import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Idea {
  _id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Topic {
  _id: string;
  title: string;
  ideas: Idea[];
}

interface IdeaModalProps {
  topic: Topic | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function IdeaModal({ topic, isOpen, onClose, onUpdate }: IdeaModalProps) {
  const [newIdea, setNewIdea] = useState({
    content: '',
    author: ''
  });
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    content: '',
    author: ''
  });

  useEffect(() => {
    if (topic) {
      setIdeas(topic.ideas);
    }
  }, [topic]);

  const validateForm = () => {
    const newErrors = {
      content: '',
      author: ''
    };

    if (!newIdea.content.trim()) {
      newErrors.content = 'Fikir gereklidir';
    }
    if (!newIdea.author.trim()) {
      newErrors.author = 'İsim gereklidir';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!topic) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/topics/${topic._id}/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIdea),
      });

      const data = await response.json();

      if (response.ok) {
        setNewIdea({ content: '', author: '' });
        setIdeas(prev => [...prev, data.idea]);
        onUpdate();
      } else {
        alert(data.error || 'Fikir eklenemedi');
      }
    } catch (error) {
      console.error('Error adding idea:', error);
      alert('Fikir eklenemedi');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !topic) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{topic.title}</h2>
            <p className="text-sm text-gray-500">Fikirlerinizi paylaşın</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {ideas.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Henüz fikir eklenmemiş. İlk fikri siz ekleyin!
            </div>
          ) : (
            <div className="space-y-4">
              {ideas.map((idea) => (
                <div key={idea._id} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 mb-2">{idea.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{idea.author}</span>
                    <span>{new Date(idea.createdAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="border-t p-4 space-y-4">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Fikriniz
            </label>
            <textarea
              id="content"
              value={newIdea.content}
              onChange={(e) => setNewIdea(prev => ({ ...prev, content: e.target.value }))}
              className="input-field w-full h-24 resize-none"
              placeholder="Fikrinizi paylaşın..."
              disabled={isSubmitting}
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              İsminiz
            </label>
            <input
              type="text"
              id="author"
              value={newIdea.author}
              onChange={(e) => setNewIdea(prev => ({ ...prev, author: e.target.value }))}
              className="input-field w-full"
              placeholder="İsminizi girin"
              disabled={isSubmitting}
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Ekleniyor...' : 'Fikir Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}