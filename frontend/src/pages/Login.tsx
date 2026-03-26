import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/schemas/loginSchema';
import { useAuthStore, parseJwt, getRedirectPath } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import { authService } from '@/services/api/authService';

const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const email = localStorage.getItem('register_email');
    if (email) {
      setValue('email', email);
      localStorage.removeItem('register_email');
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login(data as { email: string; password: string });
      if (response.data.success) {
        const { accessToken, name, email } = response.data.data;
        const payload = parseJwt(accessToken);
        if (payload) {
          const user = {
            id: payload.sub,
            name,
            email,
            roles: payload.roles,
          };
          setUser(user, accessToken);
          const redirectPath = getRedirectPath(payload.roles);
          navigate(redirectPath);
        } else {
          console.error('Token inválido');
        }
      } else {
        console.error('Erro no login:', response.data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
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

          <CardTitle className="text-2xl font-heading">Entrar</CardTitle>
          <CardDescription>Acesse sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>

            <Separator />
            <p className="text-center text-sm text-muted-foreground">
              Não tem uma conta?
              <Button variant="link" onClick={() => navigate('/register')}>
                Cadastre-se
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
