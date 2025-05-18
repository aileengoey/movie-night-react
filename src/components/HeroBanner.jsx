import React from 'react';

export default function HeroBanner() {
  return (
    <header className="relative h-60 sm:h-80 lg:h-96 overflow-hidden rounded-b-2xl mb-8">
      <img
        src="/avengers-banner-final.png"
        alt="Movie Night Hero"
        className="w-full h-full object-cover brightness-75 transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl sm:text-5xl font-extrabold drop-shadow-lg">Welcome to Movie Night</h1>
        <p className="mt-2 text-sm sm:text-lg drop-shadow-md">Discover your next favorite film</p>
      </div>
    </header>
  );
}
