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
- Frontend: Next.js (TypeScript).
- Backend: ASP.NET Core with PostgreSQL database

## Running the build locally

### Prerequisites
- Node.js and npm installed
- NET Core SDK 8 or higher installed
- PostgreSQL database installed

### Steps
- Set up the following required environment variables:
  - JWTKey: The key used to generate the jwt tokens for authorization
  - DatabaseConnectionString: The database connection string in the format "Host={hostAddress};Username={username};Password={password};Database=postgres"
  - ZohoMailPassword: The password for the zoho mail service, which sends the password reset codes. Currently the zoho mail address is hardcoded, perhaps in the future it can be obtained from an environment variable as well
  - NEXT_PUBLIC_API_BASE_URL: The base url for the backend api (for example, https://localhost:5000/)
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
Set up and run the backend:
```
cd ../backend
dotnet run
```

## License

This project is licensed under the MIT License.
