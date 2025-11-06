'use client';

import { useState } from 'react';

export default function TopicForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert('Başlık gerekli');
    setIsSaving(true);
    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || 'Konu oluşturulamadı');
      setTitle('');
      setDescription('');
      onCreated && onCreated();
    } catch (err) {
      console.error(err);
      alert('Hata oldu');
    } finally { setIsSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white border rounded">
      <div>
        <label className="block text-sm font-medium">Başlık</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 input" />
      </div>
      <div>
        <label className="block text-sm font-medium">Açıklama (opsiyonel)</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 textarea" />
      </div>
      <div>
        <button type="submit" className="btn-primary" disabled={isSaving}>{isSaving ? 'Oluşturuluyor...' : 'Konu Oluştur'}</button>
      </div>
    </form>
  );
}
