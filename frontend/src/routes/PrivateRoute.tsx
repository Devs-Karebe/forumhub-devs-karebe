import { Navigate } from 'react-router-dom';
import { useAuthStore, isAuthenticated } from '@/store/authStore';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
  roles?: string[];
}

const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const { user } = useAuthStore();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.some(role => user.roles.includes(role as any))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;