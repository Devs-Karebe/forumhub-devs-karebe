import apiClient from '@/services/http/apiClient';
import type { LoginFormData } from '@/schemas/loginSchema';

export const authService = {
  login: (data: LoginFormData) => apiClient.post('/auth/login', data),
  register: (data: { name: string; email: string; password: string }) =>
    apiClient.post('/auth/register', data),
  me: () => apiClient.get('/auth/me'),
};
