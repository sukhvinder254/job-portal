import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Search jobs... (e.g. React Developer, Data Analyst)"
        className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:border-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
      >
        Search
      </button>
    </form>
  );
}
