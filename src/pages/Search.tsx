import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { api } from '../services/api';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        performSearch();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/catalog/search?q=${encodeURIComponent(query)}`);
      setResults(data);
    } catch (err) {
      console.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0F0F12] min-h-screen text-white font-sans">
      <Navbar />
      
      <div className="px-4 md:px-10 pt-24 min-h-[50vh]">
        <div className="relative mb-8 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon className="text-[#A1A1AA]" size={24} />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#1A1A1F] border border-white/20 rounded pl-12 pr-4 py-4 text-xl text-white focus:outline-none focus:border-[#E11D48] transition-colors"
            placeholder="Search movies, tv shows..."
            autoFocus
          />
        </div>

        {loading && <div className="text-center text-[#A1A1AA] mt-10">Searching...</div>}
        
        {!loading && query && results.length === 0 && (
          <div className="text-center text-[#A1A1AA] mt-10">
            No results found for "{query}"
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {results.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
