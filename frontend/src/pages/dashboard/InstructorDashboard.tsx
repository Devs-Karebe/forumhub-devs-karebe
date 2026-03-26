import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, MessageSquare, Trophy } from 'lucide-react';

const stats = [
  { label: 'Meus Cursos', value: '5', icon: BookOpen, color: 'gradient-primary' },
  { label: 'Alunos Inscritos', value: '120', icon: Users, color: 'gradient-accent' },
  { label: 'Discussões', value: '45', icon: MessageSquare, color: 'gradient-warm' },
  { label: 'Avaliações', value: '4.8', icon: Trophy, color: 'gradient-primary' },
];

const InstructorDashboard = () => {
  return (
    <>
      <PageHeader
        title="Painel do Instrutor"
        description="Gerencie seus cursos e interaja com alunos."
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

export default InstructorDashboard;