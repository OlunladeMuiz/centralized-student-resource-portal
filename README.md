# Centralized Student Resource Portal

Tagline: One portal to discover, manage, and interact with student services — enhanced with AI for smarter study planning and document workflows.

---

## Project Overview

- **Name**: Centralized Student Resource Portal
- **Brief**: A modular, single-page web application that centralizes academic resources, requests, payments, results, and hostel information, while offering AI-enhanced features like a chat assistant, document scanning, predictive analytics, and an automated study plan generator.

### Short Description (for badges / quick-read)

- Centralized Student Resource Portal — React + Vite web app with Supabase backend and AI-driven student features.

---

## Key Features

- **Unified Dashboard**: Quick access to courses, resources, results, payments, and requests.
- **AI Assistant & Recommender**: Chat-based assistant and course/resource recommendations to improve discovery.
- **Document Scanner**: Upload/scan documents and attach them to requests or resources.
- **Predictive Analytics**: Charts and insights to help students anticipate outcomes.
- **Study Plan Generator**: Auto-generated personalized study plans.
- **Accessible UI & Component Library**: Built with Radix UI primitives and a reusable `src/ui/` component set.

## Technology Stack

- **Frontend**: React 18, TypeScript (TSX files), Vite, `@vitejs/plugin-react-swc`
- **UI & Accessibility**: Radix UI packages (dialog, popover, tooltip, etc.), `lucide-react` icons
- **Styling & Utilities**: Tailwind-style approach with `tailwind-merge` utilities and project CSS in `src/styles/`
- **Forms & State**: `react-hook-form`, local React state hooks
- **Animations**: `framer-motion`
- **Charts**: `recharts`
- **Backend / Auth / DB**: Supabase (`@supabase/supabase-js`), server functions in `src/supabase/functions/server/`
- **Other notable libs**: `embla-carousel-react`, `cmdk`, `sonner` notifications

## Architecture & Project Structure

- **Component-driven**: UI primitives live in `src/ui/` and feature pages in `src/components/`.
- **Feature folders**: Each major feature has isolated components for separation of concerns.
- **Supabase-first backend**: Uses Supabase for authentication, persistent storage, and server-side functions.
- **Performance**: Vite-based development for fast feedback and lightweight production builds.

## Impact & Metrics (example wording for README / resume)

- Reduced student time-to-resource by centralizing links and search across courses and departments.
- Increased engagement by providing personalized recommendations and study plans (example metric: +20% resource usage — replace with your actual numbers).
- Improved administrative turnaround by streamlining requests and document uploads.

Include any real metrics you have — even small improvements are impressive to recruiters.

## CI, Testing & Quality (what I added)

- `.github/workflows/ci.yml` — basic CI to run type checking, unit tests, and an e2e smoke test using Playwright.
- `vitest.config.ts` and a sample unit test in `src/__tests__/sample.test.ts` — run with `npm run test`.
- `playwright.config.ts` and a sample e2e test in `playwright/tests/example.spec.ts` — run with `npm run test:e2e` (Playwright requires browsers to be installed).
- `.env.example` — added the required environment variables.

How to run the e2e test locally (recommended to run dev server in a terminal first):

```powershell
npm run dev
# in another terminal
npx playwright install --with-deps
npm run test:e2e
```

## Call to action

- Want me to: create image placeholders in `assets/screenshots/`, generate a `README_FULL.md` with embedded GIFs and badges, or wire up a working Playwright CI step that starts the dev server during the workflow? Tell me which and I will implement it.

  # Centralized Student Resource Portal
  ## Running the code

  Tagline: One portal to discover, manage, and interact with student services — enhanced with AI for smarter study planning and document workflows.

  ---

  **Project Overview**

  - **Name**: Centralized Student Resource Portal
  - **Brief**: A modular, single-page web application that centralizes academic resources, requests, payments, results, and hostel information, while offering AI-enhanced features like a chat assistant, document scanning, predictive analytics, and an automated study plan generator.

  **Short Description (for badges / quick-read)**

  - Centralized Student Resource Portal — React + Vite web app with Supabase backend and AI-driven student features.

  ---

  **Key Features**

  - **Unified Dashboard**: Quick access to courses, resources, results, payments, and requests.
  - **AI Assistant & Recommender**: Chat-based assistant and course/resource recommendations to improve discovery.
  - **Document Scanner**: Upload/scan documents and attach them to requests or resources.
  - **Predictive Analytics**: Charts and insights to help students anticipate outcomes.
  - **Study Plan Generator**: Auto-generated personalized study plans.
  - **Accessible UI & Component Library**: Built with Radix UI primitives and a reusable `src/ui/` component set.

  **Technology Stack**

  - **Frontend**: React 18, TypeScript (TSX files), Vite, `@vitejs/plugin-react-swc`
  - **UI & Accessibility**: Radix UI packages (dialog, popover, tooltip, etc.), `lucide-react` icons
  - **Styling & Utilities**: Tailwind-style approach with `tailwind-merge` utilities and project CSS in `src/styles/`
  - **Forms & State**: `react-hook-form`, local React state hooks
  - **Animations**: `framer-motion`
  - **Charts**: `recharts`
  - **Backend / Auth / DB**: Supabase (`@supabase/supabase-js`), server functions in `src/supabase/functions/server/`
  - **Other notable libs**: `embla-carousel-react`, `cmdk`, `sonner` notifications

  **Architecture & Project Structure**

  - **Component-driven**: UI primitives live in `src/ui/` and feature pages in `src/components/`.
  - **Feature folders**: Each major feature has isolated components for separation of concerns.
  - **Supabase-first backend**: Uses Supabase for authentication, persistent storage, and server-side functions.
  - **Performance**: Vite-based development for fast feedback and lightweight production builds.

  **Developer Quick Start**

  Prerequisites: Node.js (16+) and npm. Create a Supabase project and obtain the project keys.

  Install dependencies:
  ```powershell
  npm i
  ```

  Start development server:
  ```powershell
  npm run dev
  ```

  Build for production:
  ```powershell
  npm run build
  ```

  Environment variables (example):
  ```text
  VITE_SUPABASE_URL=<your-supabase-url>
  VITE_SUPABASE_ANON_KEY=<your-anon-key>
  ```

  Search the codebase for Supabase usage in `src/supabase/` and components that read env keys.

  **Deployment**

  - Build static assets with `npm run build` and host on Vercel, Netlify, or Cloudflare Pages.
  - Ensure Supabase URL and keys are configured in the hosting environment.

  **Resume / Interview Talking Points**

  - Built a production-ready student portal using React, TypeScript, Vite, and Supabase.
  - Designed and implemented AI features (chat assistant, study-plan recommender) to increase personalization.
  - Implemented accessible, reusable UI components using Radix UI and a component library in `src/ui/`.
  - Added analytics visualizations with `recharts` and smooth UX using `framer-motion`.

 

  
  