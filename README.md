# Belgian Malinois Special Breed – Full Stack Website

Full-stack kennel website built with **Next.js 15 + Prisma + Postgres**.

> Originally scaffolded with SQLite, which does not persist on Vercel's
> serverless functions (ephemeral filesystem). This version uses Postgres
> so your data actually survives between deploys and requests.

## Features

- Public site: Home, Puppies, Puppy detail, About, Contact
- Database-backed puppy listings with health certificates
- Inquiry / Application / Reservation / Waiting List / Appointment / Review flows
- Admin panel with real auth: bcrypt password hashing + JWT httpOnly cookie sessions
- No payment page — deposits and payment are handled off-platform, by design

---

## 1. Get a Postgres database

Pick one (all have free tiers, all work with Prisma out of the box):

- **Neon** (neon.tech) — recommended, gives you both a pooled and direct connection string
- **Vercel Postgres** — lives right in your Vercel dashboard, one click from the project settings
- **Supabase** — since you already use it for the blog, you can spin up a second project here too

Whichever you pick, copy the connection string(s) into `.env` (see `.env.example`).
If your provider only gives you one URL, set `DATABASE_URL` and `DIRECT_URL` to the same value.

## 2. Set up your local `.env`

```bash
cp .env.example .env
```

Fill in:
- `DATABASE_URL` / `DIRECT_URL` — from step 1
- `JWT_SECRET` — run `openssl rand -base64 32` and paste the output
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — your real admin login, **not** the old default

## 3. Push the schema and seed data

```bash
npm install
npx prisma db push
npx tsx prisma/seed.ts
```

This creates the tables in your new Postgres database and seeds your admin account
(using the `ADMIN_EMAIL`/`ADMIN_PASSWORD` from your `.env`) plus 4 sample puppies.

## 4. Run it locally to check

```bash
npm run dev
```

Open http://localhost:3000, then http://localhost:3000/admin/login with your real
admin email/password to confirm the dashboard loads.

## 5. Push to GitHub

From Termux, inside this folder:

```bash
git init
git add .
git commit -m "Switch to Postgres, ready for Vercel"
git remote add origin https://github.com/valdo-tech-pro/Belgian-malinoi.git
git push -u origin main --force
```

`.env` is already git-ignored, so your real credentials never get committed — only
`.env.example` (with placeholder values) goes to GitHub.

## 6. Deploy on Vercel

1. vercel.com → New Project → import your `Belgian-malinoi` repo
2. In "Environment Variables," add all five: `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
3. Deploy

After the first deploy, run the seed step once against your **production** database
(either via `npx prisma db push && npx tsx prisma/seed.ts` locally with your production
`.env` values, or from Vercel's own terminal if you have that enabled). This creates your
real admin account and sample puppies in the live database.

Every `git push` to `main` after that auto-deploys.

## Project Structure

```
src/
  app/
    page.tsx              → Home
    puppies/               → List + detail
    about/
    contact/                → Form that posts to API
    admin/                  → Dashboard + login
    api/
      inquiries/            → Save contact form
      applications/         → Adoption applications
      reservations/         → Puppy reservation requests
      appointments/         → Visit/pickup scheduling
      waiting-list/         → Waiting list signups
      reviews/               → Public reviews (GET approved only)
      newsletter/             → Email signups
      auth/login|logout      → Admin session
  components/               → Navbar, Footer, PuppyCard, etc.
  lib/                       → prisma.ts, auth.ts
prisma/
  schema.prisma
  seed.ts
```

## Before you consider this launch-ready

- [ ] Real admin email + a strong, unique password (not the seeded default)
- [ ] `JWT_SECRET` set in Vercel — the code falls back to an insecure default if missing
- [ ] Real puppy data replacing the 4 seeded sample dogs
- [ ] Real photos (image URLs) on each puppy record
- [ ] Decide how deposits/payment actually get handled off-platform, and make sure that
      process is written down somewhere buyers can see (contract, FAQ, etc.)
