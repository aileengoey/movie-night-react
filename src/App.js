import { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Modal from './components/Modal';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [watched, setWatched] = useState(() => JSON.parse(localStorage.getItem('watched')) || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedTab, setSelectedTab] = useState('discover');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const apiKey = '8653055a7956020303dda2bcb003624a';

  // Fetch movies with optional filters
  const fetchMovies = (query = '', genre = '', rating = '', page = 1) => {
    let url = '';
    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
      if (genre) url += `&with_genres=${genre}`;
      if (rating) url += `&vote_average.gte=${rating}`;
    }

    setLoading(true);
    setError('');
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results) {
          setMovies(data.results);
        } else {
          setError('Failed to load movies. Please try again later.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load movies. Please try again later.');
        setLoading(false);
      });
  };

  // Fetch genres once
  const fetchGenres = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []))
      .catch(() => console.error('Failed to fetch genres'));
  };

  // 1) Fetch genres hanya sekali
 useEffect(() => {
   fetchGenres();
 }, []);

 // 2) Fetch movies tiap genre, rating, atau page berubah
 useEffect(() => {
   fetchMovies('', selectedGenre, selectedRating, currentPage);
 }, [selectedGenre, selectedRating, currentPage]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error('Please enter a movie title before searching.');
      return;
    }
    setCurrentPage(1);
    fetchMovies(searchTerm, selectedGenre, selectedRating, 1);
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.some((f) => f.id === movie.id);
    const updated = exists
      ? favorites.filter((f) => f.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    toast[exists ? 'error' : 'success'](
      exists ? 'Removed from Favorites' : 'Added to Favorites!'
    );
  };

  const toggleWatched = (movie) => {
    const exists = watched.some((w) => w.id === movie.id);
    const updated = exists
      ? watched.filter((w) => w.id !== movie.id)
      : [...watched, movie];
    setWatched(updated);
    localStorage.setItem('watched', JSON.stringify(updated));
    toast[exists ? 'error' : 'success'](
      exists ? 'Removed from Watched' : 'Marked as Watched!'
    );
  };

  const handleCardClick = (movie) => setSelectedMovie(movie);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: { background: '#2d3748', color: '#fff' },
          success: { iconTheme: { primary: '#3b82f6', secondary: '#fff' } },
        }}
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl mb-8 overflow-hidden h-64 md:h-72"
      >
        <img
          src="/avengers-banner-final.png"
          alt="Avengers Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Movie Night
          </h1>
          <p className="mt-2 text-lg drop-shadow-md">
            Discover movies, save favorites, and mark as watched!
          </p>
        </div>
      </motion.div>

      {/* Main Container */}
      <main className="flex-grow flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-6 border-b border-gray-600">
          {['discover', 'favorites', 'watched'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`pb-2 capitalize border-b-2 transition duration-300 text-lg font-medium ${
                selectedTab === tab
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent hover:border-gray-400 text-gray-400'
              }`}
            >
              {tab === 'discover'
                ? 'Discover'
                : tab === 'favorites'
                ? 'Favorites'
                : 'Watched'}
            </button>
          ))}
        </div>

        {/* Content */}
        {selectedTab === 'discover' && (
          <>  
            {/* Filters & Search */}
            <form
              onSubmit={handleSearch}
              className="mb-6 flex flex-wrap items-center gap-3 justify-center"
            >
              <input
                type="text"
                placeholder="Search for a movie title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-3 flex-1 min-w-[200px] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-800 text-white placeholder-gray-400"
              />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="p-3 rounded-lg bg-gray-800 text-white"
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="p-3 rounded-lg bg-gray-800 text-white"
              >
                <option value="">All Ratings</option>
                <option value="5">≥ 5</option>
                <option value="7">≥ 7</option>
              </select>
              <button
                type="submit"
                className="px-4 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
              >
                Search
              </button>
            </form>

            {/* Loading, Error, No Results */}
            {loading ? (
              <div className="flex justify-center my-10">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400" />
              </div>
            ) : error ? (
              <p className="text-center my-10 text-red-500 text-lg">{error}</p>
            ) : movies.length === 0 ? (
              <p className="text-center my-10 text-gray-400 text-lg">
                No movies found.
              </p>
            ) : (
              <>
                <div className="grid 
                   grid-cols-1 
                   sm:grid-cols-2 
                   md:grid-cols-3 
                   lg:grid-cols-4 
                   xl:grid-cols-6
                   2xl:grid-cols-7 
                   gap-6">

                  {movies.slice(0, 18).map((movie) => (
                    <MovieCard
                      key={movie.id}
                      title={movie.title}
                      rating={movie.vote_average}
                      year={movie.release_date?.slice(0, 4)}
                      poster={movie.poster_path}
                      dark
                      onFavorite={() => toggleFavorite(movie)}
                      isFavorite={favorites.some((f) => f.id === movie.id)}
                      onWatched={() => toggleWatched(movie)}
                      isWatched={watched.some((w) => w.id === movie.id)}
                      onClick={() => handleCardClick(movie)}
                    />
                  ))}
                </div>
                {/* Pagination */}
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="min-w-[100px] px-4 py-2 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600"
                  >
                    Previous
                  </button>
                  <span className="self-center">Page {currentPage}</span>
                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="min-w-[100px] px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* Favorites Tab */}
        {selectedTab === 'favorites' && (
          <>
            {favorites.length === 0 ? (
              <p className="text-center my-10 text-gray-400 text-lg">
                No favorite movies yet. Start adding some! 
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {favorites.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date?.slice(0, 4)}
                    poster={movie.poster_path}
                    dark
                    onFavorite={() => toggleFavorite(movie)}
                    isFavorite
                    onWatched={() => toggleWatched(movie)}
                    isWatched={watched.some((w) => w.id === movie.id)}
                    onClick={() => handleCardClick(movie)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Watched Tab */}
        {selectedTab === 'watched' && (
          <>
            {watched.length === 0 ? (
              <p className="text-center my-10 text-gray-400 text-lg">
                No watched movies yet. Mark some as watched! 
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {watched.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date?.slice(0, 4)}
                    poster={movie.poster_path}
                    dark
                    onFavorite={() => toggleFavorite(movie)}
                    isFavorite={favorites.some((f) => f.id === movie.id)}
                    onWatched={() => toggleWatched(movie)}
                    isWatched
                    onClick={() => handleCardClick(movie)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Modal Detail */}
        {selectedMovie && <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}  

      </div>

      {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-6">
          © 2025 Aileen Goey | Built with React &amp; Tailwind CSS | Powered by TMDB API
          <br />
          <a
            href="https://github.com/aileengoey/movie-night-react"
            className="underline hover:text-blue-400 mt-1 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
           View source on GitHub
         </a>
        </footer>

      </main>
    </div>
  );
}

export default App;
