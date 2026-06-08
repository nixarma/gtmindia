# GTM India

Community site for GTM India and Presales India events.
An initiative by GTM Solutions Consulting (https://gtmsolutions.co).

## Tech stack
- Next.js 16 (App Router)
- Tailwind v4 with CSS custom properties
- Lenis smooth scroll (desktop only)
- MDX for event content
- next-cloudinary for images
- Vercel (free tier) with daily cron-driven ISR revalidation

## Local setup

Requires Node `^20.19 || ^22.13 || >=24` (nvm: `nvm install 22 && nvm use 22`).

    cp .env.example .env.local   # then fill in NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    npm install
    npm run dev

## Project structure

    src/
      app/
        layout.tsx                 Root layout (fonts, Nav, Footer, Lenis)
        page.tsx                   Home
        events/page.tsx            Events listing (filterable)
        events/[slug]/page.tsx     Event detail page
        presales-india/page.tsx    Presales India community landing
        about/page.tsx             About — mission + people
        api/revalidate/route.ts    Cron-hit endpoint that revalidates key paths
        robots.ts, sitemap.ts      SEO
        globals.css                Design tokens (CSS custom properties)
      components/
        layout/                    Nav, Footer
        home/                      Home page sections (Hero, Events, FAQ, etc.)
        events/                    EventCard, EventsFilter, FilterBar
        ui/                        Accordion, PhotoCarousel, ScrollButton, ...
        PresalesHero.tsx
      content/events/              One .mdx file per event
      lib/
        events.ts                  getAllEvents, getEventBySlug, getUpcoming/PastEvents
        dateUtils.ts, eventConstants.ts, metadata.ts
      types/event.ts               Event + Speaker types

## Adding an event

Create a `.mdx` file in `src/content/events/`. Filename convention: `YYYY-MM-DD-slug.mdx`.

    ---
    title: "Event title"
    date: "2025-08-10T18:30:00+05:30"   # ISO with IST offset
    community: "presales-india"          # presales-india | gtm-india | self
    format: "in-person"                  # in-person | virtual
    city: "Bengaluru"                    # use "Virtual" for virtual events
    description: ""                      # body below is the description
    status: "upcoming"                   # upcoming | past
    lumaUrl: "https://lu.ma/your-event-slug"
    # Optional:
    # time: "6:30 PM IST"
    # series: "regular"
    # lumaEmbedUrl: "..."
    # photos: ["cloudinary-public-id-1", "..."]   # first is the cover
    # speakers: [{ name: "...", role: "...", company: "...", linkedin: "..." }]
    # venue: "..."
    # capacity: 50
    # tags: ["demo", "discovery"]
    ---

    One-paragraph description (rendered as the event body).

See `src/types/event.ts` for the full type.

## Design tokens

Placeholder palette in `globals.css`. Replace `--color-primary` and `--color-secondary`
families once brand is confirmed. All components reference tokens only.

## Deployment

    npm install -g vercel
    vercel login
    vercel --prod                  # run from the repo root

Set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in the Vercel project's Environment Variables.

Link `gtmindia.co` in Vercel project settings, then update Namecheap DNS:

    A record:    @   -> Vercel IP
    CNAME:       www -> cname.vercel-dns.com

A Vercel cron hits `/api/revalidate` daily at 18:30 UTC (see `vercel.json`) to roll
upcoming events to past without a redeploy.
