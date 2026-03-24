import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, MessageSquare, Trophy, Clock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const stats = [
  { label: 'Cursos Inscritos', value: '4', icon: BookOpen, color: 'gradient-primary' },
  { label: 'Tópicos no Fórum', value: '12', icon: MessageSquare, color: 'gradient-accent' },
  { label: 'Certificados', value: '2', icon: Trophy, color: 'gradient-warm' },
  { label: 'Horas Estudadas', value: '48h', icon: Clock, color: 'gradient-primary' },
];

const Dashboard = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <>
      <PageHeader
        title={`Olá, ${user?.name ?? 'Estudante'}!`}
        description="Acompanhe seu progresso e continue aprendendo."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
              <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${s.color}`}>
                <s.icon className="w-4 h-4 text-primary-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
