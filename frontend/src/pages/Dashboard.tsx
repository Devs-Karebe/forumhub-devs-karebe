import { useAuthStore } from '@/store/authStore';
import AdminDashboard from './dashboard/AdminDashboard';
import InstructorDashboard from './dashboard/InstructorDashboard';
import StudentDashboard from './dashboard/StudentDashboard';

const Dashboard = () => {
  const { user } = useAuthStore();

  console.log('User in Dashboard:', user);

  if (!user) return null;

  if (user.roles.includes('ADMIN')) {
    return <AdminDashboard />;
  } else if (user.roles.includes('INSTRUCTOR')) {
    return <InstructorDashboard />;
  } else if (user.roles.includes('STUDENT')) {
    return <StudentDashboard />;
  }

  // Fallback
  return <StudentDashboard />;
};

export default Dashboard;
