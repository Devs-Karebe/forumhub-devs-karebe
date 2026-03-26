import { create } from 'zustand';
import { parseJwt, isAuthenticated as checkAuth, getUserRoles, getRedirectPath } from '@/utils/auth';

export type Role = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },
  checkAuth: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        if (checkAuth(token)) {
          set({ user, token, isAuthenticated: true });
        } else {
          get().logout();
        }
      } catch {
        get().logout();
      }
    }
  },
}));

// Re-export utilities
export { parseJwt, checkAuth as isAuthenticated, getUserRoles, getRedirectPath };
