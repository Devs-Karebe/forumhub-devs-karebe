import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, MessageSquare, Settings } from 'lucide-react';

const stats = [
  { label: 'Total de Usuários', value: '150', icon: Users, color: 'gradient-primary' },
  { label: 'Cursos Ativos', value: '25', icon: BookOpen, color: 'gradient-accent' },
  { label: 'Tópicos no Fórum', value: '320', icon: MessageSquare, color: 'gradient-warm' },
  { label: 'Configurações', value: 'Admin', icon: Settings, color: 'gradient-primary' },
];

const AdminDashboard = () => {
  return (
    <>
      <PageHeader
        title="Painel Administrativo"
        description="Gerencie usuários, cursos e configurações do sistema."
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

export default AdminDashboard;