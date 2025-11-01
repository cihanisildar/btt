'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Kişi ara..." }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form id="search-form" onSubmit={handleSubmit} className="relative">
      <div id="search-input-wrapper" className="relative">
        <div id="search-icon-wrapper" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search id="search-icon" className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field pl-10 pr-10"
          placeholder={placeholder}
        />
        {query && (
          <button
            id="search-clear-button"
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X id="search-clear-icon" className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  );
}
