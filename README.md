# MriyaFoods 🌾 — Premium Food & Grocery E-Commerce Platform

A high-performance, modern Next.js e-commerce application tailored for premium food delivery. This platform is built with a scalable architectural pattern, strict type-safety, Figma-aligned custom UI tokens, and secure payment integrations, including a fully implemented Stripe test payment flow.

---

## 🚀 Core Features

- 🔐 **Authentication**: Secure user login, signup, and persistent session management powered by Supabase Auth.
- 📦 **Dynamic Catalog**: Interactive product grid with client-side filtering by category, search queries, brand, and real-time stock status sync.
- 🛒 **Persistent Shopping Cart**: Global state-managed shopping cart utilizing Redux Toolkit (RTK) and `redux-persist` for automatic local storage synchronization.
- 📋 **Advanced Checkout Flow**: Multi-step checkout form utilizing client-side validations via `React Hook Form` and `Zod` schemas.
- 💳 **Secure Payment Gateway**: Multi-method checkout processing via Stripe Elements (supporting both **Credit/Debit Cards** and **PayPal**), backed by strict server-side price verification to prevent client-side data tampering. **Stripe Test Mode is fully configured for card and PayPal sandbox payments.**

---

## 🛠 Tech Stack

| Layer                  | Technologies Used                                                      |
| ---------------------- | ---------------------------------------------------------------------- |
| **Frontend Core**      | Next.js 16+ (App Router), React 19, TypeScript (Strict Mode)           |
| **State Management**   | Redux Toolkit (RTK), Redux Persist                                     |
| **Styling & Icons**    | CSS Modules (Figma-aligned design tokens), Lucide React                |
| **Backend & Database** | Supabase (PostgreSQL), Row Level Security (RLS)                        |
| **Payment Processing** | Stripe Node SDK, `@stripe/react-stripe-js` (PayPal & Card Integration) |
| **Validation & Forms** | React Hook Form, Zod                                                   |

---

## 📐 Architectural Methodology (Feature-Sliced Design)

The codebase strictly adheres to the **Feature-Sliced Design (FSD)** architectural methodology, dividing responsibilities into clear conceptual layers:

- 📂 `src/app/` — Root setup, global styles, providers (Redux, Persist, Theme), and Next.js routing structure.
- 📂 `src/pages/` — Composition layer where widgets and features are assembled into full pages (Home, Catalog, Cart, Checkout).
- 📂 `src/widgets/` — Complex, self-contained UI blocks (e.g., `Header`, `ProductCarousel`, `DeliveryMap`, `OrderSummary`).
- 📂 `src/features/` — Interactive user actions yielding business value (e.g., `auth-by-email`, `filter-products`, `pay-by-stripe`).
- 📂 `src/entities/` — Business logic, storage slices, and dumb components representing domain objects (e.g., `ProductCard`, `CartItem`, `Theme`).
- 📂 `src/shared/` — Domain-agnostic reusable helpers, custom hooks, API clients (`supabaseClient`), and design tokens (`variables.css`).

---

## 🔑 Environment Variables Config

Create a `.env.local` file in the root of the project and populate it with the following keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

---

## ⚙️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

### 3. Build & Lint for Production

```bash
# Run ESLint validation
npm run lint

# Compile production-optimized bundle
npm run build
```

---

## 🔒 Security & PCI Compliance Note

- **PCI Compliance**: All payment operations use **Stripe Elements**, meaning card numbers and sensitive data are tokenized directly on Stripe's secure infrastructure. Card details never touch our Next.js application servers.
- **Server-Side Price Verification**: To prevent fraud or client-side tampering, final checkout prices are recalculated and verified on the server using Supabase product data before a Stripe PaymentIntent is created.
- **Database Security**: Supabase tables are secured with Row Level Security (RLS) policies, ensuring users can only read/write their own profiles, carts, and order histories.

---

## 💳 Testing Payments (Stripe Test Mode)

To test the payment integrations, you can use standard Stripe sandbox credentials in the checkout form:

- **Test Card Number**: `4242 4242 4242 4242`
- **Expiry Date**: Any future date (e.g., `12/30`)
- **CVC**: Any 3-digit number (e.g., `123`)
