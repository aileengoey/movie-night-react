// 🔥 MovieCard.jsx (Premium Polish)

import React from 'react';

function MovieCard({
  title,
  rating,
  year,
  poster,
  onFavorite,
  onWatched,
  dark,
  isFavorite,
  isWatched,
  onClick,
}) {
  return (
    <div
      className={`flex gap-4 p-4 mb-4 rounded-lg border shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 cursor-pointer ${
        dark ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'
      }`}
      onClick={onClick}
      tabIndex="0"
    >
      <img
        src={
          poster && typeof poster === 'string' && poster.trim() !== '' && poster !== 'null' && poster.startsWith('/')
            ? `https://image.tmdb.org/t/p/w200${poster}`
            : 'https://placehold.co/200x300?text=No+Image'
        }
        alt={title || 'Movie Poster'}
        className="rounded-lg w-32 sm:w-24 object-cover hover:scale-105 transition-transform duration-300 pointer-events-none"
      />

      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm mb-1">
          <span className="font-medium">⭐ Rating:</span> {rating} / 10
        </p>
        <p className="text-sm mb-2">
          <span className="font-medium">📅 Year:</span> {year}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
            className="hover:scale-110 transition-transform duration-200 focus:outline-none hover:text-red-400"
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isFavorite ? '#e74c3c' : dark ? '#fff' : '#aaa'}
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              className="transition-colors duration-300"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
                14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                11.54L12 21.35z" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onWatched();
            }}
            className="hover:scale-110 transition-transform duration-200 focus:outline-none hover:text-green-400"
            title={isWatched ? 'Remove from Watched' : 'Mark as Watched'}
            aria-label={isWatched ? 'Remove from Watched' : 'Mark as Watched'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isWatched ? '#27ae60' : dark ? '#fff' : '#aaa'}
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              className="transition-colors duration-300"
            >
              <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
