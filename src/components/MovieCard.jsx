import React from 'react';
import { HeartIcon as HeartOutline, CheckIcon as CheckOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, CheckIcon as CheckSolid, StarIcon, CalendarIcon } from '@heroicons/react/24/solid';
export default function MovieCard({
  title,
  rating,
  year,
  poster,
  onFavorite,
  isFavorite,
  onWatched,
  isWatched,
  onClick
}) {
  const imgSrc = poster
    ? `https://image.tmdb.org/t/p/w500${poster}`
    : '/no-image-placeholder.png';

  return (
    <div
     onClick={onClick}
     tabIndex={0}
     className="
        bg-gray-800 rounded-2xl shadow-md
        hover:shadow-lg hover:scale-105
        transform transition duration-300
        overflow-hidden w-full max-w-[200px] flex flex-col
      "
    >

      {/* Poster */}
      <div className="aspect-w-2 aspect-h-3 w-full min-h-[240px] overflow-hidden rounded-t-2xl">
        <img
          src={imgSrc}
          alt={title}
          className="object-cover object-top w-full h-full min-h-full pointer-events-none"
        />
      </div>

      {/* Text content */}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-base font-semibold truncate whitespace-nowrap overflow-hidden mb-1 min-h-[1.5rem]">
          {title}
        </h3>

        <p className="text-xs text-gray-300 mb-1 flex items-center">
          <StarIcon className="w-4 h-4 inline-block mr-1 text-yellow-400" />
          {rating.toFixed(1)} / 10
        </p>
        <p className="text-xs text-gray-300 mb-auto flex items-center">
          <CalendarIcon className="w-4 h-4 inline-block mr-1 text-blue-400" />
          {year}
        </p>
      </div>

      {/* Footer icons */}
      <div className="flex justify-center items-center gap-4 py-2 border-t border-gray-700">
        <button
          onClick={e => { e.stopPropagation(); onFavorite(); }}
          className="p-1 rounded-full hover:bg-gray-700 transition"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite
     ? <HeartSolid className="w-4 h-4 text-red-500" />
     : <HeartOutline className="w-4 h-4" />}       </button>
        <button
          onClick={e => { e.stopPropagation(); onWatched(); }}
          className="p-1 rounded-full hover:bg-gray-700 transition"
          title={isWatched ? 'Remove from watched' : 'Mark as watched'}
        >
          {isWatched
   ? <CheckSolid className="w-4 h-4 text-green-400" />
   : <CheckOutline className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
