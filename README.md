# Four Green Fields Farm — Nuxt 4 Website

A modern, full-stack Nuxt 4 application built for Four Green Fields Farm, a family-owned agritourism business in Michigan.
This project demonstrates **production-grade architecture**, featuring SSR, SEO optimization, server APIs, automated email workflows, and a secure admin dashboard.

## Core Features at a Glance

### **Frontend**

- **Nuxt 4 + Vue 3 (Composition API + TypeScript)**

- Fully responsive UI with a mobile-first SCSS design system

- Advanced SEO: Open Graph, Twitter Cards, Schema.org, canonical URLs

- Dynamic event calendar with monthly/yearly views and recurring-rule support

- Lightbox-enabled interactive galleries

- Progressive enhancement with graceful fallback when JS is disabled

### **Backend**

- **Nitro server routes** (replaces Express)

- **Prisma ORM + PostgreSQL** for type-safe, schema-driven backend development

- RESTful API endpoints for events, bookings, and contact forms

- Secure JWT authentication with role-gated admin features

- Automated transactional emails powered by Mailgun

- Fully authenticated admin dashboard for event management

### **Notable Technical Highlights**

- Custom **Vue SFC → HTML email compiler** with CSS inlining
  (consistent design shared between web and email)

- Robust recurring event engine using RRule + conflict detection

- Server middleware for redirects, legacy routing, and authentication

- Performance-focused optimizations (lazy-loading, image handling, caching)

- Cloudflare Turnstile integration for bot prevention

---

## Architecture Overview

```
├── app/
│   ├── components/         # Reusable Vue components
│   ├── layouts/            # Layouts (default, admin)
│   ├── pages/              # File-based routed pages
│   │   ├── admin/events/   # Admin event management
│   │   ├── events/         # Public event calendar
│   │   └── emails/         # Vue-based email templates
│   ├── assets/scss/        # SCSS design system
│   └── middleware/         # Route-level auth & guards
├── server/
│   ├── api/                # API endpoints (Nitro)
│   ├── assets/emails/      # Compiled HTML emails
│   ├── middleware/         # Server middleware
│   └── utils/              # Auth, DB helpers, shared logic
├── scripts/
│   └── build-emails.ts     # Email template compiler
├── prisma/                 # Database schema + migrations
└── shared/                 # Cross-server utilities & validators
```

---

## Event Management System

Features include:

- Dynamic monthly and yearly calendars

- RRule-based recurring events

- Private group bookings with conflict detection

- Full CRUD admin interface

- REST API for all event operations

This system powers all public-facing and admin scheduling logic.

---

## Email Template System

Write emails using Vue SFCs → compile to static HTML:

- Vue-based template authoring

- Shared UI components for consistent branding

- Automatic CSS inlining for email client compatibility

- Build script outputs production-ready HTML

- Mailgun integration for sending

---

## Tech Stack Overview

| Category | Technologies                        |
| -------- | ----------------------------------- |
| Frontend | Vue 3, Nuxt 4, TypeScript, SCSS     |
| Backend  | Nitro, Prisma, PostgreSQL           |
| Events   | RRule, dynamic calendars            |
| Email    | Custom Vue → HTML pipeline, Mailgun |
| Security | JWT auth, Cloudflare Turnstile      |
| SEO      | Nuxt Schema.org, meta optimizations |
| Deploy   | Vercel SSR / ISR                    |

### Engineering Decisions (Why These Tools)

- **Nuxt 4 + Nitro** → unified client/server architecture, effortless SSR, strong DX

- **Prisma** → type-safe DB access, clean schema migrations

- **PostgreSQL** → reliable relational data store with strong feature set

- **Vue-based email templates** → reduces duplication across web and email surfaces

- **Vercel** → fast, stable SSR hosting with minimal configuration

---

## Project Goals

- Modernize an aging website with a fast, mobile-first UX

- Provide a self-service admin system for seasonal events

- Improve SEO and visibility for peak-season traffic

- Streamline customer inquiries and booking workflows via automation

---

## Setup & Development

### Prerequisites

- Node.js 18+

- PostgreSQL

- `.env` values configured

### Installation

```bash
git clone https://github.com/mrcrandell/fourgreenfieldsfarm-nuxt.git
npm install
cp .env.example .env    # Add your own values

npx prisma migrate dev
npx prisma db seed

npm run emails:build
npm run dev
```

### Environment Variables

```bash
DATABASE_URL="postgresql://..."

JWT_SECRET="your-jwt-secret"

MAILGUN_API_KEY="your-mailgun-key"
MAILGUN_DOMAIN="your-domain.com"

NUXT_TURNSTILE_SECRET_KEY="your-turnstile-secret"
NUXT_PUBLIC_TURNSTILE_SITE_KEY="your-turnstile-site-key"

NUXT_PUBLIC_SITE_URL="https://www.fourgreenfieldsfarm.com"
```

---

## Build & Deployment

```bash
npm run build
npm run emails:build
npm run preview
git push origin main   # Triggers Vercel deployment
```

---

## Key Learning Outcomes

This project demonstrates capability across:

### Frontend Engineering

- Modern Vue patterns using Composition API + TypeScript

- Maintainable SCSS architecture + responsive UI design

- Performance tuning and accessibility considerations

### Full-Stack Engineering

- REST API design with proper error handling and validation

- Database modeling with Prisma and complex relational queries

- Authentication architecture with JWT + role-based access

- Recurring event system design using RRule + conflict resolution

- Custom tooling for email template compilation

---

## About the Developer

This project was built by **Matt Crandell** as a real-world, production Nuxt 4 website demonstrating full-stack engineering, modern frontend patterns, and end-to-end system design.

GitHub: [https://github.com/mrcrandell](https://github.com/mrcrandell)
Live site: [https://www.fourgreenfieldsfarm.com](https://www.fourgreenfieldsfarm.com)

---

## License

This project is proprietary software built for Four Green Fields Farm.
