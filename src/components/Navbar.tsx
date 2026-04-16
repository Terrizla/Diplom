import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Search, Bell, Menu } from 'lucide-react';

export default function Navbar() {
  const { activeProfile, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed w-full z-50 top-0 bg-gradient-to-b from-[#0F0F12] to-transparent px-4 py-4 md:px-10 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#E11D48] uppercase">
            Flux
          </Link>
          <div className="hidden md:flex gap-4 text-sm text-[#A1A1AA]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/" className="hover:text-white transition-colors">Series</Link>
            <Link to="/" className="hover:text-white transition-colors">Movies</Link>
            <Link to="/my-list" className="hover:text-white transition-colors">My List</Link>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white">
          <button onClick={() => navigate('/search')} className="hover:text-[#E11D48] transition-colors">
            <Search size={20} />
          </button>
          <button className="hover:text-white text-[#A1A1AA] transition-colors hidden md:block">
            <Bell size={20} />
          </button>
          <div className="group relative flex items-center gap-2 cursor-pointer">
            <img 
              src={activeProfile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeProfile?.name || 'User'}`} 
              alt="Avatar" 
              className="w-8 h-8 rounded shrink-0 object-cover"
            />
            
            {/* Dropdown menu */}
            <div className="absolute right-0 top-full pt-4 hidden group-hover:block w-48">
              <div className="bg-[#1A1A1F] border border-white/10 rounded shadow-xl py-2 flex flex-col">
                <Link to="/profiles" className="px-4 py-2 hover:bg-white/5 text-sm">Switch Profiles</Link>
                <div className="h-px bg-white/10 my-1"></div>
                <button onClick={handleLogout} className="px-4 py-2 hover:bg-white/5 text-sm text-left">Sign Out of Flux</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
