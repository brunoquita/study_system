# Sistema Acadêmico Bruno Rocha

Plataforma pessoal de estudos avançados em tecnologia, criada com Next.js 15, React, TypeScript, TailwindCSS, Server Actions, Prisma e PostgreSQL/Neon.

## Stack

- Next.js 15 com App Router
- React e TypeScript
- TailwindCSS com dark mode por padrão
- Next.js Server Actions
- Prisma ORM
- PostgreSQL via Neon
- Deploy previsto na Vercel

## Rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Configure o banco:

```bash
cp .env.example .env
```

Preencha `DATABASE_URL` com a connection string do Neon.

3. Gere o Prisma Client e aplique o schema:

```bash
npm run db:push
npm run db:seed
```

4. Inicie o app:

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Modelo de dados e UX

O banco é a fonte de verdade para módulos, disciplinas, unidades, materiais, sessões de estudo e notas. A aplicação não usa `localStorage` como persistência.

A experiência principal da V1 é um controle pessoal de estudos: escolher um tópico, marcar status, registrar anotações e manter materiais de referência editáveis.

## V1

Esta versão é single-user e não possui login. Autenticação, IA, flashcards, gamificação e app mobile ficam como evolução futura.
