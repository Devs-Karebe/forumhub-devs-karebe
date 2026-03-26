import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { RegisterFormData, registerSchema } from '@/schemas/registerSchema';
import { Separator } from '@radix-ui/react-separator';
import { authService } from '@/services/api/authService';

const Register = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await authService.register(data as { name: string; email: string; password: string });
      if (response.data.success) {
        localStorage.setItem('register_email', data.email);
        navigate('/login');
      } else {
        console.error('Erro no registro:', response.data.message);
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <>
      <Card className="shadow-card border-0">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-accent">
              <GraduationCap className="w-5 h-5 text-secondary-foreground" />
            </div>
            <span className="text-xl font-bold font-heading">Devs Karebe School</span>
          </div>

          <CardTitle className="text-2xl font-heading">Registrar</CardTitle>
          <CardDescription>
            Crie sua conta para começar a aprender
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : 'Registrar'}
            </Button>

            <Separator />
            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?
              <Button variant="link" onClick={() => navigate('/login')}>
                Faça login
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default Register;
