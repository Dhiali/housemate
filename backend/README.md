# Housemate Backend

Simple Express server for the Housemate app.

## Scripts

- `npm run dev` — Start with nodemon (auto-restart)
- `npm start` — Start with Node

## Setup

1. Create env file:
   - Copy `.env.example` to `.env` and adjust values.
2. Install deps:
   ```powershell
   cd backend
   npm install
   ```
3. Run the server:
   ```powershell
   npm run dev
   ```

Server deploys to Google Cloud Run and exposes `/health`.
