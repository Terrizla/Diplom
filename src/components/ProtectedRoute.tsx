import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function ProtectedRoute({ children, requireProfile = true }: { children: JSX.Element, requireProfile?: boolean }) {
  const { token, activeProfile } = useAuthStore();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireProfile && !activeProfile) {
    return <Navigate to="/profiles" replace />;
  }

  return children;
}
