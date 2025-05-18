import React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search movies…"
        className="flex-1 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-4 py-3 bg-primary rounded-lg hover:bg-primary/90 transition"
      >
        Search
      </button>
    </form>
  );
}
