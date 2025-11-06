'use client';

import { useEffect, useState } from 'react';
import TopicCard from '@/components/TopicCard';
import TopicForm from '@/components/TopicForm';

export default function TopicsPage() {
  const [topics, setTopics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopics = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/topics');
      const data = await res.json();
      if (res.ok) setTopics(data.topics || []);
      else console.error(data);
    } catch (err) { console.error(err); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchTopics(); }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Beyin Fırtınası - Konular</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <TopicForm onCreated={fetchTopics} />
        </div>
        <div className="lg:col-span-2">
          {isLoading ? (
            <div>Yükleniyor...</div>
          ) : topics.length === 0 ? (
            <div>Henüz konu yok. İlk konuyu oluşturun.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map(t => <TopicCard key={t._id} topic={t} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
