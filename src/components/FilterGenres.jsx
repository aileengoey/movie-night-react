import React from 'react';

export default function FilterGenres({ genres, selectedGenre, setSelectedGenre }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {genres.map(g => (
        <button
          key={g.id}
          onClick={() => setSelectedGenre(g.id === selectedGenre ? null : g.id)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedGenre === g.id ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
