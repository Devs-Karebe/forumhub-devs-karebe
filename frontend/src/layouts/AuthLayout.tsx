import { Outlet } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const AuthLayout = () => (
  <div className="flex min-h-screen">
    {/* Left panel — branding */}
    <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">
      <div className="max-w-md text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-accent">
          <GraduationCap className="w-8 h-8 text-secondary-foreground" />
        </div>
        <h1 className="text-4xl font-bold font-heading text-primary-foreground">
          EduPlatform
        </h1>
        <p className="text-lg text-primary-foreground/70">
          Aprenda no seu ritmo. Conecte-se com outros estudantes. Evolua sua carreira.
        </p>
      </div>
    </div>

    {/* Right panel — form */}
    <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md animate-fade-in">
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthLayout;
