# GTM India

Community site for GTM India and Presales India events.
An initiative by GTM Solutions Consulting (https://gtmsolutions.co).

## Tech stack
- Next.js 15 (App Router)
- Tailwind v4 with CSS custom properties
- Lenis smooth scroll (desktop only)
- MDX for event content
- Vercel (free tier)

## Project structure

src/
  app/
    layout.tsx              Root layout (fonts, Nav, Footer, Lenis)
    page.tsx                Home
    events/page.tsx         Events page (filterable grid)
    presales-india/page.tsx Presales India community landing
    about/page.tsx          About - mission + people
    globals.css             Design tokens (CSS custom properties)
  components/
    layout/Nav.tsx, Footer.tsx
    ui/EventCard.tsx, EventFilters.tsx, ScrollButton.tsx, SmoothScrollProvider.tsx
  content/events/           One .mdx file per event
  lib/events.ts             getAllEvents(), getUpcomingEvents(), getPastEvents()
  types/event.ts            Event type definition

## Adding an event

Create a .mdx file in src/content/events/:

  ---
  title: "Event title"
  date: "2025-08-10"
  time: "6:30 PM IST"
  community: "presales-india"   # or "gtm-india"
  format: "in-person"           # or "virtual"
  series: "regular"             # or "self"
  city: "Bengaluru"             # omit for virtual
  description: "One-paragraph description."
  lumaUrl: "https://lu.ma/your-event-slug"
  status: "upcoming"            # or "past"
  ---

Filename convention: YYYY-MM-description.mdx

## Design tokens

Placeholder palette in globals.css. Replace --color-primary and --color-secondary
families once brand is confirmed. All components reference tokens only.

## Deployment

  npm install -g vercel
  vercel login
  cd ~/ClaudeWorkspace/gtmindia && vercel --prod

Link gtmindia.co in Vercel project settings, then update Namecheap DNS:
  A record:    @ -> Vercel IP
  CNAME:       www -> cname.vercel-dns.com
