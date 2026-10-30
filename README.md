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

The website is connected to a dedicated Supabase project in Mumbai (ap-south-1).

- Email/password sign-up, sign-in and sign-out through Supabase Auth
- Public guest browsing of published categories and events
- Database-backed event categories, event listings, saved events and event-interest registrations
- Profile creation trigger on new Auth users
- Row Level Security enabled on all public tables; profile, saved-event and registration rows are scoped to the signed-in user's ID
- The browser uses the Supabase publishable key only. Never place a service-role key in frontend code.

The frontend reads event data from Supabase. Event names, dates and venues remain sample placeholders until the official Milan schedule is supplied. Email confirmation behavior follows the Supabase Auth project settings.

## Notes

- Event photography is illustrative and loaded from Unsplash.
- No real student details or credentials are included.
- Confirm official event data and image permissions before production registration.
