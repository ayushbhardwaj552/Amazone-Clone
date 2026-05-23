# Amazon Clone — Fullstack E-Commerce Platform

A premium, pixel-perfect Amazon-inspired e-commerce platform built with Next.js (App Router), TypeScript, Redux Toolkit, Tailwind CSS, and Supabase.

---

## 🚀 Live Demo & Repository
* **GitHub Repository:** [https://github.com/ayushbhardwaj552/amazon-clone](https://github.com/ayushbhardwaj552/amazon-clone)
* **Deployed Web Application:** *(Insert Deployed URL Here)*

---

## ✨ Features Implemented

### 1. Product Listing Page (Must Have)
* **Responsive Layout:** A fluid grid displaying products in responsive card designs (`grid-cols-2` on mobile, scaling up to `grid-cols-4` on widescreen desktop) matching Amazon’s clean styling.
* **Product Cards:** Visual items displaying the Product Image, Title (line-clamp), Ratings & review counts, Price with M.R.P. discount badges, Prime availability indicators, and an instant **Add to Cart** button.
* **Search Functionality:** An integrated navigation header search bar allowing instant product queries across titles, descriptions, and categories.
* **Category & Price Filters:** Interactive sidebar controls to filter by department category (Electronics, Apparel, Jewelry) and specific price ranges (Under ₹500, ₹500–₹2,000, etc.), with averages customer reviews filter.

### 2. Product Detail Page (Must Have)
* **Interactive Image Carousel:** A functional gallery displaying multiple high-quality angles of items using a click-triggered thumbnail panel.
* **Descriptions & Specs:** Detailed specifications showing reviews, rating breakdowns, and structured "About this item" descriptions.
* **Buy Box & Stock Status:** Live stock indicator ("In Stock") accompanied by standard delivery timelines and details.
* **Buy Now & Add to Cart:** A dynamic checkout panel supporting custom quantities (1-10) with reactive "Update Cart" labels and a direct "Buy Now" checkout bypass.

### 3. Shopping Cart (Must Have)
* **Dynamic Cart View:** Full overview of items, supporting quick quantity adjustments and item removals in real-time.
* **Interactive Summary:** Dynamic calculations of items, subtotal, and tax thresholds matching Amazon's layout patterns.
* **Gift Packaging:** Supports optional "This is a gift" tag options on a per-item basis.

### 4. Checkout & Order Placement (Must Have)
* **Shipping Address Form:** Input validations for First Name, Last Name, Street Address, City, Postal Codes, and Mobile numbers.
* **Order Summary Review:** Visual review panel containing summary breakdowns (subtotal, shipping fees, grand totals) prior to final placement.
* **Order Placement Integration:** Interactive database transactions that issue specific confirmation receipts.
* **Confirmation Page:** High-fidelity receipt view outlining items, estimated shipping dates, and displaying a unique, generated Order ID (`ORD-XXXXX-XXXX`).

### 5. Good-to-Have (Bonus Features)
* **Responsive Design:** Pixel-perfect views optimized for mobile, tablet, and desktop viewports using Vanilla Tailwind styling.
* **User Authentication:** Integrated with **Supabase Auth** (supporting email-based signup, sign-in, and sign-out states).
* **Order History:** A dedicated historical list page showing all historical purchases by merging local browser sessions (`localStorage`) and remote API records.
* **Wishlist Functionality:** Full Redux-based saved lists panel containing add-to-wishlist triggers on card structures.
* **Email Receipt Notifications:** Fully integrated with the **Resend API** to trigger stylized HTML order confirmations to customers on checkout.

---

## 🗄️ Database Schema Design

The backend database utilizes two primary relational tables designed in PostgreSQL and hosted on **Supabase**:

### 1. `Products` Table
Stores catalog item properties:

| Column Name | Data Type | Key / Attribute | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | Primary Key | Unique catalog identifier. |
| `title` | `VARCHAR` | Not Null | The title of the product. |
| `price` | `NUMERIC` | Not Null | Selling price of the item. |
| `originalPrice` | `NUMERIC` | Optional | M.R.P. listing price used for discounts. |
| `description` | `TEXT` | Not Null | Specifications and description text. |
| `category` | `VARCHAR` | Not Null | Catalog department index (e.g., `electronics`). |
| `image` | `TEXT` | Not Null | Primary showcase image URL. |
| `images` | `JSONB` | Optional | Array of additional image URLs for the carousel. |
| `rating` | `JSONB` | Not Null | Contains properties: `{ "rate": 4.5, "count": 120 }`. |
| `badge` | `VARCHAR` | Optional | Highlights tags (e.g., `Best Seller`, `Limited Deal`). |
| `inStock` | `BOOLEAN` | Default `TRUE` | Stock availability state. |
| `deliveryDays` | `INTEGER` | Default `3` | Expected shipment period. |

### 2. `Orders` Table
Tracks customer purchases:

| Column Name | Data Type | Key / Attribute | Description |
| :--- | :--- | :--- | :--- |
| `order_id` | `VARCHAR` | Primary Key | Structured transaction receipt ID. |
| `email` | `VARCHAR` | Indexed | Customer email mapping orders. |
| `shipping_address`| `JSONB` | Not Null | Serialized address object. |
| `items` | `JSONB` | Not Null | Ordered array containing IDs, quantities, prices, etc. |
| `subtotal` | `NUMERIC` | Not Null | Total price before shipping. |
| `delivery_fee` | `NUMERIC` | Not Null | Shipping threshold adjustment. |
| `total` | `NUMERIC` | Not Null | Transaction total amount. |
| `status` | `VARCHAR` | Default `'confirmed'`| State tracking (e.g., confirmed, shipped). |
| `created_at` | `TIMESTAMP` | Default `NOW()` | Precise timestamp of order completion. |

---

## 🛠️ Tech Stack Used

* **Frontend Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **State Management:** Redux Toolkit (with local storage synchronizations)
* **Styling & Components:** Tailwind CSS, Shadcn UI Components
* **Database & Auth Backend:** Supabase (PostgreSQL engine)
* **API Communications:** Axios, REST API Routes
* **Email Client:** Resend API (HTTP Fetch client)

---

## ⚙️ Environment Configuration

To run the project, duplicate the `.env.example` file and create a `.env` in the root directory:

```env
# Supabase Database Keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Email Notifications Configuration (Optional)
RESEND_API_KEY=re_your_api_key_here
ORDER_EMAIL_FROM=Amazon <orders@yourdomain.com>
```

---

## 💻 Local Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/itmejayesh/amazon-clone.git
   cd amazon-clone
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   * Open the `.env` file and supply your active **Supabase** credentials.
   * If you wish to test live email receipts, add your **Resend** api credentials.

4. **Launch the Development Server:**
   ```bash
   npm run dev
   ```

5. **Access the Web App:**
   * Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📄 Key Assumptions Made
1. **Frictionless Guest Checkouts:** Although user registration is supported via Supabase Auth, checking out does **not** force logins. Anonymous users can write orders directly using custom guest emails.
2. **Order Merging:** If a guest places an order and later logs in, orders placed under the same email are merged on-the-fly inside the Order History dashboard.
3. **Email Fail-safe:** If email credentials are not active in `.env`, the order completes successfully in-app, bypassing SMTP calls with clean console warnings.
