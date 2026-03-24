import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockCourses = [
  { id: '1', title: 'React Avançado', description: 'Domine hooks, context e patterns modernos.', level: 'advanced' as const, duration: '20h', enrolled: 342 },
  { id: '2', title: 'TypeScript Essencial', description: 'Tipagem segura do zero ao avançado.', level: 'intermediate' as const, duration: '15h', enrolled: 518 },
  { id: '3', title: 'Node.js & APIs', description: 'Construa APIs RESTful robustas.', level: 'intermediate' as const, duration: '18h', enrolled: 276 },
  { id: '4', title: 'Introdução ao Git', description: 'Controle de versão para iniciantes.', level: 'beginner' as const, duration: '6h', enrolled: 891 },
];

const levelLabel = { beginner: 'Iniciante', intermediate: 'Intermediário', advanced: 'Avançado' };
const levelVariant = { beginner: 'secondary' as const, intermediate: 'default' as const, advanced: 'destructive' as const };

const Courses = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Cursos" description="Explore nosso catálogo de cursos e comece a aprender." />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((c) => (
          <Card key={c.id} className="shadow-card border-0 flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant={levelVariant[c.level]}>{levelLabel[c.level]}</Badge>
              </div>
              <CardTitle className="text-lg font-heading mt-2">{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{c.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{c.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{c.enrolled}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate(`/courses/${c.id}`)}>
                Ver Curso
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Courses;
