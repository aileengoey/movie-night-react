import React from 'react';
import MovieCard from './MovieCard';

function FavoriteList({ favorites, isDarkMode, toggleFavorite }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3 mt-10 flex items-center gap-2">
        <span>❤️</span> My Favorite Movies
      </h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You haven’t added any favorites yet. Start exploring and tap the heart icon!</p>
      ) : (
        favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            year={movie.release_date?.slice(0, 4)}
            poster={movie.poster_path}
            dark={isDarkMode}
            onFavorite={() => toggleFavorite(movie)}
            isFavorite={true}
          />
        ))
      )}
    </div>
  );
}

export default FavoriteList;
