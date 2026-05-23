# 🛒 Amazon Clone — SDE Intern Fullstack Assignment

> A fully functional Amazon-inspired e-commerce web application built with **Next.js**, **TypeScript**, **Redux Toolkit**, **Tailwind CSS**, **Supabase**, and **Resend**.

<p align="center">
  <a href="https://amazone-clone-kappa-flax.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo"/>
  </a>
  &nbsp;
  <a href="https://github.com/ayushbhardwaj552/Amazone-Clone" target="_blank">
    <img src="https://img.shields.io/badge/📦%20GitHub%20Repo-181717?style=for-the-badge&logo=github" alt="GitHub Repo"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8.2-blue?style=flat-square&logo=typescript"/>
  <img src="https://img.shields.io/badge/Redux%20Toolkit-2.6.1-764abc?style=flat-square&logo=redux"/>
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38bdf8?style=flat-square&logo=tailwind-css"/>
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=flat-square&logo=supabase"/>
</p>

---

## 📌 Assignment Overview

Build a functional e-commerce web application that closely replicates **Amazon's design and user experience** — including product browsing, cart management, and order placement — with a clean responsive UI and real backend integration.

---

## 🔗 Quick Links

| 🔖 Resource | 🌐 URL |
|---|---|
| 🚀 Live Application | [amazone-clone-kappa-flax.vercel.app](https://amazone-clone-kappa-flax.vercel.app/) |
| 📁 GitHub Repository | [github.com/ayushbhardwaj552/Amazone-Clone](https://github.com/ayushbhardwaj552/Amazone-Clone) |

---

## 🎯 Assignment Compliance — Evaluator Matrix

| ✅ Requirement | 🛠️ Implementation | 📂 Codebase Location |
|---|---|---|
| 🗂️ **Product Listing Page** | Responsive Amazon-style grid with search, category filter, ratings & badges | `src/components/ProductListing.tsx` |
| 🔍 **Product Detail Page** | Embla carousel, stock status, delivery estimates, Add to Cart & Buy Now | `src/app/product/[id]/page.tsx` |
| 🛒 **Shopping Cart** | Quantity controls, item removal, real-time subtotal & total calculations | `src/app/cart/page.tsx` |
| 📦 **Order Placement** | Address form + validation, order summary, Supabase persistence, Order ID | `src/app/checkout/page.tsx` |
| 🗄️ **Database Schema** | Normalized PostgreSQL schema with Products & Orders tables | [Schema Section ↓](#️-database-schema) |
| 📱 **Responsive Design** ⭐ | Fully fluid across mobile, tablet, and desktop via Tailwind utilities | Global Tailwind config |
| 🔐 **User Auth** ⭐ | Supabase Auth — Login, Signup, and session persistence | `src/app/auth/` |
| ❤️ **Wishlist** ⭐ | Client-side wishlist slice via Redux Toolkit with persistent state | `src/redux/wishlistSlice.ts` |
| 📧 **Email Notifications** ⭐ | Styled HTML order receipts sent via Resend API on every order | `src/lib/email/sendOrderEmail.ts` |
| 🕓 **Order History** ⭐ | Full past orders page linked to Supabase orders table | `src/app/orders/page.tsx` |

> ⭐ = Bonus feature

---

## ✨ Core Features

### 🗂️ 1. Product Listing Page
- Responsive product grid matching Amazon's layout
- Product cards with image, title, price, rating, discount badge & **Add to Cart**
- 🔎 Smart search across title, description, and category
- ⚡ Instant client-side category filtering

### 🔍 2. Product Detail Page
- 🖼️ Multi-image Embla carousel with thumbnail navigation
- Detailed description, feature list, rating & review count
- Live stock status + estimated delivery date
- **Add to Cart** and **Buy Now** actions

### 🛒 3. Shopping Cart
- Full cart overview with line-item details
- Quantity update controls + remove-item support
- 💰 Real-time subtotal, delivery fee & total calculations
- Persisted via `redux-persist` — survives page refreshes

### 📦 4. Order Placement
- Checkout page with shipping address form & validation
- Order summary review before placing
- Order stored in Supabase on confirmation
- ✅ Confirmation page shows unique **Order ID**

---

## 🌟 Bonus Features

| 🏆 Feature | 📌 Details | ✔️ Status |
|---|---|---|
| 📱 Responsive Design | Mobile, Tablet & Desktop | ✅ Done |
| 🔐 User Authentication | Login / Signup via Supabase Auth | ✅ Done |
| ❤️ Wishlist | Redux Toolkit — persistent client-side | ✅ Done |
| 🕓 Order History | Past orders from Supabase | ✅ Done |
| 📧 Confirmation Email | Styled HTML via Resend API | ✅ Done |

---

## 🧠 Tech Stack

| 🔧 Layer | ⚙️ Technology |
|---|---|
| 🖥️ **Frontend** | Next.js 16.2.6 (App Router) |
| 📝 **Language** | TypeScript |
| 🗃️ **State Management** | Redux Toolkit + React Redux + redux-persist |
| 🎨 **Styling** | Tailwind CSS + Tailwind Animations |
| 🗄️ **Backend / Database** | Supabase (PostgreSQL) |
| 📧 **Email Service** | Resend API |
| 💳 **Checkout** | Stripe client integration |
| 🔌 **HTTP / API** | Axios + Next.js API Routes |

---

## 🏗️ Architecture Overview

```
🌐 User Request
       │
       ▼
 Next.js App Router  ──────────────────────────────────┐
       │                                               │
       ├── 🗄️  Supabase ── Products table (catalog)    │
       │                └── Orders table (persistence) │
       │                                               │
       ├── 🗃️  Redux Toolkit ── Cart slice              │
       │                     └── Wishlist slice        │
       │                                               │
       └── 📧 Resend API ── Order confirmation emails  │
                                                       │
       ◄──────────── Next.js API Routes ───────────────┘
```

- Product data fetched from **Supabase** and rendered in the UI
- Cart & wishlist managed in **Redux**, persisted to LocalStorage
- Orders created via `src/app/api/orders/route.ts` and stored in Supabase
- Emails triggered via `src/lib/email/sendOrderEmail.ts`
- Guest checkout supported — **no login required** to place orders

---

## 🗄️ Database Schema

### 📦 `Products` — Product catalog & visual metadata

| 🏷️ Column | 📐 Type | 📝 Notes |
|---|---|---|
| `id` | `INTEGER` | 🔑 Primary key |
| `title` | `VARCHAR` | Required |
| `price` | `NUMERIC` | Required |
| `originalPrice` | `NUMERIC` | Optional — used for discount badge |
| `description` | `TEXT` | Required |
| `category` | `VARCHAR` | Required |
| `image` | `TEXT` | Primary thumbnail URL |
| `images` | `JSONB` | Array of carousel image URLs |
| `rating` | `JSONB` | `{ rate, count }` metadata |
| `badge` | `VARCHAR` | Optional promo tag (e.g. Best Seller) |
| `inStock` | `BOOLEAN` | Defaults to `TRUE` |
| `deliveryDays` | `INTEGER` | Defaults to `3` |

### 🧾 `Orders` — Completed customer orders

| 🏷️ Column | 📐 Type | 📝 Notes |
|---|---|---|
| `order_id` | `VARCHAR` | 🔑 Primary key |
| `email` | `VARCHAR` | Customer email |
| `shipping_address` | `JSONB` | Full address payload |
| `items` | `JSONB` | Cart line items, prices & quantities |
| `subtotal` | `NUMERIC` | Pre-shipping total |
| `delivery_fee` | `NUMERIC` | Shipping fee |
| `total` | `NUMERIC` | Final order total |
| `status` | `VARCHAR` | Defaults to `"confirmed"` |
| `created_at` | `TIMESTAMP` | Defaults to `NOW()` |

---

## 🧩 Project Structure

```
amazon-clone/
├── 📁 src/
│   ├── app/                    # App Router pages + API route handlers
│   │   ├── api/                # Order placement & Stripe endpoints
│   │   ├── auth/               # Supabase auth callbacks
│   │   ├── cart/               # 🛒 Shopping Cart page
│   │   ├── checkout/           # 📦 Checkout & address validation
│   │   ├── order-confirmation/ # ✅ Order success page
│   │   ├── orders/             # 🕓 Order history page
│   │   └── product/            # 🔍 Dynamic product detail page
│   ├── components/             # ♻️ Reusable UI components
│   ├── hooks/                  # 🪝 Custom React hooks
│   ├── lib/                    # 🛠️ Supabase helpers, email, types
│   └── redux/                  # 🗃️ Store, cart slice, wishlist slice
└── 📁 public/                  # Static assets & media
```

---

## ⚙️ Environment Setup

Copy `.env.example` → `.env.local` and fill in:

```env
# 🗄️ Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# 📧 Resend Email
EMAIL_USER=user_email_id
EMAIL_PASS=user_email_password(2-factor-authentication)


```

> ⚠️ Missing credentials? No problem — the app auto-switches to local mock data so all features still work for evaluation.

---

## 🚀 Run Locally

```bash
# 1️⃣ Clone the repo
git clone https://github.com/ayushbhardwaj552/Amazone-Clone.git
cd Amazone-Clone

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start dev server
npm run dev
```

🎉 Visit [http://localhost:3000](http://localhost:3000)

---

## 📦 Available Scripts

| 💻 Script | 📋 Description |
|---|---|
| `npm run dev` | 🔧 Start development server |
| `npm run build` | 🏗️ Build for production |
| `npm start` | 🚀 Start production server |
| `npm run lint` | 🧹 Run ESLint checks |

---

## ☁️ Deployment

Deployed on **Vercel**. To deploy your own:

1. Push to a public GitHub repo
2. Import into [Vercel](https://vercel.com) → set framework to **Next.js**
3. Add environment variables in Project Settings
4. Deploy from `main` branch ✅

> Also compatible with **Netlify**, **Render**, and **Railway**.

---

## 🧪 Testing Checklist

| 🧪 Test | 🔍 What to Verify |
|---|---|
| 🔎 Product Search | Search by name/category — results update correctly |
| 🗂️ Category Filter | Click a category — grid filters instantly |
| 🖼️ Product Detail | Carousel works, stock & delivery info display |
| 🛒 Add to Cart | Item appears in cart, quantity & total update |
| ♻️ Cart Persistence | Refresh page — cart items remain |
| 📦 Checkout | Fill address, place order, see Order ID |
| 🕓 Order History | Placed order appears in `/orders` page |
| 📧 Email (optional) | Configure Resend — receipt email delivered |

---

## 💡 Assumptions

- Checkout works **without login** (guest orders fully supported)
- Missing env credentials fall back to local mock product data
- Product catalog is seeded as sample items across multiple categories
- UI follows Amazon's patterns while remaining original work

---

## 📝 Notes

- Uses **Next.js API Routes + Supabase** instead of a separate Express backend
- Supabase RLS (Row Level Security) must allow read on `Products` and full access on `Orders`
- AI tools (Claude, GitHub Copilot) assisted development — all code is understood and explainable

---

