# My Club Showcase

A cinematic, GitHub-inspired club showcase website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

It presents a fictional developer collective ("Team7 Syndicate") with rich, interactive pages for projects, members, events, field logs, and community onboarding.

## Highlights

- **Interactive homepage** with a custom hyperspeed hero experience
- **Projects directory** with repository-style cards, metadata, and search
- **Members directory** with codename dossiers and profile details
- **Events hub** for operations, workshops, and CTF-style listings
- **Field logs (blog)** presented in a developer-documentation aesthetic
- **Join flow** with themed onboarding UI and validation behavior
- **Wall of Fame** leaderboard with badges, bounties, and contribution stats
- **Theme support** via app-level theme provider

## Tech Stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React
- Radix UI primitives
- Genkit + Google AI plugin (configured under `src/ai`)

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm 10+

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The app runs on **http://localhost:3000**.

## Available Scripts

- `npm run dev` — start local development server
- `npm run build` — build for production
- `npm run start` — run production build
- `npm run lint` — run Next.js ESLint checks
- `npm run typecheck` — run TypeScript type checking
- `npm run genkit:dev` — start Genkit development runtime
- `npm run genkit:watch` — start Genkit runtime in watch mode

## Project Structure

```text
src/
  app/            # Route pages (home, projects, members, events, blog, join, wall-of-fame, about)
  components/     # Reusable UI and feature components
  lib/            # Shared data and utilities
  hooks/          # Custom React hooks
  ai/             # Genkit configuration
docs/
  blueprint.md    # Product/design blueprint
```

## Data Model

The showcase currently uses in-repo static data (`src/lib/data.ts`) for:

- members
- projects
- field logs
- bounties
- achievement badges
- aggregate club statistics

## Deployment

This project includes deployment-related config files for hosted environments:

- `vercel.json`
- `apphosting.yaml`

Build and start commands:

```bash
npm run build
npm run start
```
