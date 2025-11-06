'use client';

import Link from 'next/link';

export default function TopicCard({ topic }: { topic: any }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border">
      <h3 className="text-lg font-semibold mb-2 truncate">{topic.title}</h3>
      {topic.description && <p className="text-sm text-gray-600 mb-3 line-clamp-3">{topic.description}</p>}
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-gray-500">{new Date(topic.createdAt).toLocaleDateString()}</div>
        <Link href={`/topics/${topic._id}`} className="text-primary-600 hover:underline font-medium">Detay & Fikir Ekle →</Link>
      </div>
    </div>
  );
}
