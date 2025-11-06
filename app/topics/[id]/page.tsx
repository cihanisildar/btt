'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import IdeaForm from '@/components/IdeaForm';

export default function TopicViewPage() {
  const params = useParams();
  const rawId = params?.id;
  const topicId = Array.isArray(rawId) ? rawId[0] : rawId || '';
  const [topic, setTopic] = useState<any | null>(null);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!topicId) return;
    setLoading(true);
    try {
      const tRes = await fetch(`/api/topics`);
      const tData = await tRes.json();
      const found = (tData.topics || []).find((x: any) => x._id === topicId);
      if (found) setTopic(found);

      const iRes = await fetch(`/api/topics/${topicId}/ideas`);
      const iData = await iRes.json();
      if (iRes.ok) setIdeas(iData.ideas || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [topicId]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {loading ? <div>Yükleniyor...</div> : (
        <>
          <h1 className="text-2xl font-bold mb-2">{topic?.title || 'Konu'}</h1>
          {topic?.description && <p className="mb-4 text-gray-600">{topic.description}</p>}

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Fikirler</h2>
            {ideas.length === 0 ? <div>Henüz fikir yok. İlk fikri ekleyin.</div> : (
              <div className="space-y-3">
                {ideas.map(i => (
                  <div key={i._id} className="p-3 bg-white border rounded">
                    <div className="text-sm text-gray-600 mb-1">{i.author || 'Anonim'} - {new Date(i.createdAt).toLocaleString()}</div>
                    <div>{i.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <IdeaForm topicId={topicId} onCreated={fetchData} />
        </>
      )}
    </div>
  );
}
