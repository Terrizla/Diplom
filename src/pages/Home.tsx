import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { api } from '../services/api';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [trending, setTrending] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any | null>(null);

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    try {
      const { data } = await api.get('/catalog/trending');
      setTrending(data);
      if (data.length > 0) {
        setFeatured(data[0]);
      }
    } catch (err) {
      console.error('Failed to load trending movies', err);
      // Fallback for visual testing if DB is empty
      const fakeData = Array.from({length: 10}).map((_, i) => ({
        id: `mock-${i}`,
        title: `Mock Movie ${i}`,
        description: 'A great movie entirely mocked up for the preview since the database returned empty.',
        duration_seconds: 7200
      }));
      setTrending(fakeData);
      setFeatured(fakeData[0]);
    }
  };

  return (
    <div className="bg-[#0F0F12] min-h-screen text-white font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      {featured && (
        <div className="relative w-full h-[70vh] md:h-[85vh]">
          <div className="absolute inset-0 bg-black">
            <img 
              src={featured.thumbnail_url || `https://picsum.photos/seed/${featured.id}/1920/1080?blur=2`} 
              alt={featured.title}
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Gradient over image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F12]/80 to-transparent"></div>

          <div className="absolute bottom-[20%] left-4 md:left-10 md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 uppercase tracking-tighter drop-shadow-lg">
              {featured.title}
            </h1>
            <p className="text-[#A1A1AA] text-sm md:text-base mb-6 line-clamp-3">
              {featured.description || 'Watch now exclusively on Flux Streaming. Enjoy this masterpiece today.'}
            </p>
            <div className="flex gap-4">
              <Link to={`/play/${featured.id}`} className="bg-white text-black px-6 py-2 rounded flex items-center gap-2 hover:bg-white/80 font-bold transition">
                <Play size={20} className="fill-black" /> Play
              </Link>
              <Link to={`/movie/${featured.id}`} className="bg-white/20 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-white/30 border border-white/30 font-bold transition">
                <Info size={20} /> More Info
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Rows */}
      <div className="px-4 md:px-10 pb-20 -mt-16 md:-mt-24 relative z-10 space-y-12">
        <section>
          <h2 className="text-xl font-bold mb-4">Trending Now</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {trending.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Because You Watched Similar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {trending.slice().reverse().map(movie => (
              <MovieCard key={`similar-${movie.id}`} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
