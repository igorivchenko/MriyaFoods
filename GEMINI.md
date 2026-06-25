# GEMINI.md

## Project: MriyaFoods

A modern, high-performance e-commerce store featuring a pixel-perfect custom UI, robust
architecture, and stellar user experience.

### Primary Goals

- **Pixel-Perfect Execution:** Strict alignment and literal translation of the Figma layout.
- **SEO-Native:** Server-Side Rendering (SSR) and proper metadata management for optimal
  indexability.
- **Blazing Fast Performance:** Immediate load times and smooth interaction.
- **Scalable Architecture:** Clean code separation to allow seamless feature scaling.
- **Zero Technical Debt:** Strict linting, type-safety, and refusal of low-quality abstractions.

---

## Tech Stack

### Frontend

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** CSS Modules, `clsx` (dynamic class names)
- **Icons:** `lucide-react` (SVG icon library)
- **Toasts:** `react-hot-toast` (accessible notifications)
- **Loaders:** `react-spinners` (loading states)
- **Animation:** Framer Motion (GPU-friendly transitions)
- **Form Management:** React Hook Form
- **Validation:** Zod
- **State Management:** Redux Toolkit + Redux Thunk
- **Carousels:** Swiper (mobile touch-gestures & loop)

### Backend & Infrastructure

- **BaaS:** Supabase (Auth, PostgreSQL, Storage with dynamic resizing)

---

## Architecture: Feature-Sliced Design (FSD)

### Layer Directory (`src/`)

- `app/` — Next.js routing configuration, global layouts, styles, and application providers.
- `pages/` — Composition layer; builds full page layouts out of widgets and features.
- `widgets/` — Self-contained, monolithic UI blocks (e.g., `Header`, `ProductGrid`).
- `features/` — User interactions that bring business value (e.g., `AddToCart`, `FilterProducts`).
- `entities/` — Business logic and basic UI representing core domains (e.g., `Product`, `Cart`,
  `User`).
- `shared/` — Reusable, domain-agnostic code (`ui/` components, `api/` clients, `lib/` helpers).

### Core Architectural Rules

1. **UI is Dumb:** Presentational components must not contain decoupled business logic.
2. **API Isolation:** Database and API interaction must live strictly within `shared/api` or
   domain-specific services.
3. **Unidirectional Dependencies:** Higher layers can import from lower layers, never vice versa
   (e.g., `entities` cannot import from `features`).
4. **Shared Autonomy:** Code inside `shared/` must possess absolutely zero knowledge of higher
   layers or specific features.

---

## UI Implementation Rules

- **No Component Libraries:** Do not use Tailwind, MUI, or pre-made UI templates. Write custom,
  modular CSS matching Figma literally.
- **Semantic & Accessible:** Enforce semantic HTML elements (`<main>`, `<nav>`, `<article>`).
  Guarantee basic ARIA standards and keyboard accessibility.
- **Mobile-First Responsive Design:** Build responsive layouts starting from mobile breakpoints
  upward.
- **Typography Consistency:** Utilize a distinct hierarchy based on Next.js integrated Google/local
  fonts to prevent Layout Shifts (CLS).
- **Meaningful Animation:** Limit animations to meaningful feedback (150–350ms duration). Rely
  exclusively on hardware-accelerated properties (`transform`, `opacity`).

---

## Performance Targets & Optimization

### Core Web Vitals (Target)

- **Lighthouse Score:** > 90
- **First Contentful Paint (FCP):** < 2.0s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1

### Rules for Execution

- **Next Image Optimization:** Never use the raw `<img>` tag. Utilize `next/image` for automatic
  WebP/Avif formatting, lazy loading, and responsive sizing. Use `priority` for LCP elements (e.g.,
  hero banners).
- **Dynamic Imports:** Use `next/dynamic` with `ssr: false` to lazy-load heavy client-side features,
  modals, or intensive components.
- **Data Fetching:** Maximize Server Components for data fetching to offload processing from the
  client and supercharge SEO.
- **State Isolation:** Ensure the Redux Store is instantiated per-request inside a specialized
  `StoreProvider` to avoid data cross-contamination between users in SSR.

---

## Code Quality & Dev Workflow

### Guidelines

- **Strict TypeScript:** No `any`, no unsafe type assertions.
- **Pre-Commit Guardrails:** Automated linting and formatting via `ESLint`, `Prettier`, `Husky`, and
  `lint-staged`.

### Workflow Steps

1. **Figma Design → Shared UI Components** (Atom level)
2. **Data Structure → Entities** (Data definitions & basic cards)
3. **User Interaction → Features** (State & forms integration)
4. **Composition → Widgets & Pages** (Putting it together)
5. **Optimization → Light House Audit & Refinement** (Fine-tuning performance)
