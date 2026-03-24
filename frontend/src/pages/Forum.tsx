import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockSubjects = [
  { id: 'react', name: 'React', description: 'Discussões sobre React e seu ecossistema.', posts: 48 },
  { id: 'typescript', name: 'TypeScript', description: 'Dúvidas e dicas sobre TypeScript.', posts: 35 },
  { id: 'nodejs', name: 'Node.js', description: 'Backend com Node.js, Express e mais.', posts: 22 },
  { id: 'geral', name: 'Geral', description: 'Conversas gerais sobre programação.', posts: 64 },
];

const Forum = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Fórum" description="Participe das discussões e tire suas dúvidas." />

      <div className="space-y-4">
        {mockSubjects.map((s) => (
          <Card
            key={s.id}
            className="shadow-card border-0 cursor-pointer hover:shadow-elevated transition-shadow"
            onClick={() => navigate(`/forum/${s.id}`)}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-primary shrink-0">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-heading">{s.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
              <Badge variant="secondary">{s.posts} tópicos</Badge>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Forum;
