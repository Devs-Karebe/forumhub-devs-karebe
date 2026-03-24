# EduPlatform — Frontend

Plataforma educacional com sistema de cursos e fórum, construída em React com arquitetura modular orientada a domínios.

---

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Rotas](#rotas)
- [Como Criar ou Modificar Páginas](#como-criar-ou-modificar-páginas)
- [Consumo de APIs](#consumo-de-apis)
- [Estado Global (Zustand)](#estado-global-zustand)
- [Validação de Formulários](#validação-de-formulários)
- [Componentes UI (shadcn/ui)](#componentes-ui-shadcnui)
- [Layouts](#layouts)
- [Observações sobre Dados Estáticos](#observações-sobre-dados-estáticos)

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|------------|---------------|
| Node.js    | 18+           |
| npm / bun  | npm 9+ ou bun 1+ |

## Instalação e Execução

```bash
# 1. Instalar dependências
npm install
# ou
bun install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
# ou
bun dev
```

O app estará disponível em `http://localhost:8080`.

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz (opcional):

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Se não definida, o Axios usará `http://localhost:3000/api` como padrão.

## Scripts Disponíveis

| Script           | Descrição                        |
|------------------|----------------------------------|
| `npm run dev`    | Servidor de desenvolvimento      |
| `npm run build`  | Build de produção                |
| `npm run preview`| Preview do build                 |
| `npm run test`   | Executa testes com Vitest         |
| `npm run lint`   | Lint com ESLint                  |

---

## Stack Tecnológica

| Categoria             | Tecnologia          |
|-----------------------|---------------------|
| Build Tool            | Vite                |
| Framework             | React 18            |
| Roteamento            | React Router DOM 6  |
| Requisições HTTP      | Axios               |
| Estado Global         | Zustand             |
| Validação             | Zod                 |
| Formulários           | React Hook Form     |
| Componentes UI        | shadcn/ui           |
| Ícones                | lucide-react        |
| Estilização           | Tailwind CSS        |
| Testes                | Vitest + Testing Library |

---

## Arquitetura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes shadcn/ui (Button, Input, Card...)
│   ├── shared/          # Componentes reutilizáveis do projeto (PageHeader...)
│   └── AppSidebar.tsx   # Sidebar de navegação
│
├── layouts/
│   ├── AuthLayout.tsx       # Layout para páginas públicas (login)
│   └── DashboardLayout.tsx  # Layout autenticado (sidebar + header + conteúdo)
│
├── pages/               # Views completas, uma por rota
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Courses.tsx
│   ├── CourseDetail.tsx
│   ├── Forum.tsx
│   └── ForumSubject.tsx
│
├── services/
│   ├── http/
│   │   └── apiClient.ts     # Instância Axios centralizada com interceptors
│   └── api/
│       ├── authService.ts   # Endpoints de autenticação
│       ├── courseService.ts  # Endpoints de cursos
│       └── forumService.ts  # Endpoints do fórum
│
├── store/               # Stores Zustand (estado global)
│   ├── authStore.ts
│   ├── courseStore.ts
│   └── forumStore.ts
│
├── schemas/             # Schemas Zod para validação
│   └── loginSchema.ts
│
├── hooks/               # Custom hooks
├── types/               # Tipos e interfaces compartilhadas
├── lib/                 # Utilitários (cn, helpers)
└── index.css            # Design tokens e tema Tailwind
```

### Princípios

- **Separação por responsabilidade**: páginas não contêm lógica de API; serviços não conhecem UI.
- **Modularidade**: cada domínio (auth, courses, forum) possui seu próprio service e store.
- **Temas via tokens**: cores e estilos definidos em `index.css` usando variáveis CSS consumidas pelo Tailwind.

---

## Rotas

Definidas em `src/App.tsx`:

| Rota                    | Página          | Layout           | Acesso    |
|-------------------------|-----------------|------------------|-----------|
| `/login`                | Login           | AuthLayout       | Público   |
| `/dashboard`            | Dashboard       | DashboardLayout  | Autenticado |
| `/courses`              | Courses         | DashboardLayout  | Autenticado |
| `/courses/:courseId`    | CourseDetail    | DashboardLayout  | Autenticado |
| `/forum`                | Forum           | DashboardLayout  | Autenticado |
| `/forum/:subjectId`    | ForumSubject   | DashboardLayout  | Autenticado |
| `/`                     | → `/dashboard`  | Redirect         | —         |

---

## Como Criar ou Modificar Páginas

### Criar uma nova página

1. **Crie o componente** em `src/pages/NovaPagina.tsx`:

```tsx
const NovaPagina = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold font-heading">Nova Página</h1>
    </div>
  );
};

export default NovaPagina;
```

2. **Registre a rota** em `src/App.tsx`, dentro do layout adequado:

```tsx
import NovaPagina from '@/pages/NovaPagina';

// Dentro de <Route element={<DashboardLayout />}>
<Route path="/nova-pagina" element={<NovaPagina />} />
```

3. **(Opcional) Adicione ao menu** em `src/components/AppSidebar.tsx`:

```tsx
const navItems = [
  // ...itens existentes
  { title: 'Nova Página', url: '/nova-pagina', icon: SomeIcon },
];
```

---

## Consumo de APIs

### Cliente HTTP

O arquivo `src/services/http/apiClient.ts` exporta uma instância Axios pré-configurada:

- **Base URL** definida via `VITE_API_BASE_URL`
- **Interceptor de request**: anexa `Authorization: Bearer <token>` automaticamente
- **Interceptor de response**: redireciona para `/login` em caso de 401

### Criar um novo serviço

Crie em `src/services/api/`:

```tsx
// src/services/api/notificationService.ts
import apiClient from '@/services/http/apiClient';

export const notificationService = {
  getAll: () => apiClient.get('/notifications'),
  markAsRead: (id: string) => apiClient.patch(`/notifications/${id}/read`),
};
```

### Usar em uma página

```tsx
import { notificationService } from '@/services/api/notificationService';

// Dentro do componente:
const { data } = await notificationService.getAll();
```

> **Dica**: combine com `@tanstack/react-query` para cache e gerenciamento de estado assíncrono.

---

## Estado Global (Zustand)

As stores ficam em `src/store/`. Cada uma gerencia um domínio.

### Stores existentes

| Store           | Responsabilidade                          |
|-----------------|-------------------------------------------|
| `authStore`     | Usuário logado, token, login/logout       |
| `courseStore`    | Lista de cursos, curso selecionado        |
| `forumStore`    | Assuntos e posts do fórum                 |

### Criar uma nova store

```tsx
// src/store/notificationStore.ts
import { create } from 'zustand';

interface NotificationState {
  count: number;
  increment: () => void;
  reset: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  reset: () => set({ count: 0 }),
}));
```

### Consumir em um componente

```tsx
const count = useNotificationStore((s) => s.count);
```

> **Importante**: sempre use seletores (`(s) => s.campo`) para evitar re-renders desnecessários.

---

## Validação de Formulários

Usamos **Zod** para schemas e **React Hook Form** para gerenciamento de formulários.

### Criar um schema

```tsx
// src/schemas/registerSchema.ts
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
```

### Usar em um formulário

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/schemas/registerSchema';

const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
  resolver: zodResolver(registerSchema),
});

const onSubmit = (data: RegisterFormData) => {
  // chamar API
};
```

---

## Componentes UI (shadcn/ui)

Os componentes ficam em `src/components/ui/` e são customizados via Tailwind e variáveis CSS.

### Adicionar um novo componente shadcn

```bash
npx shadcn-ui@latest add [nome-do-componente]
```

### Componentes disponíveis

Button, Input, Card, Dialog, Badge, Avatar, Tabs, Select, Accordion, Toast, entre outros.

### Convenções de estilo

- **Nunca** use cores diretas como `text-white` ou `bg-blue-500` em componentes.
- **Sempre** use tokens semânticos: `text-foreground`, `bg-primary`, `text-muted-foreground`, etc.
- Cores e gradientes customizados estão em `src/index.css` (`:root` e `.dark`).

---

## Layouts

| Layout             | Uso                                  | Componentes internos                |
|---------------------|--------------------------------------|--------------------------------------|
| `AuthLayout`        | Páginas públicas (login, registro)   | Branding à esquerda + formulário     |
| `DashboardLayout`   | Páginas autenticadas                 | Sidebar + Header + área de conteúdo  |

Para trocar o layout de uma rota, mova o `<Route>` para dentro do grupo correto em `App.tsx`.

---

## Observações sobre Dados Estáticos

Atualmente, diversas partes do sistema utilizam **dados mock** (estáticos):

- **Login**: aceita qualquer e-mail/senha e cria um usuário fictício.
- **Dashboard, Courses, Forum**: exibem dados hardcoded nas páginas.
- **Stores**: estão preparadas mas não conectadas a APIs reais.

### Para conectar ao backend

1. Configure `VITE_API_BASE_URL` no `.env`.
2. Substitua dados mock por chamadas aos serviços (`courseService.getAll()`, etc.).
3. Popule as stores com os dados retornados pela API.
4. Implemente guard de rotas autenticadas verificando `useAuthStore`.

---

## Licença

Projeto interno — uso restrito.
