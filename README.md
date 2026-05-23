# Amazon Clone — SDE Intern Fullstack Assignment

A fully functional Amazon-inspired e-commerce web application built with Next.js App Router, TypeScript, Redux Toolkit, Tailwind CSS, Supabase, and Resend.

---

## 📌 Assignment Summary
Build a functional e-commerce web application that closely replicates Amazon's design and user experience. This project includes product browsing, cart management, checkout and order placement, with a clean responsive UI and real backend integration.

---

## 🚀 Live Demo & Repository
* **GitHub Repository:** [https://github.com/ayushbhardwaj552/amazon-clone](https://github.com/ayushbhardwaj552/amazon-clone)
* **Deployed Web Application:** *(Insert deployed URL here)*

---

## ✅ Core Features Implemented

### 1. Product Listing Page
* Responsive product grid matching Amazon-like layout.
* Product cards displaying image, title, price, rating, discount badge, and Add to Cart button.
* Search box supporting queries across product title, description, and category.
* Category filtering and client-side product browsing.

### 2. Product Detail Page
* Multi-image carousel with thumbnail navigation.
* Detailed product description and feature list.
* Price, rating, review count, stock status, and delivery estimate.
* Add to Cart and Buy Now actions.

### 3. Shopping Cart
* Full cart overview with line-item details.
* Quantity update controls and remove-item support.
* Cart subtotal, delivery, and order total calculations.
* Realtime UI updates when cart contents change.

### 4. Order Placement
* Checkout page with shipping address form and validation.
* Order summary review before placing the order.
* Order placement persists the order to Supabase.
* Order confirmation page displays generated Order ID.

---

## 🌟 Bonus Features Included
* Responsive design for mobile, tablet, and desktop.
* Supabase Auth integration for login and signup flows.
* Wishlist functionality managed with Redux Toolkit.
* Order history page for past purchases.
* Order confirmation email notifications via Resend API.

---

## 🧠 Tech Stack
* **Frontend:** Next.js 16.2.6 (App Router)
* **Language:** TypeScript
* **State Management:** Redux Toolkit + React Redux
* **Styling:** Tailwind CSS + Tailwind Animations
* **Backend / Database:** Supabase (PostgreSQL)
* **Email Service:** Resend API
* **Payment / Checkout:** Stripe client integration
* **HTTP / API:** Axios, Next.js API Routes

---

## 🏗️ Architecture Overview
* Product data is fetched from Supabase and rendered in the UI.
* Cart and wishlist state is managed in Redux and persisted locally.
* Orders are created through `src/app/api/orders/route.ts` and stored in Supabase.
* Confirmation emails are triggered by `src/lib/email/sendOrderEmail.ts` using Resend.
* Checkout and guest order placement are supported without forcing login.

---

## 🗄️ Database Schema

### `Products`
Stores product catalog and visual metadata.

| Column | Type | Notes |
|---|---|---|
| `id` | `INTEGER` | Primary key |
| `title` | `VARCHAR` | Required |
| `price` | `NUMERIC` | Required |
| `originalPrice` | `NUMERIC` | Optional discount price |
| `description` | `TEXT` | Required |
| `category` | `VARCHAR` | Required |
| `image` | `TEXT` | Primary image URL |
| `images` | `JSONB` | Additional carousel images |
| `rating` | `JSONB` | `{ rate, count }` metadata |
| `badge` | `VARCHAR` | Optional promotional tag |
| `inStock` | `BOOLEAN` | Defaults to `TRUE` |
| `deliveryDays` | `INTEGER` | Defaults to `3` |

### `Orders`
Tracks completed orders placed by customers.

| Column | Type | Notes |
|---|---|---|
| `order_id` | `VARCHAR` | Primary key |
| `email` | `VARCHAR` | Customer email |
| `shipping_address` | `JSONB` | Address payload |
| `items` | `JSONB` | Cart line items and pricing |
| `subtotal` | `NUMERIC` | Pre-shipping total |
| `delivery_fee` | `NUMERIC` | Shipping fee |
| `total` | `NUMERIC` | Final order total |
| `status` | `VARCHAR` | Defaults to `confirmed` |
| `created_at` | `TIMESTAMP` | Defaults to `NOW()` |

---

## ⚙️ Environment Setup
Copy `.env.example` to `.env` and configure the following:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

RESEND_API_KEY=re_your_api_key_here
ORDER_EMAIL_FROM=Amazon <orders@yourdomain.com>
```

> If email credentials are missing, order placement still works; the app logs a warning and continues.

---

## 🚀 Run Locally

```bash
git clone https://github.com/ayushbhardwaj552/amazon-clone.git
cd amazon-clone
npm install
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000).

---

## 📦 Available Scripts
* `npm run dev` — Start the development server
* `npm run build` — Build the production-ready app
* `npm start` — Start the production server
* `npm run lint` — Run ESLint

---

## 🧩 Project Structure
* `src/app/` — Main App Router pages, layouts, styles, and route handlers.
* `src/components/` — Reusable UI components for product cards, cart, header, footer, and order views.
* `src/lib/` — Application utilities, Supabase helpers, email templates, and type definitions.
* `src/redux/` — Redux store setup, cart slice, wishlist slice, and persistence logic.
* `src/hooks/` — Custom hooks for Supabase, auth, and Redux integration.
* `public/` — Static assets and public media files.

---

## ☁️ Deployment
This app can be deployed on Vercel, Netlify, Render, or Railway.

Deployment checklist:
* Push the project to a public GitHub repository.
* Configure environment variables in the chosen platform:
  * `NEXT_PUBLIC_SUPABASE_URL`
  * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  * `RESEND_API_KEY`
  * `ORDER_EMAIL_FROM`
* Use `npm run build` to verify production build success.
* Deploy the `main` or `production` branch from GitHub to the platform.

If deploying to Vercel, set the project framework to `Next.js` and add the above environment values in Project Settings.

---

## 🧪 How to Test
1. Run the app locally: `npm run dev`
2. Open `http://localhost:3000`
3. Verify product browsing:
   * Search products by name
   * Filter by category
   * Open a product detail page
4. Verify product details:
   * Image carousel works
   * Product information and stock status display correctly
   * Add to Cart and Buy Now actions function
5. Verify cart behavior:
   * Update quantity
   * Remove items
   * See subtotal and total update correctly
6. Verify checkout and order placement:
   * Fill shipping details
   * Place an order
   * Confirm order ID shown on confirmation page
7. Optional email test:
   * Configure Resend credentials
   * Place an order and confirm the receipt email is sent

---

## 🎯 Assignment Compliance
This submission is designed to satisfy the SDE intern fullstack assignment by implementing:
* Product listing and search
* Product detail page with carousel
* Cart management with quantity updates and removal
* Checkout flow with shipping address capture
* Order placement and confirmation
* Responsive layout across devices
* Database-backed order persistence
* Email notification on order placement

---

## 💡 Assumptions
* Auth is available, but checkout works without requiring login.
* Orders are stored in Supabase and can be viewed through order history.
* Product data is seeded as sample catalog items.
* UI is designed to resemble Amazon patterns while remaining original.

---

## 📌 Notes
* This app uses Next.js API routes and Supabase rather than a separate Express backend.
* The project is intended as a fullstack prototype for the internship assignment.
* Make sure Supabase table names and permissions are configured correctly for `Products` and `Orders`.

---

## 📚 Ready for Evaluation
This README includes setup instructions, the tech stack, database design, feature mapping, and deployment notes required for the assignment evaluation.
