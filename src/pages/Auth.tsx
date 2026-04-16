import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const { data } = await api.post('/auth/login', { email, password });
        setAuth(data.token, data.user);
        navigate('/profiles');
      } else {
        await api.post('/auth/register', { email, password });
        setIsLogin(true); // switch to login to complete the process
        setError('Registered successfully. Please log in.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] flex items-center justify-center p-4 text-white">
      <div className="bg-[#1A1A1F] p-8 rounded border border-white/10 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Sign In' : 'Register'}</h2>
        
        {error && (
          <div className="bg-[#E11D48]/20 border border-[#E11D48] text-[#E11D48] p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-[#A1A1AA] mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0F0F12] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-[#E11D48] transition-colors"
              required 
            />
          </div>
          <div>
            <label className="block text-xs uppercase text-[#A1A1AA] mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0F0F12] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-[#E11D48] transition-colors"
              required 
              minLength={6}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#E11D48] hover:bg-rose-700 text-white font-bold py-3 rounded transition-colors mt-2">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[#A1A1AA]">
          {isLogin ? "New to Flux?" : "Already have an account?"} 
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-white hover:text-[#E11D48] ml-2 font-bold transition-colors">
            {isLogin ? 'Sign up now.' : 'Sign in.'}
          </button>
        </p>
      </div>
    </div>
  );
}
