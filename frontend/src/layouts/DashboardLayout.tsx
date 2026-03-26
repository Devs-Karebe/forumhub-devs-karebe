import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuthStore } from '@/store/authStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardLayout = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 flex items-center justify-between border-b bg-card px-4 lg:px-6">
            <SidebarTrigger />

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-semibold">
                  {user?.name?.charAt(0) ?? 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="animate-fade-in">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
