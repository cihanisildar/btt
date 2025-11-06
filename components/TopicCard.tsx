'use client';

import Link from 'next/link';

interface TopicCardProps {
  topic: {
    _id: string;
    title: string;
    description: string;
    author: string;
    ideas: any[];
    createdAt: string;
  };
  onEdit: (topic: any) => void;
  onDelete: (id: string) => void;
  onShowIdeas: (topic: any) => void;
}

export default function TopicCard({ topic, onEdit, onDelete, onShowIdeas }: TopicCardProps) {
  return (
    <div className="card group p-6 hover:bg-gradient-to-br hover:from-primary-50 hover:to-white">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {topic.title}
        </h3>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(topic)}
            className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(topic._id)}
            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{topic.description}</p>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-gray-500">
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{topic.author}</span>
          </div>
          <div className="text-gray-400">·</div>
          <div className="text-gray-500">{new Date(topic.createdAt).toLocaleDateString('tr-TR')}</div>
        </div>
        
        <button
          onClick={() => onShowIdeas(topic)}
          className="flex items-center space-x-1 text-primary-500 hover:text-primary-600 transition-colors"
        >
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="font-medium">{topic.ideas.length} Fikir</span>
        </button>
      </div>
    </div>
  );
}
