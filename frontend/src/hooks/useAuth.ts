import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const store = useAuthStore();
  return {
    ...store,
    isAuthenticated: store.isAuthenticated,
    user: store.user,
    token: store.token,
    login: store.setUser,
    logout: store.logout,
  };
};