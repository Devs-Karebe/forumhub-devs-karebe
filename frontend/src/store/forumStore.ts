import { create } from 'zustand';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  subjectId: string;
  createdAt: string;
  repliesCount: number;
}

export interface ForumSubject {
  id: string;
  name: string;
  description: string;
  postsCount: number;
}

interface ForumState {
  subjects: ForumSubject[];
  posts: ForumPost[];
  isLoading: boolean;
  setSubjects: (subjects: ForumSubject[]) => void;
  setPosts: (posts: ForumPost[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useForumStore = create<ForumState>((set) => ({
  subjects: [],
  posts: [],
  isLoading: false,
  setSubjects: (subjects) => set({ subjects }),
  setPosts: (posts) => set({ posts }),
  setLoading: (isLoading) => set({ isLoading }),
}));
