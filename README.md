# Research Management System

This is the monorepo for the Research Management System.

## Project Structure

- `apps/`
  - `web/` - Next.js 15 frontend application
  - `api/` - API service
- `packages/`
  - `database/` - Database schemas, migrations, and seeds (using Drizzle ORM)
  - `auth/` - Authentication guards and helper utilities
  - `shared/` - Common constants, schemas, types, and utility functions
  - `validations/` - Zod schemas and validation rules
  - `email/` - E-mail layouts and templates (using Resend)
- `infrastructure/` - Deployment configs (Docker, Nginx, Railway, Render)
- `docs/` - Architecture, database, API and deployment documentation

## Development

- `npm install` - Install dependencies
- `npm run dev` - Run development server (Turbo)
- `npm run build` - Build all apps and packages
- `npm run lint` - Run ESLint across the workspace
