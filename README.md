# Zentro – AI Workforce Manager

A production-ready MVP web app for creating and managing AI employees that complete tasks 24/7.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (custom design system)
- **Supabase** (Auth + Postgres + Row Level Security)
- **OpenAI** (GPT-4o-mini)
- **React Flow** (Org chart)
- **Vercel** (deployment)

## Quick Start

### 1. Clone & install

```bash
git clone <your-repo>
cd zentro
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon key
- `OPENAI_API_KEY` — your OpenAI API key

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Enable **Email auth** in Authentication → Providers

### 4. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
npx vercel
```

Add the same environment variables in the Vercel dashboard.

## Project Structure

```
zentro/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Tailwind + global styles
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/page.tsx        # Main dashboard
│   ├── employees/
│   │   ├── page.tsx              # Employee list
│   │   ├── new/page.tsx          # Create employee form
│   │   └── [id]/page.tsx         # Employee detail + task history
│   ├── tasks/page.tsx            # Task runner + history
│   ├── org/page.tsx              # React Flow org chart
│   └── api/
│       ├── tasks/route.ts        # OpenAI task execution
│       └── employees/route.ts    # Employee CRUD
├── components/
│   ├── Sidebar.tsx
│   ├── DashboardLayout.tsx
│   ├── EmployeeCard.tsx
│   ├── ActivityFeed.tsx
│   └── StatCard.tsx
├── lib/
│   ├── types.ts                  # TypeScript types
│   └── supabase/
│       ├── client.ts             # Browser client
│       ├── server.ts             # Server component client
│       └── middleware.ts         # Auth session refresh
├── middleware.ts                 # Route protection
└── supabase/
    └── schema.sql                # DB schema + RLS
```

## Database Schema

| Table | Purpose |
|-------|---------|
| `employees` | AI employee profiles (name, role, goal, system_prompt, status) |
| `tasks` | Task runs with prompts, AI responses, token usage, cost |
| `activity_logs` | Timeline of all employee actions and system events |

All tables use **Row Level Security** — users only see their own data.

## AI Cost Tracking

Each task call to GPT-4o-mini automatically calculates cost:
- Input: $0.15 / 1M tokens
- Output: $0.60 / 1M tokens

Costs are stored per-task and summed on the dashboard.

## Employee Roles

| Role | Description |
|------|------------|
| SDR | Sales Development — outreach, lead gen |
| Research | Market research, competitive analysis |
| Support | Customer support, ticket resolution |
| Analyst | Data analysis, reporting |

Each role ships with a default system prompt that can be customized.
