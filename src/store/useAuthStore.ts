import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: any | null;
  activeProfile: any | null;
  setAuth: (token: string, user: any) => void;
  setProfile: (profile: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  activeProfile: JSON.parse(localStorage.getItem('activeProfile') || 'null'),
  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },
  setProfile: (profile) => {
    localStorage.setItem('activeProfile', JSON.stringify(profile));
    set({ activeProfile: profile });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('activeProfile');
    set({ token: null, user: null, activeProfile: null });
  },
}));
