import { useParams } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, Clock, Users } from 'lucide-react';

const CourseDetail = () => {
  const { courseId } = useParams();

  return (
    <>
      <PageHeader title="React Avançado" description="Domine hooks, context e patterns modernos." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card border-0">
            <CardContent className="p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Sobre o Curso</h2>
              <p className="text-muted-foreground leading-relaxed">
                Neste curso você vai aprender os conceitos avançados do React, incluindo Custom Hooks,
                Context API, performance com useMemo e useCallback, Server Components e muito mais.
                Curso #{courseId}.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardContent className="p-6 space-y-3">
              <h2 className="text-xl font-heading font-bold mb-4">Módulos</h2>
              {['Custom Hooks', 'Context & State', 'Performance', 'Patterns'].map((m, i) => (
                <div key={m} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <PlayCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Módulo {i + 1}: {m}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-card border-0 sticky top-6">
            <CardContent className="p-6 space-y-4">
              <Badge>Avançado</Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 20h</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 342 alunos</span>
              </div>
              <Button className="w-full" size="lg">
                Inscrever-se
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
