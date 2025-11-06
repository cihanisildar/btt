'use client';

import { useState } from 'react';

export default function IdeaForm({ topicId, onCreated }: { topicId: string; onCreated?: () => void }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return alert('Fikir içeriği gerekli');
    setIsSaving(true);
    try {
      const res = await fetch(`/api/topics/${topicId}/ideas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || 'Fikir oluşturulamadı');
      setAuthor('');
      setContent('');
      onCreated && onCreated();
    } catch (err) {
      console.error(err);
      alert('Hata oldu');
    } finally { setIsSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white border rounded">
      <div>
        <label className="block text-sm font-medium">İsim (opsiyonel)</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1 input" />
      </div>
      <div>
        <label className="block text-sm font-medium">Fikir</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 textarea" />
      </div>
      <div>
        <button type="submit" className="btn-primary" disabled={isSaving}>{isSaving ? 'Gönderiliyor...' : 'Fikri Ekle'}</button>
      </div>
    </form>
  );
}
