import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  thumbnail_url?: string;
  duration_seconds?: number;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const fallbackImg = `https://picsum.photos/seed/${movie.id}/300/169`;
  
  return (
    <div className="relative group w-full aspect-video rounded overflow-hidden bg-[#1A1A1F] cursor-pointer">
      <img 
        src={movie.thumbnail_url || fallbackImg} 
        alt={movie.title} 
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h4 className="text-white font-bold text-sm mb-2 line-clamp-1">{movie.title}</h4>
        <div className="flex items-center gap-2">
          <Link 
            to={`/play/${movie.id}`}
            className="flex items-center justify-center bg-white text-black p-1.5 rounded-full hover:bg-white/80 transition"
          >
            <Play size={14} className="fill-black" />
          </Link>
          <Link 
            to={`/movie/${movie.id}`}
            className="flex items-center justify-center bg-white/20 text-white p-1.5 rounded-full hover:bg-white/30 border border-white/30 transition"
          >
            <Info size={14} />
          </Link>
          {movie.duration_seconds && (
            <span className="text-[10px] text-[#A1A1AA] ml-auto">
              {Math.floor(movie.duration_seconds / 60)}m
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
