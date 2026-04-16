import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import { Play, Plus, ThumbsUp } from 'lucide-react';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await api.get(`/catalog/movies/${id}`);
        setMovie(data);
      } catch (err) {
        // Fallback for visual mock
        setMovie({
          id,
          title: 'Cinematic Mock Title',
          description: 'This is a beautifully mocked description of the movie when the backend database holds no records. Imagine a world where anything is possible.',
          release_year: 2024,
          duration_seconds: 6400,
        });
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div className="bg-[#0F0F12] h-screen text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-[#0F0F12] min-h-screen text-white font-sans">
      <Navbar />
      <div className="relative w-full h-[60vh]">
          <div className="absolute inset-0 bg-black">
            <img 
              src={movie.thumbnail_url || `https://picsum.photos/seed/${movie.id}/1920/1080?blur=4`} 
              alt={movie.title}
              className="w-full h-full object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] to-transparent"></div>
          
          <div className="absolute bottom-10 left-4 md:left-10 md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 uppercase">{movie.title}</h1>
            <div className="flex items-center gap-4 text-xs font-bold text-[#A1A1AA] mb-6">
              <span>{movie.release_year || new Date().getFullYear()}</span>
              {movie.duration_seconds && <span>{Math.floor(movie.duration_seconds / 60)} min</span>}
              <span className="border border-[#A1A1AA] px-1">HD</span>
            </div>
            
            <p className="text-[#A1A1AA] text-sm md:text-base mb-8 max-w-2xl leading-relaxed">
              {movie.description || 'No description available for this content.'}
            </p>

            <div className="flex items-center gap-4">
              <Link to={`/play/${movie.id}`} className="bg-white text-black px-8 py-3 rounded flex items-center gap-2 hover:bg-white/80 font-bold transition">
                <Play size={20} className="fill-black" /> Play
              </Link>
              <button className="bg-[#1A1A1F] border border-white/20 text-white p-3 rounded-full hover:border-white transition">
                <Plus size={20} />
              </button>
              <button className="bg-[#1A1A1F] border border-white/20 text-white p-3 rounded-full hover:border-white transition">
                <ThumbsUp size={20} />
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}
