# Milan '26 — Festival Website

A colourful, responsive frontend for the Milan national-level cultural fest concept at SRMIST. Built for **DSA Tech Team Recruitment — Track B (Frontend Development)**.

## Features

- Festival landing page with navigation, introduction and featured visual identity
- Eight sample events across Music, Dance, Drama, Fashion and Technical
- Live keyword search and category filters
- Event detail modal with date, time, venue and description
- Registration form with client-side validation and success feedback
- Responsive desktop and mobile layouts
- Empty search state, modal dismissal, keyboard Escape support and mobile navigation

## Run locally

This is a static frontend and does not require a build step or backend.

1. Clone the repository:
   ```bash
   git clone https://github.com/iVedansh/MILAN-.git
   cd MILAN-
   ```
2. Open `index.html` in a browser, or run a local static server:
   ```bash
   npx serve .
   ```

## Deploy on Vercel

1. Import this GitHub repository into Vercel.
2. Choose **Other** as the framework preset.
3. Leave the build command empty.
4. Set the output directory to `.`.
5. Deploy.

## Demo data

Event content is fictional sample data stored separately from the rendering logic in the `events` array in `index.html`. Registration is a frontend demonstration only; it validates the form and shows a success state but does not send or persist participant data to a server.

## Notes

- Images are loaded from Unsplash and Google Fonts are loaded remotely, so an internet connection is needed for those assets.
- No real student information, credentials or secrets are included.
