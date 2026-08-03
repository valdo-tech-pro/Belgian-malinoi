# Belgian Malinois Special Breed – Full Stack Website

Premium full-stack kennel website built with **Next.js 15 + Prisma + SQLite**.

## Features

- Elegant public site (Home, Puppies, Puppy detail, About, Contact)
- Database-backed puppy listings with health certificates
- Contact form that saves inquiries to the database
- Admin panel with login
- Secure cookie-based authentication
- No Stripe (as requested)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up the database
npx prisma db push

# 3. Seed sample data + admin user
npx tsx prisma/seed.ts

# 4. Run development server
npm run dev
```

Open http://localhost:3000

### Admin Login
- URL: http://localhost:3000/admin/login
- Email: `admin@belgianmalinoisspecialbreed.be`
- Password: `Malinois2026!`

## Project Structure

```
src/
  app/
    page.tsx              → Home
    puppies/              → List + detail
    about/
    contact/              → Form that posts to API
    admin/                → Dashboard + login
    api/
      inquiries/          → Save contact form
      auth/login|logout
  components/             → Navbar, Footer, PuppyCard
  lib/                    → prisma.ts, auth.ts
prisma/
  schema.prisma
  seed.ts
```

## Environment

The `.env` file already exists. Change the secrets for production:

```
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="admin@belgianmalinoisspecialbreed.be"
ADMIN_PASSWORD="Malinois2026!"
JWT_SECRET="change-this-to-a-long-random-secret"
```

## Deploy to Vercel

1. Push the project to GitHub
2. Import in Vercel
3. Add the environment variables in the Vercel dashboard
4. For production you should switch to PostgreSQL (change provider in schema.prisma and use a free Neon/Supabase/Vercel Postgres database)
5. After first deploy, the database will need `prisma db push`

## Notes

- The admin “Manage Puppies” and “View Inquiries” links are placeholders for the next iteration (you can already see counts on the dashboard).
- Sample puppies and the admin user are created by the seed script.

---

Built for Belgian Malinois Special Breed · Belgium
