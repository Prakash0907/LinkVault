import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-500" />
      </div>
      <input
        type="text"
        className="input-field pl-10"
        placeholder="Search by title, url, or description..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
