# Tuition Marketplace

A tuition marketplace built with **Next.js**, **Tailwind CSS**, and **Supabase**.

Students can browse tutors, view profiles, and book sessions. Tutors can create profiles and manage bookings.

## Prerequisites

- [Node.js 18+](https://nodejs.org/) (includes npm)
- A free [Supabase](https://supabase.com/) account

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Copy `.env.example` to `.env.local` and fill in your project URL and anon key
3. Open **SQL Editor** in Supabase and run the script in `supabase/schema.sql`

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project structure

```
├── app/                    # Pages and routes (Next.js App Router)
│   ├── (auth)/             # Login & register (grouped route — no URL segment)
│   ├── dashboard/          # User dashboard
│   ├── tutors/             # Browse & view tutor profiles
│   ├── layout.tsx          # Root layout (header, footer, fonts)
│   ├── page.tsx            # Home page
│   └── globals.css         # Tailwind + global styles
├── components/
│   ├── layout/             # Header, Footer
│   └── ui/                 # Reusable UI (Button, etc.)
├── lib/
│   ├── supabase/           # Supabase client (browser + server)
│   └── types.ts            # TypeScript types for database models
├── supabase/
│   └── schema.sql          # Database tables & security policies
└── middleware.ts           # Keeps Supabase auth sessions fresh
```

## Next steps

- Wire up login/register forms to Supabase Auth
- Replace placeholder tutor data with real Supabase queries
- Add tutor profile creation for users with the `tutor` role
- Implement booking flow
