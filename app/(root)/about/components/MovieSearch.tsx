'use client';

import { useState } from 'react';
import { searchMovies } from '@/lib/omdb';

export default function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results.Search || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="px-3 py-2 border rounded"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie: any) => (
          <div key={movie.imdbID} className="border rounded p-4">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            {movie.Poster !== 'N/A' && (
              <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}