import apiClient from '@/services/http/apiClient';

export const courseService = {
  getAll: () => apiClient.get('/courses'),
  getById: (id: string) => apiClient.get(`/courses/${id}`),
  enroll: (id: string) => apiClient.post(`/courses/${id}/enroll`),
};
