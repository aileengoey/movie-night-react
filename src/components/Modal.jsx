import React from 'react';

function Modal({ movie, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start z-50 px-4 pt-10 overflow-y-auto">
      <div className="relative bg-gray-900 text-white rounded-lg max-w-lg w-full p-4 my-10 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-400 transition-colors duration-300"
          aria-label="Close"
          title="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-center mb-2">{movie.title}</h2>
        <p className="text-center text-sm text-gray-400 mb-4">
          ⭐ Rating: {movie.vote_average} / 10 | 📅 Release: {movie.release_date}
        </p>

        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://placehold.co/400x600?text=No+Image'
          }
          alt={movie.title}
          className="w-full rounded-lg object-contain mb-4 max-h-[75vh]"
        />

        <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">
          {movie.overview || 'No description available.'}
        </p>

        {/* Extra details if available */}
        {movie.original_language && (
          <p className="text-xs text-gray-500 mt-4 text-center">Language: {movie.original_language.toUpperCase()}</p>
        )}
        {movie.vote_count !== undefined && (
          <p className="text-xs text-gray-500 text-center">Total Votes: {movie.vote_count}</p>
        )}
      </div>
    </div>
  );
}

export default Modal;
