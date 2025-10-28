# 🐞 Issue Tracker

A modern, full‑stack **issue tracking** web app built with **Next.js/React**, **Tailwind CSS + Radix UI**, **Prisma** on **MySQL**, and a **Zod**‑validated REST API via **Axios** on the client.

---

## ✨ Features

- 🔐 Auth‑ready structure (plug your provider of choice)
- 🗂️ Projects, Issues, Labels, Assignees
- 🔎 Powerful filtering, search, and sorting
- 🏷️ Priority, status, and SLA‑style timestamps
- ✅ Zod‑validated forms (client & server)
- ⚡ Optimistic UI updates with React hooks
- ♿ Accessible primitives via Radix UI
- 🗃️ Prisma schema & migrations for MySQL
- 📈 Minimal analytics hooks & API usage examples

---

## 🧰 Tech Stack

| Layer        | Tools                                                                 |
|--------------|-----------------------------------------------------------------------|
| Frontend     | Next.js (React), Tailwind CSS, Radix UI                               |
| Validation   | Zod                                                                    |
| HTTP Client  | Axios                                                                  |
| ORM / DB     | Prisma, MySQL                                                          |
| Optional     | Datagraph (for ERD/DB diagrams – optional)                             |


---

## 🚀 Quick Start

### 1) Prerequisites
- Node.js 18+ (or 20+ recommended)
- MySQL 8+ running locally or remote
- PNPM / npm / Yarn (pick one)

### 2) Clone & Install
```bash
git clone https://github.com/<your-username>/issue-tracker.git
cd issue-tracker
pnpm install   # or: npm install / yarn
```

### 3) Environment
Create `.env` in the project root:
```bash
# Database
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/issue_tracker"

# (Optional) Next Auth / JWT / other secrets
# NEXTAUTH_SECRET="..."
# NEXTAUTH_URL="http://localhost:3000"
```

### 4) Database & Prisma
```bash
# Create DB (if not already created)
# In MySQL: CREATE DATABASE issue_tracker;

# Generate Prisma client & run migrations
pnpm prisma generate
pnpm prisma migrate dev --name init

# (Optional) seed
pnpm prisma db seed
```

### 5) Run Dev Server
```bash
pnpm dev
# http://localhost:3000
```

---

## 🗂️ Project Structure (excerpt)

```
issue-tracker/
├─ prisma/
│  ├─ schema.prisma       # Models & relations
│  └─ seed.ts             # Optional seeding
├─ src/
│  ├─ app/                # Next.js (App Router)
│  ├─ components/         # UI components (Radix + Tailwind)
│  ├─ lib/                # Helpers (zod, prisma client, utils)
│  ├─ server/             # Server actions / API handlers
│  └─ types/              # Zod schemas & types
├─ public/                # Static assets
├─ .env.example           # Example env vars
├─ package.json
└─ README.md
```

---

## 🗄️ Data Model (Prisma excerpt)

```prisma
// prisma/schema.prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Project {
  id        String   @id @default(cuid())
  name      String
  issues    Issue[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Issue {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      Status   @default(OPEN)
  priority    Priority @default(MEDIUM)
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId   String
  assigneeId  String?
  assignee    User?    @relation("AssignedIssues", fields: [assigneeId], references: [id])
  labels      Label[]  @relation("IssueLabels", references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Label {
  id     String  @id @default(cuid())
  name   String  @unique
  color  String
  issues Issue[] @relation("IssueLabels")
}

model User {
  id            String  @id @default(cuid())
  email         String  @unique
  name          String?
  assigned      Issue[] @relation("AssignedIssues")
}

enum Status {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

---

## 🔌 API (sample routes)

> Final paths depend on your Next.js routing; replace as needed.

- `GET /api/issues` – list (supports `status`, `priority`, `q`)
- `POST /api/issues` – create (Zod‑validated)
- `GET /api/issues/:id` – details
- `PATCH /api/issues/:id` – update
- `DELETE /api/issues/:id` – remove

**Client example (Axios):**
```ts
import axios from "axios";
import { z } from "zod";

const IssueSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
  projectId: z.string(),
});

export async function createIssue(data: z.infer<typeof IssueSchema>) {
  const payload = IssueSchema.parse(data);
  const res = await axios.post("/api/issues", payload);
  return res.data;
}
```

---

## 🧪 Quality & DX

```bash
# Type check, lint, format (examples)
pnpm typecheck
pnpm lint
pnpm format

# Build & start
pnpm build
pnpm start
```

---

## 📦 Deploy

- Set `DATABASE_URL` in your hosting provider
- Run Prisma migrations on deploy: `prisma migrate deploy`
- Configure environment for Next.js (e.g., `NEXTAUTH_URL`, if using auth)
- Use a managed MySQL (PlanetScale, Neon‑MySQL, RDS, etc.) or your own server

---

## 📝 Scripts (examples)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:deploy": "prisma migrate deploy",
    "prisma:studio": "prisma studio",
    "seed": "ts-node prisma/seed.ts"
  }
}
```

---

## 🧭 Roadmap (ideas)

- Kanban board & drag‑and‑drop
- Activity log & audit trail
- Webhooks & integrations (GitHub)

---

## 🤝 Contributing

PRs welcome! Please open an issue to discuss major changes first.

---

## 🛡️ License

MIT © **@salahrachidi**
