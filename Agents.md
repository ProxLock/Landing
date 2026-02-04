# Agents & Workflows

This document outlines the agentic workflows, tools, and context established during the migration of `proxlock-landing` to Astro.

## Project Context
- **Name**: ProxLock Landing Page
- **Stack**: Astro 5.0 (Transitioned from Vite/React), React 19 (Islands), Clerk Auth, Cloudflare Pages

## Workflows

### Deployment & Build
*   **Adapter**: Cloudflare (`@astrojs/cloudflare`).
*   **Command**: `npm run build` runs `astro check && astro build`.
*   **Environment**: Requires `PUBLIC_CLERK_PUBLISHABLE_KEY` (client) and `CLERK_SECRET_KEY` (server/middleware).
  - Assume that the `.env` file is correctly configured with the required environment variables.

## Tools & commands
*   `npm run dev`: Starts the Astro development server.
*   `npm run build`: Production build for Cloudflare.
*   `npm run preview`: Preview the production build locally.
