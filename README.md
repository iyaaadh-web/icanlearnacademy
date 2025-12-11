# I Can Learn Academy - Next.js Full Stack (SQLite)

This project contains:
- Next.js frontend with pages for Home, Login, Register, Dashboard, Admin, Teacher
- Next.js API routes implementing auth (register/login/logout), courses, students, admin
- SQLite database using better-sqlite3 (data.sqlite)
- Simple JWT authentication via HTTP-only cookie
- Email notifications sent to `sales@fasmala.com` on new signups (configure SMTP in .env)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create `.env` from `.env.example` and fill values (JWT_SECRET and SMTP settings).

3. Seed initial data:
   ```
   npm run seed
   ```

4. Run the development server:
   ```
   npm run dev
   ```

Open http://localhost:3000

## Notes
- This is a simple, self-contained prototype. For production:
  - Use HTTPS, secure cookies, stronger password policies.
  - Move to a managed DB (Postgres) and production email service.
  - Harden rate-limiting and input validation.
