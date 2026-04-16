/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Profiles from './pages/Profiles';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Player from './pages/Player';
import Search from './pages/Search';
import MyList from './pages/MyList';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/useAuthStore';

export default function App() {
  const { token, activeProfile } = useAuthStore();

  return (
    <BrowserRouter>
      <div className="bg-[#0F0F12] text-white font-sans min-h-screen w-full">
        <Routes>
          {/* Public Route */}
          <Route 
            path="/login" 
            element={
              token ? (activeProfile ? <Navigate to="/" /> : <Navigate to="/profiles" />) : <Auth />
            } 
          />

          {/* Profile Selection */}
          <Route 
            path="/profiles" 
            element={
              <ProtectedRoute requireProfile={false}>
                <Profiles />
              </ProtectedRoute>
            } 
          />

          {/* App Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/movie/:id" 
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/play/:id" 
            element={
              <ProtectedRoute>
                <Player />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/my-list" 
            element={
              <ProtectedRoute>
                <MyList />
              </ProtectedRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
