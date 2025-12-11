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

 