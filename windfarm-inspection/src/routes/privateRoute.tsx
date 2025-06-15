import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/contexts/authContext';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/home" replace />;

  return children;
};
