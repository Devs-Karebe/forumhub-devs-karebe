import apiClient from '@/services/http/apiClient';

export const forumService = {
  getSubjects: () => apiClient.get('/forum/subjects'),
  getPosts: (subjectId: string) => apiClient.get(`/forum/subjects/${subjectId}/posts`),
  createPost: (data: { title: string; content: string; subjectId: string }) =>
    apiClient.post('/forum/posts', data),
};
