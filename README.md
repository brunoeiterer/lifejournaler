# LifeJournaler

LifeJournaler is a lightweight journaling application that allows users to input daily thoughts and behaviors for tracking and monitoring. 
The app provides mood statistics based on the user's entries.

## Features
- Daily Journaling: Record and reflect on your daily thoughts and behaviors
- Mood Statistics: Analyze trends and gain insights into your mood over time
- Simple & Intuitive: Focused on providing a clean and minimalistic journaling experience

## Usage
- The app is still in its early stages, but can already be accessed and used at [lifejournaler.com](https://lifejournaler.com).
- Register as a user and begin entering daily thoughts and behaviors.
- View your mood statistics on the dashboard.

## Tech Stack
- Frontend: Next.js (TypeScript)
- Backend: Supabase (Auth, PostgreSQL Database, Edge Functions)

## Running the build locally

### Prerequisites
- Node.js and npm installed
- A Supabase project (create one at [supabase.com](https://supabase.com))

### Steps
- Set up the following required environment variables in `frontend/.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key
- Set up the database schema by running the SQL migration in `supabase/migrations/001_create_entries.sql` in the Supabase SQL editor
- Deploy the Edge Function for account deletion:
```
cd supabase
supabase functions deploy delete-account
```
- Configure authentication in the Supabase dashboard:
  - Enable email/password sign-up
  - (Optional) Configure custom SMTP for password reset emails
- Clone the repository:
```
git clone https://github.com/brunoeiterer/lifejournaler.git  
cd lifejournaler
```
- Set up and run the frontend:
```
cd frontend  
npm install
npm run dev
```

## License

This project is licensed under the MIT License.
