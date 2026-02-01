# Agents & Workflows

This document outlines the agentic workflows, tools, and context established during the migration of `proxlock-landing` to Astro.

## Project Context
- **Name**: ProxLock Landing Page
- **Stack**: Astro 5.0 (Transitioned from Vite/React), React 19 (Islands), Clerk Auth, Cloudflare Pages
- **Key Constraints**: 
    - Use React components for Clerk UI (`@clerk/clerk-react`) explicitly within Astro pages.
    - `PricingPage` uses `usePlans` hook (experimental/beta) and requires proper context wrapping.

## Active Agents

### Migration Agent (Antigravity)
Responsible for the transition from Vite/React SPA to Astro SSG/SSR.
*   **Accomplishments**:
    *   Setup Astro Configuration (`astro.config.mjs`) with React & Clerk integrations.
    *   Migrated static components (`WhySection`, `Footer`) to `.astro`.
    *   Implemented React Islands for `Navigation`, `DecryptedText`, `HomeAuthSection` and `PricingPage`.
    *   Refactored Authentication to use `ClerkLoaded` and `ClerkProvider` wrappers to ensure client-side hydration stability.
    *   Resolved package version conflicts (Clerk Astro 2.x / Astro 5.x).

## Workflows

### Authentication Implementation
When correcting or implementing Auth in Astro Islands:
1.  **Isolation**: React islands run in isolation and do not inherit context from the Astro server loop automatically.
2.  **Provider Wrapping**: Wrap root component of the island (e.g., `HomeAuthSection`, `PricingPage`) in `<ClerkProvider>` with the publishable key.
3.  **Loading State**: Use `<ClerkLoaded>` to prevent flash of content (SignedOut/SignedIn states) during hydration.
4.  **Dependencies**: Use `@clerk/clerk-react` for UI components inside islands, while keeping `@clerk/astro` in `astro.config.mjs` for middleware/SSR support.

### Deployment & Build
*   **Adapter**: Cloudflare (`@astrojs/cloudflare`).
*   **Command**: `npm run build` runs `astro check && astro build`.
*   **Environment**: Requires `PUBLIC_CLERK_PUBLISHABLE_KEY` (client) and `CLERK_SECRET_KEY` (server/middleware).

## Tools & commands
*   `npm run dev`: Starts the Astro development server.
*   `npm run build`: Production build for Cloudflare.
*   `npm run preview`: Preview the production build locally.
