# Milan '26 — Festival Website

A responsive, image-led Milan festival discovery website for **DSA Tech Team Recruitment — Track B (Frontend Development)**.

## Track B scope

- Homepage with Milan identity, navigation, hero, festival introduction and featured categories
- Seven event categories based on the supplied Milan reference: Movies & Dramatics, Creative Arts, Music, Dance, Gaming, Quiz and Self Defence
- Fourteen sample event entries across those categories
- Keyword search and category filters, including category-card shortcuts
- Event detail modal with category, description, schedule and venue fields
- Registration form with client-side required-field and email validation, inline errors and success feedback
- Guest browsing without an account
- Responsive desktop/mobile layouts, mobile navigation, keyboard modal handling and empty search state
- Organised HTML, CSS and JavaScript; GitHub Actions checks JavaScript syntax and required files

## Run locally

This is a static frontend and does not require a build step.

1. Clone the repository:
   ```bash
   git clone https://github.com/iVedansh/MILAN-.git
   cd MILAN-
   ```
2. Open `index.html` in a browser, or run:
   ```bash
   npx serve .
   ```

## Deployment

The GitHub repository is connected to Vercel. Pushes to `main` trigger a new deployment.

## Sample content and assumptions

The category names and category descriptions follow the supplied Milan reference screenshots. The individual event names are illustrative sample content because the screenshots provide category names and event counts, not the official event-by-event schedule. Dates and venues are intentionally marked TBA/sample and must be replaced with official information before real registrations are opened.

## Backend and authentication

The current frontend supports guest browsing. The sign-in screen is a placeholder until a dedicated Supabase project is approved and configured. The registration form currently validates locally and does not send or persist personal information.

When backend setup is approved, the intended implementation is Supabase Auth (email/password) and a Postgres events/registrations schema with row-level security. Never place a service-role key in browser code; only the publishable key belongs in frontend configuration.

## Notes

- Event photography is illustrative and loaded from Unsplash.
- No real student details or credentials are included.
- Confirm official event data and image permissions before production registration.
