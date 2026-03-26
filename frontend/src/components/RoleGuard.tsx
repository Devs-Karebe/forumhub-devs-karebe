import { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';

interface RoleGuardProps {
  children: ReactNode;
  roles: string[];
}

const RoleGuard = ({ children, roles }: RoleGuardProps) => {
  const { user } = useAuthStore();

  if (!user || !roles.some(role => user.roles.includes(role as any))) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;