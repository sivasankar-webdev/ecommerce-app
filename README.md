<div align="center">

# 🛒 Full-Stack MERN E-Commerce Platform

**A production-ready, e-commerce application built with the MERN stack**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<br/>

[🌐 Live Demo](https://ekomart.railway.app) · [✨ Request Feature](https://github.com/yourusername/ekomart/issues)

<br/>

![App Screenshot](https://raw.githubusercontent.com/yourusername/ekomart/main/docs/screenshot.png)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Quick Start](#-quick-start)
- [🔧 Environment Variables](#-environment-variables)
- [📡 API Reference](#-api-reference)
- [🗄️ Database Schema](#️-database-schema)
- [🚀 Deployment](#-deployment)

---

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog** — Browse products by category, brand, color, and price range
- **Advanced Filtering & Sorting** — Multi-filter sidebar with real-time results
- **Quick View Modal** — Preview product details without leaving the listing page
- **Search** — Full-text product search across name and category
- **Responsive Grid / List Views** — Toggle between 4, 3, 2 column and list layouts

### 🛒 Cart & Checkout
- **Persistent Cart** — Cart synced to backend, survives page refresh
- **Live Quantity Updates** — Subtotal and master total update instantly (optimistic UI)
- **Coupon Codes** — Apply discount codes with percentage-off support
- **Shipping Calculator** — Free, flat-rate, and local pickup options
- **Free Shipping Progress Bar** — Visual indicator showing spend-to-unlock threshold

### ❤️ Wishlist
- **Add / Remove Products** — Toggle from any product card or detail page
- **Wishlist Page** — View, manage quantity, move to cart, or remove items
- **Backend Persisted** — Wishlist stored per user in MongoDB

### 👤 User Account
- **Registration & Login** — JWT-based authentication with HttpOnly cookies
- **My Orders** — View all orders with status badges and item details popup
- **Order Tracking** — Visual stepper with animated current-step indicator
- **Address Management** — Separate billing and shipping addresses
- **Account Details** — Update name, email, and password with validation
- **Protected Routes** — Auth-guarded pages with automatic redirect

### 🎨 UI / UX
- **Fully Responsive** — Mobile-first, works on all screen sizes
- **Skeleton Loaders** — Smooth loading states on every data fetch
- **Toast Notifications** — Action feedback for cart, wishlist, auth events
- **Scroll Reveal Animations** — Elements animate into view on scroll
- **Loading Overlay** — Full-screen processing indicator during API calls
- **Empty States** — Illustrated empty states for cart, wishlist, orders

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React + Vite)                 │
│  ┌───────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Pages    │  │  Components  │  │  Redux Toolkit   │  │
│  │  /shop    │  │  Header      │  │  authSlice       │  │
│  │  /cart    │  │  CartDrawer  │  │  cartSlice       │  │
│  │  /wishlist│  │  ProductCard │  │  wishlistSlice   │  │
│  │  /account │  │  Modals      │  │  productsSlice   │  │
│  └───────────┘  └──────────────┘  └──────────────────┘  │
│           │                               │              │
│           └──────────── Axios ────────────┘              │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTPS / REST API
┌─────────────────────────▼───────────────────────────────┐
│                  SERVER (Node.js + Express)               │
│  ┌───────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Routes   │  │  Controllers │  │   Middleware     │  │
│  │  /auth    │  │  auth.ctrl   │  │  protect (JWT)   │  │
│  │  /cart    │  │  cart.ctrl   │  │  errorHandler    │  │
│  │  /wishlist│  │  wishlist    │  │  rateLimiter     │  │
│  │  /user    │  │  user.ctrl   │  │  cors            │  │
│  └───────────┘  └──────────────┘  └──────────────────┘  │
│           │                                              │
│           └────────────── Mongoose ODM ──────────────────┘
└─────────────────────────┬───────────────────────────────┘
                          │ MongoDB URI (Atlas)
┌─────────────────────────▼───────────────────────────────┐
│              DATABASE (MongoDB Atlas)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │  users   │ │  carts   │ │ wishlist │ │  orders   │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| [React](https://reactjs.org/) | 18.x | UI library |
| [Vite](https://vitejs.dev/) | 5.x | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | 6.x | Client-side routing |
| [Redux Toolkit](https://redux-toolkit.js.org/) | 2.x | Global state management |
| [React Redux](https://react-redux.js.org/) | 9.x | React-Redux bindings |
| [Axios](https://axios-http.com/) | 1.x | HTTP client |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Utility-first CSS framework |
| [React Hot Toast](https://react-hot-toast.com/) | 2.x | Toast notifications |
| [React Hook Form](https://react-hook-form.com/) | 7.x | Form state management |

### Backend
| Package | Version | Purpose |
|---------|---------|---------|
| [Node.js](https://nodejs.org/) | 20.x | JavaScript runtime |
| [Express](https://expressjs.com/) | 4.x | Web framework |
| [Mongoose](https://mongoosejs.com/) | 8.x | MongoDB ODM |
| [JSON Web Token](https://jwt.io/) | 9.x | Authentication tokens |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | 2.x | Password hashing |
| [cors](https://github.com/expressjs/cors) | 2.x | Cross-origin resource sharing |
| [dotenv](https://github.com/motdotla/dotenv) | 16.x | Environment variable loader |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | 1.x | Cookie middleware |

### Database & Hosting
| Service | Purpose |
|---------|---------|
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database (Free M0 tier) |
| [Render](https://render.com//) | Backend deployment |
| [Vercel](https://vercel.com/) | Frontend deployment |

---

## 📁 Project Structure

```
ekomart/
│
├── 📁 frontend/                    # React + Vite application
│   ├── 📁 public/                  # Static assets
│   ├── 📁 src/
│   │   ├── 📁 app/
│   │   │   └── store.js            # Redux store configuration
│   │   │
│   │   ├── 📁 assets/              # Images, fonts, icons
│   │   │   ├── 📁 images/
│   │   │   └── 📁 logo/
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── 📁 layout/
│   │   │   │   ├── Header.jsx      # Main navigation header
│   │   │   │   ├── Footer.jsx      # Site footer
│   │   │   │   └── Layout.jsx      # Page wrapper with Outlet
│   │   │   └── 📁 ui/
│   │   │       ├── LoadingOverlay.jsx
│   │   │       └── Toast.jsx
│   │   │
│   │   ├── 📁 features/            # Redux slices + UI
│   │   │   ├── 📁 auth/
│   │   │   │   ├── authSlice.js
│   │   │   │   └── authAPI.js
│   │   │   ├── 📁 cart/
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── cartAPI.js
│   │   │   │   └── CartDrawer.jsx
│   │   │   ├── 📁 wishlist/
│   │   │   │   ├── wishlistSlice.js
│   │   │   │   └── wishlistAPI.js
│   │   │   └── 📁 products/
│   │   │       └── productsSlice.js
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ShopPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── WishlistPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── MyAccountPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   │
│   │   ├── 📁 router/
│   │   │   └── AppRouter.jsx       # All routes + protected routes
│   │   │
│   │   ├── 📁 services/
│   │   │   └── api.js              # Axios instance with interceptors
│   │   │
│   │   ├── 📁 utils/
│   │   │   └── imageMap.js         # Local image key → asset resolver
│   │   │
│   │   ├── index.css               # Tailwind directives + global styles
│   │   └── main.jsx                # App entry point
│   │
│   ├── .env                        # Frontend environment variables
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── 📁 backend/                     # Node.js + Express API
│   ├── 📁 controllers/
│   │   ├── auth.controller.js      # Register, login, logout
│   │   ├── cart.controller.js      # Cart CRUD operations
│   │   ├── wishlist.controller.js  # Wishlist CRUD operations
│   │   └── user.controller.js      # Profile update, password change
│   │
│   ├── 📁 middleware/
│   │   ├── protect.js              # JWT auth middleware
│   │   └── errorHandler.js         # Global error handler
│   │
│   ├── 📁 models/
│   │   ├── user.model.js
│   │   ├── cart.model.js
│   │   ├── wishlist.model.js
│   │   └── order.model.js
│   │
│   ├── 📁 routes/
│   │   ├── auth.route.js
│   │   ├── cart.route.js
│   │   ├── wishlist.route.js
│   │   └── user.route.js
│   │
│   ├── .env                        # Backend environment variables
│   ├── server.js                   # Express app entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites

Make sure you have the following installed:

```
Node.js  >= 20.x    https://nodejs.org/
npm      >= 10.x    (comes with Node)
Git                 https://git-scm.com/
```

### 1. Clone the Repository

```bash
git clone https://github.com/sivasankar-webdev/ecommerce-app.git
cd project_name
```

### 2. Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# → Edit .env with your values (see Environment Variables section below)

# Start development server
npm run dev
```

Backend runs at: `http://localhost:5000`

### 3. Setup Frontend

```bash
# Open a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# → Edit .env with your values

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:5173`

### 4. Open in Browser

```
http://localhost:5173
```

> ✅ Both servers must be running simultaneously during development.

---

## 🔧 Environment Variables

### Backend — `backend/.env`

```env
# ── Server ──────────────────────────────
PORT=5000
NODE_ENV=development

# ── Database ────────────────────────────
# Local development:
MONGODB_URI=mongodb://localhost:27017/ecommerce_db

# Production (MongoDB Atlas):
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ecommerce_db?retryWrites=true&w=majority

# ── Authentication ──────────────────────
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# ── CORS ────────────────────────────────
CLIENT_URL=http://localhost:5173
```

### Frontend — `frontend/.env`

```env
# ── API Base URL ─────────────────────────
# Development:
VITE_API_URL=http://localhost:5000/api

# Production (after backend is deployed):
# VITE_API_URL=https://your-backend.render.app/api
```

> ⚠️ **Never commit `.env` files to Git.** Both `.env` files are already in `.gitignore`.

### Backend `.env.example`

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce_db
JWT_SECRET=change_this_to_a_random_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### Frontend `.env.example`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

All protected routes require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

### 🔐 Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | ❌ | Create new account |
| `POST` | `/auth/login` | ❌ | Login and receive JWT |
| `POST` | `/auth/logout` | ✅ | Logout and invalidate token |

**Register — Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Login — Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Login — Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 👤 User

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/user/profile` | ✅ | Get current user profile |
| `PUT` | `/user/profile` | ✅ | Update name, email, password |

**Update Profile — Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.new@example.com",
  "currentPassword": "oldPass123",
  "newPassword": "newPass456"
}
```

---

### 🛒 Cart

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/cart` | ✅ | Get user's cart |
| `POST` | `/cart` | ✅ | Add item to cart |
| `PUT` | `/cart/:id` | ✅ | Update item quantity |
| `DELETE` | `/cart/:id` | ✅ | Remove item from cart |
| `DELETE` | `/cart` | ✅ | Clear entire cart |
| `POST` | `/cart/coupon` | ✅ | Apply coupon code |

**Add to Cart — Request Body:**
```json
{
  "productId": "p1",
  "name": "Organic Fresh Salad Mix",
  "price": 22.00,
  "image": "grocery/22.jpg",
  "qty": 1
}
```

---

### ❤️ Wishlist

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/wishlist` | ✅ | Get user's wishlist |
| `POST` | `/wishlist` | ✅ | Add item to wishlist |
| `PUT` | `/wishlist/:id` | ✅ | Update item quantity |
| `DELETE` | `/wishlist/:id` | ✅ | Remove item from wishlist |
| `DELETE` | `/wishlist` | ✅ | Clear entire wishlist |

**Add to Wishlist — Request Body:**
```json
{
  "productId": "p5",
  "name": "Green salad diet pack fresh daily",
  "price": 22.00,
  "image": "grocery/22.jpg",
  "sku": "SKU-DF01"
}
```

---

## 🗄️ Database Schema

### User
```javascript
{
  name:      String  (required),
  email:     String  (required, unique),
  password:  String  (required, hashed with bcrypt),
  createdAt: Date    (auto)
}
```

### Cart
```javascript
{
  user:  ObjectId (ref: User),
  items: [{
    productId: String,
    name:      String,
    price:     Number,
    image:     String,   // imageKey e.g. "grocery/01.jpg"
    qty:       Number    (default: 1)
  }]
}
```

### Wishlist
```javascript
{
  user:  ObjectId (ref: User),
  items: [{
    productId: String,
    name:      String,
    sku:       String,
    price:     Number,
    image:     String,   // imageKey
    qty:       Number    (default: 1)
  }]
}
```

---

## 🚀 Deployment

### Deploy Backend → Render

1. Push your code to GitHub
2. Go to [render.app](https://render.com.app) → **New Project** → **Deploy from GitHub**
3. Select your repository, choose the `backend` folder as root
4. Add environment variables in Render dashboard:

```
MONGODB_URI  = mongodb+srv://user:pass@cluster.mongodb.net/ekomart_db?retryWrites=true&w=majority
JWT_SECRET   = your_production_secret_here
JWT_EXPIRES_IN = 7d
NODE_ENV     = production
CLIENT_URL   = https://your-frontend.netlify.app
PORT         = 5000
```

5. Render auto-deploys on every push to `main`
6. Your API URL: `https://ecommerce-api.render.app`

---

### Deploy Frontend → Netlify

1. Go to [vercel.com](https://vercel.com) → **Add new site** → **Import from Git**
2. Select your repository, set **Base directory** to `frontend`
3. Build settings:
   ```
   Build command:   npm run build
   Publish directory: dist
   ```
4. Add environment variable:
   ```
   VITE_API_URL = https://ecommerce-api.render.app/api
   ```
5. Click **Deploy site**

---

### MongoDB Atlas Setup

1. Create free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create **M0 Free** cluster
3. **Database Access** → Add user with password
4. **Network Access** → Add IP `0.0.0.0/0` (allow all)
5. **Connect** → **Drivers** → Copy connection string
6. Paste into `MONGODB_URI` environment variable

---

## 📦 Available Scripts

### Backend

```bash
npm run dev       # Start with nodemon (hot-reload)
npm start         # Start production server
```

### Frontend

```bash
npm run dev or npm start   # Start Vite dev server
npm run build              # Build for production
npm run preview            # Preview production build locally
npm run lint               # Run ESLint
```

---

## 🐛 Known Issues

- [ ] Order tracking uses mock data — real courier API integration pending
- [ ] Address management is frontend-only (state-based) — backend persistence coming
- [ ] Product images use local asset keys — CDN/Cloudinary integration planned

---

<div align="center">

**⭐ If this project helped you, please give it a star!**

Made with ❤️ using the MERN Stack

</div>
