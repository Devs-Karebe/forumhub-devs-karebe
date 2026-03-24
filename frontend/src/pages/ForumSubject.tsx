import { useParams } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';

const mockPosts = [
  { id: '1', title: 'Como usar useEffect corretamente?', author: 'Maria S.', replies: 8, date: '2h atrás' },
  { id: '2', title: 'Dúvida sobre Context API', author: 'João P.', replies: 3, date: '5h atrás' },
  { id: '3', title: 'Melhores práticas com Zustand', author: 'Ana L.', replies: 12, date: '1 dia' },
];

const ForumSubject = () => {
  const { subjectId } = useParams();

  return (
    <>
      <PageHeader
        title={`Fórum — ${subjectId?.charAt(0).toUpperCase()}${subjectId?.slice(1) ?? ''}`}
        description="Veja os tópicos e participe da discussão."
      />

      <div className="space-y-3">
        {mockPosts.map((p) => (
          <Card key={p.id} className="shadow-card border-0 hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-4">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="gradient-accent text-secondary-foreground text-xs font-semibold">
                  {p.author.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.author} · {p.date}</p>
              </div>
              <Badge variant="outline" className="flex items-center gap-1 shrink-0">
                <MessageSquare className="w-3 h-3" /> {p.replies}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ForumSubject;
