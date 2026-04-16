import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';

export default function MyList() {
  // Mock data since the backend doesn't explicitly have the full route wired up for "My List" GET yet
  const list = Array.from({length: 4}).map((_, i) => ({
    id: `mock-list-${i}`,
    title: `My Favorite Movie ${i + 1}`,
    thumbnail_url: `https://picsum.photos/seed/list-${i}/300/169`,
    duration_seconds: 5400
  }));

  return (
    <div className="bg-[#0F0F12] min-h-screen text-white font-sans">
      <Navbar />
      
      <div className="px-4 md:px-10 pt-24 pb-20">
        <h1 className="text-3xl font-bold mb-8">My List</h1>
        
        {list.length === 0 ? (
          <div className="text-[#A1A1AA]">You haven't added anything to your list yet.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {list.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
