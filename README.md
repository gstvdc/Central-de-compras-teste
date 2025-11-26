# Central de Compras - Projeto Teste

⚠️ **ESTE É UM PROJETO DE TESTE E DEMONSTRAÇÃO**

## Sobre

Frontend moderno para a Central de Compras, desenvolvido como **projeto de teste** com **Vite + React + TypeScript + Tailwind CSS**. Utiliza **localStorage** para persistência de dados (prototipagem apenas).

Este projeto serve como validação de arquitetura, não deve ser utilizado em produção.

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── TopBar.tsx      # Barra de navegação
│   ├── ProtectedRoute.tsx # Rota protegida
│   └── Modal.tsx       # Modal genérico
├── pages/              # Páginas da aplicação
│   ├── Login.tsx
│   ├── AdminDashboard.tsx
│   ├── AdminFornecedores.tsx
│   ├── AdminCampanhas.tsx
│   ├── Dashboard.tsx
│   ├── Campanhas.tsx
│   └── Fornecedores.tsx
├── services/           # Serviços de dados
│   ├── db.ts          # LocalStorage database wrapper
│   └── auth.ts        # Autenticação
├── contexts/          # React Contexts
│   ├── AuthContext.tsx # Contexto de autenticação
│   └── DataContext.tsx # Contexto de dados
├── styles/
│   └── global.css     # Estilos globais
├── App.tsx            # Componente raiz
└── main.tsx           # Entrada da aplicação
```

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse em `http://localhost:5173`

## Build

```bash
npm run build
```

## Credenciais de Teste

- **Admin:** admin@test.com / admin123
- **Lojista:** lojista@test.com / loja123

> ⚠️ Credenciais apenas para teste local

## Recursos

- ✅ Autenticação com localStorage (teste apenas)
- ✅ Persistência de dados em localStorage
- ✅ Roteamento com React Router
- ✅ Contextos React para estado global
- ✅ Componentes reutilizáveis com Tailwind CSS
- ✅ Design responsivo e moderno
- ✅ Interface intuitiva com animações
- ⚠️ **NÃO pronto para produção**
