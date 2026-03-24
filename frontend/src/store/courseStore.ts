import { create } from 'zustand';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  enrolledCount: number;
}

interface CourseState {
  courses: Course[];
  selectedCourse: Course | null;
  isLoading: boolean;
  setCourses: (courses: Course[]) => void;
  setSelectedCourse: (course: Course | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  selectedCourse: null,
  isLoading: false,
  setCourses: (courses) => set({ courses }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  setLoading: (isLoading) => set({ isLoading }),
}));
