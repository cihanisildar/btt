'use client';

import Link from 'next/link';

export default function TopicCard({ topic }: { topic: any }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
      {topic.description && <p className="text-sm text-gray-600 mb-3">{topic.description}</p>}
      <div className="text-sm text-gray-500">Oluşturuldu: {new Date(topic.createdAt).toLocaleString()}</div>
      <div className="mt-3">
        <Link href={`/topics/${topic._id}`} className="text-primary-600 hover:underline">Detay & Fikir Ekle</Link>
      </div>
    </div>
  );
}
