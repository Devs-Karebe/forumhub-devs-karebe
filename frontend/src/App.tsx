import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Forum from "@/pages/Forum";
import ForumSubject from "@/pages/ForumSubject";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import PrivateRoute from "@/routes/PrivateRoute";
import { useAuthStore } from "@/store/authStore";

const queryClient = new QueryClient();

const App = () => {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Authenticated */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
              <Route path="/courses/:courseId" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
              <Route path="/forum" element={<PrivateRoute><Forum /></PrivateRoute>} />
              <Route path="/forum/:subjectId" element={<PrivateRoute><ForumSubject /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Route>

            {/* Redirects & fallback */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/unauthorized" element={<div>Unauthorized</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
