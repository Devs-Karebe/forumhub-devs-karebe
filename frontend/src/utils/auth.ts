import type { Role } from '@/store/authStore';

export const parseJwt = (token: string): { sub: string; roles: Role[]; exp: number } | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const isAuthenticated = (token?: string): boolean => {
  const t = token || localStorage.getItem('token');
  if (!t) return false;
  const payload = parseJwt(t);
  if (!payload) return false;
  return payload.exp * 1000 > Date.now();
};

export const getUserRoles = (): Role[] => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return [];
  try {
    const user = JSON.parse(userStr);
    return user.roles || [];
  } catch {
    return [];
  }
};

export const getRedirectPath = (roles: Role[]): string => {
  return '/dashboard';
};