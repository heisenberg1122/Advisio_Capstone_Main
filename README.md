# Research Management System

This is the monorepo for the Research Management System (RMS) - **Advisio**.

## Project Directory Structure

```text
research-management-system/
│
├── apps/
│   │
│   ├── web/                     # Next.js 15 Frontend Web Application
│   │   ├── src/
│   │   │   ├── app/             # Application Pages and Routing
│   │   │   │   ├── (public)/    # Public Routes (Auth Prototype)
│   │   │   │   │   ├── login/
│   │   │   │   │   ├── register/ (Account Activation Page)
│   │   │   │   │   ├── forgot-password/
│   │   │   │   │   └── first-login-setup/
│   │   │   │   │
│   │   │   │   ├── student/     # Student Role Specific Routes
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── groups/
│   │   │   │   │   ├── adviser-pool/
│   │   │   │   │   ├── submissions/
│   │   │   │   │   ├── consultations/
│   │   │   │   │   ├── defense/
│   │   │   │   │   └── ...
│   │   │   │   │
│   │   │   │   ├── adviser/     # Adviser Role Specific Routes
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── dashboard/  # Main Adviser UI panels
│   │   │   │   │   ├── advisees/
│   │   │   │   │   ├── requests/
│   │   │   │   │   └── ...
│   │   │   │   │
│   │   │   │   ├── professor/   # Professor Role Routes
│   │   │   │   ├── dean/        # Dean Role Routes
│   │   │   │   ├── panelist/    # Panelist Role Routes
│   │   │   │   └── super-admin/ # Super Admin Role Routes
│   │   │   │
│   │   │   ├── components/      # UI, Shared, and Dashboard Components
│   │   │   │   ├── dashboards/  # Dashboard blocks (student/adviser)
│   │   │   │   ├── ui/          # Core atoms (Avatar, Card, Tag)
│   │   │   │   └── shared/      # Common navigation components
│   │   │   │
│   │   │   ├── hooks/           # Custom React hooks (use-auth, use-role, etc.)
│   │   │   ├── lib/             # Third-party wrappers (TRPC, real-time, auth, etc.)
│   │   │   ├── providers/       # Global Providers
│   │   │   └── types/           # Type declarations
│   │   └── next.config.ts
│   │
│   └── api/                     # Bun + Hono/tRPC Backend API Service
│       ├── src/
│       │   ├── server.ts        # Entrypoint server file
│       │   ├── routers/         # tRPC Routers (auth, users, groups, etc.)
│       │   ├── services/        # Service layer (business logic handlers)
│       │   ├── middleware/      # Middleware filters (roles, logging, audit)
│       │   ├── schemas/         # Request validation schemas
│       │   ├── realtime/        # WebSockets connections
│       │   ├── queues/          # Task queues
│       │   ├── jobs/            # Cron jobs
│       │   └── utils/           # Helper functions
│
├── packages/                    # Local Workspaces & Shared Modules
│   ├── database/                # Schema definitions & migrations (Drizzle ORM)
│   │   ├── drizzle/
│   │   │   ├── schema/          # Table declarations (auth, users, audits)
│   │   │   ├── migrations/      # SQL migration scripts
│   │   │   └── seeds/           # Development database seeds
│   │   └── index.ts
│   │
│   ├── auth/                    # Shared Auth configuration (Better-Auth, guards, roles)
│   │   ├── better-auth.ts
│   │   ├── permissions.ts
│   │   └── guards.ts
│   │
│   ├── shared/                  # Common workspace types, constants, and utilities
│   ├── validations/             # Shared validation rules (Zod schemas)
│   └── email/                   # Transports and templates (Resend integration)
│
├── infrastructure/              # Deployment & Operations configurations
│   ├── docker/                  # Dockerfiles & compose scripts
│   ├── nginx/                   # Reverse proxy settings
│   ├── railway/                 # Railway hosting deployment templates
│   ├── render/                  # Render.com blueprints
│   └── scripts/                 # Server setup and deployment scripts
│
├── docs/                        # Architecture, API, and DB documentation
│   ├── api/
│   ├── architecture/
│   ├── database/
│   └── deployment/
│
├── turbo.json                   # Turborepo build optimization configuration
├── bun.lockb                    # Bun package manager configuration lockfile
├── package-lock.json            # NPM package manager configuration lockfile
├── package.json                 # Monorepo dependencies and workspaces metadata
└── README.md
```

## Development and Setup

To start developing on this project:

1. **Install Dependencies**:
   ```bash
   npm install
   ```
   *Note: This runs in the project root and resolves workspaces/packages automatically.*

2. **Run in Development**:
   ```bash
   npm run dev
   ```
   *Note: Turbo will execute local dev processes for both web and api packages.*

3. **Production Build**:
   ```bash
   npm run build
   ```

4. **Lint Codebase**:
   ```bash
   npm run lint
   ```
