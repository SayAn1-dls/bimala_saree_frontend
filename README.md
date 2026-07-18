# \u09ac\u09bf\u09ae\u09b2 \u09b6\u09be\u09dc\u09c0 \u09b8\u09cd\u099f\u09cb\u09b0 \u2014 Bimala Saree Store

A premium, market-ready e-commerce frontend for **Bimala Saree Store** \u2014 an authentic handloom saree shop.  
Built with React, TypeScript, Tailwind CSS, and Shadcn-UI.

---

## \u2728 Features

### \ud83d\udd10 Authentication (Supabase)
- **Email / Password** sign-up and sign-in
- **Google OAuth** one-click login
- **Facebook OAuth** one-click login
- **Phone OTP** login via SMS
- Graceful **mock mode** when Supabase keys are not configured

### \ud83d\udcb3 Payments (Razorpay)
- Razorpay Standard Checkout integration
- Supports UPI, Cards, Net Banking, Wallets
- Demo mode auto-simulation when Razorpay key is absent

### \ud83d\udc57 Virtual Try-On
- Upload your photo and overlay any saree
- Drag, zoom, and adjust opacity of the saree overlay
- Mobile-friendly with touch support

### \ud83c\udf10 Bengali / English Language Toggle
- One-click language toggle in the Navbar (Globe icon)
- All key UI strings available in both English and Bengali
- Product Bengali names (`nameBn`) used throughout

### \ud83d\uded2 Full E-Commerce Flow
- Product listing, filtering, and sorting
- Detailed product pages with image gallery
- Cart management with coupon support
- Multi-step checkout (Cart \u2192 Address \u2192 Payment)

---

## \ud83d\udee0 Tech Stack

| Layer        | Technology                     |
| ------------ | ------------------------------ |
| Framework    | React 18 + TypeScript          |
| Build        | Vite                           |
| Styling      | Tailwind CSS + Shadcn-UI       |
| Auth         | Supabase Auth                  |
| Payments     | Razorpay Standard Checkout     |
| State        | React Query, React Context     |
| Routing      | React Router v6                |

---

## \ud83d\ude80 Getting Started

### Prerequisites
- Node.js \u2265 18
- npm or pnpm

### Install & Run

```bash
# Clone the repository
git clone https://github.com/SayAn1-dls/bimala_saree_frontend.git
cd bimala_saree_frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## \ud83d\udd11 Environment Variables

Create a `.env` file in the project root:

```env
# \u2500\u2500 Supabase Auth \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhb...your-anon-key

# \u2500\u2500 Razorpay Payments \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXX
```

> **Note:** The app works in **mock / demo mode** without these keys \u2014 auth buttons show toast notifications and payment is simulated. Set the keys when you're ready to go live.

### Supabase Setup
1. Create a project at [supabase.com](https://supabase.com)
2. Enable the following auth providers in Dashboard \u2192 Authentication \u2192 Providers:
   - Email
   - Google (add OAuth client ID & secret)
   - Facebook (add App ID & secret)
   - Phone (configure an SMS provider like Twilio)
3. Copy your Project URL and anon key into `.env`

### Razorpay Setup
1. Create an account at [razorpay.com](https://razorpay.com)
2. Navigate to Settings \u2192 API Keys
3. Generate a test key and copy the Key ID into `.env`

---

## \ud83d\udcc1 Project Structure

```
src/
\u251c\u2500\u2500 App.tsx                           # Root with providers
\u251c\u2500\u2500 lib/
\u2502   \u251c\u2500\u2500 data.ts                       # Static saree product data
\u2502   \u251c\u2500\u2500 supabase.ts                   # Supabase client (env-aware)
\u2502   \u2514\u2500\u2500 utils.ts                      # Tailwind merge utility
\u251c\u2500\u2500 hooks/
\u2502   \u251c\u2500\u2500 useAuth.tsx                   # Auth context & provider
\u2502   \u2514\u2500\u2500 use-toast.ts                  # Toast hook
\u251c\u2500\u2500 contexts/
\u2502   \u2514\u2500\u2500 LanguageContext.tsx           # Bengali / English toggle
\u251c\u2500\u2500 components/
\u2502   \u251c\u2500\u2500 layout/
\u2502   \u2502   \u251c\u2500\u2500 Navbar.tsx                # Nav with language toggle
\u2502   \u2502   \u2514\u2500\u2500 Layout.tsx                # Page wrapper
\u2502   \u251c\u2500\u2500 product/
\u2502   \u2502   \u2514\u2500\u2500 VirtualTryOn.tsx          # Photo upload + saree overlay
\u2502   \u2514\u2500\u2500 ui/                           # Shadcn-UI primitives
\u251c\u2500\u2500 pages/
\u2502   \u251c\u2500\u2500 Index.tsx                     # Home page
\u2502   \u251c\u2500\u2500 Shop.tsx                      # Product listing
\u2502   \u251c\u2500\u2500 ProductDetail.tsx             # Single product + Virtual Try-On
\u2502   \u251c\u2500\u2500 Checkout.tsx                  # Cart + Razorpay payment
\u2502   \u251c\u2500\u2500 Login.tsx                     # Login (Email, Phone, Social)
\u2502   \u251c\u2500\u2500 Register.tsx                  # Registration
\u2502   \u251c\u2500\u2500 Contact.tsx                   # Contact form
\u2502   \u2514\u2500\u2500 NotFound.tsx                  # 404
\u2514\u2500\u2500 assets/                           # Saree images
```

---

## \ud83d\udcdd Key Files Changed (Market-Ready Refactor)

| File | What Changed |
| ---- | ------------ |
| `src/lib/supabase.ts` | New \u2014 Supabase client with env-aware mock fallback |
| `src/hooks/useAuth.tsx` | New \u2014 Auth context with email, Google, Facebook, Phone OTP |
| `src/contexts/LanguageContext.tsx` | New \u2014 Bengali/English i18n context |
| `src/components/product/VirtualTryOn.tsx` | New \u2014 Photo upload + draggable saree overlay |
| `src/pages/Login.tsx` | Refactored \u2014 Supabase auth with email & phone OTP tabs |
| `src/pages/Register.tsx` | Refactored \u2014 Supabase signup with social buttons |
| `src/pages/Checkout.tsx` | Refactored \u2014 Razorpay Standard Checkout integration |
| `src/pages/ProductDetail.tsx` | Modified \u2014 Added VirtualTryOn component + i18n strings |
| `src/components/layout/Navbar.tsx` | Modified \u2014 Added language toggle (Globe icon) |
| `src/App.tsx` | Modified \u2014 Wrapped with AuthProvider & LanguageProvider |

---

## \ud83d\udcc4 License

This project is private. All rights reserved.
