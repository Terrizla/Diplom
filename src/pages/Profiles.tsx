import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Profiles() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  
  const setProfile = useAuthStore((state) => state.setProfile);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const { data } = await api.get('/profiles');
      setProfiles(data);
    } catch (err) {
      console.error('Failed to load profiles');
    }
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    
    try {
      await api.post('/profiles', { name: newProfileName });
      setNewProfileName('');
      setIsCreating(false);
      loadProfiles();
    } catch (err) {
      console.error('Failed to create profile');
    }
  };

  const selectProfile = (profile: any) => {
    setProfile(profile);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-4xl font-bold mb-8">Who's watching?</h1>
      
      <div className="flex flex-wrap justify-center gap-6 mb-12 max-w-3xl">
        {profiles.map((p) => (
          <div key={p.id} className="flex flex-col items-center group cursor-pointer" onClick={() => selectProfile(p)}>
            <div className="w-32 h-32 rounded bg-[#1A1A1F] border-2 border-transparent group-hover:border-white flex items-center justify-center overflow-hidden mb-3 transition-colors">
              <img 
                src={p.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} 
                alt={p.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[#A1A1AA] group-hover:text-white transition-colors">{p.name}</span>
          </div>
        ))}

        {profiles.length < 5 && !isCreating && (
          <div className="flex flex-col items-center group cursor-pointer" onClick={() => setIsCreating(true)}>
             <div className="w-32 h-32 rounded bg-[#1A1A1F] border-2 border-transparent group-hover:border-white flex items-center justify-center mb-3 transition-colors">
               <span className="text-4xl text-[#A1A1AA] group-hover:text-white">+</span>
             </div>
             <span className="text-[#A1A1AA] group-hover:text-white transition-colors">Add Profile</span>
          </div>
        )}
      </div>

      {isCreating && (
        <form onSubmit={handleCreateProfile} className="bg-[#1A1A1F] p-6 rounded border border-white/10 w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Add Profile</h2>
          <input 
            type="text" 
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            placeholder="Name"
            className="w-full bg-[#0F0F12] border border-white/10 rounded p-2 text-white mb-4 focus:outline-none focus:border-[#E11D48]"
            autoFocus
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-[#E11D48] hover:bg-rose-700 text-white font-bold py-2 rounded">Save</button>
            <button type="button" onClick={() => setIsCreating(false)} className="flex-1 border border-white/10 hover:bg-white/10 text-white font-bold py-2 rounded">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
