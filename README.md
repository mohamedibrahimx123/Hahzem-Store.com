# Hahzem-Store.com

> A modern, multi-category e-commerce platform for mobile phones, headphones, smartwatches, and accessories — built with React and Firebase.

## Features

- **Multi-Category Products** — Phones, headphones, watches, and accessories under one roof
- **Admin Panel** — Full CRUD for products with variant management (storage, RAM, color, price, stock, condition)
- **Color-Specific Images** — Each variant can have its own image; the main display updates when the customer selects a color
- **Conditions** — Products can be listed as `New`, `Like-new`, or `Used` with visual badges
- **Image Upload** — Upload product images via device (base64) or URL
- **Persistent Data** — All changes saved to `localStorage`, surviving page refreshes
- **WhatsApp Integration** — One-click ordering via WhatsApp with auto stock decrement
- **Wishlist** — Save favorite products
- **Compare** — Side-by-side product comparison
- **Installment Calculator** — Monthly payment estimation
- **RTL Support** — Fully right-to-left Arabic interface
- **Responsive Design** — Works on mobile, tablet, and desktop

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18, React Router 7, Framer Motion, GSAP |
| Styling  | Tailwind CSS, Custom animations |
| State    | React hooks, localStorage persistence |
| Backend  | Firebase (Auth & Firestore configured) |
| Icons    | Lucide React, React Icons |
| Build    | Vite 5 |

## Getting Started

```bash
npm install
npm run dev
```

For production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/            # Static images
├── components/        # Reusable UI components
│   ├── home/          # Homepage sections
│   ├── layout/        # Header, footer, navigation
│   ├── products/      # Product-specific components
│   └── ui/            # Generic UI (Modal, ReviewPopup, etc.)
├── context/           # Language / theme context
├── data/              # Initial product data and brand definitions
├── firebase/          # Firebase configuration
├── hooks/             # Custom hooks (useImageUpload)
├── pages/             # Route pages
│   └── admin/         # Admin dashboard, products manager, orders
└── utils/             # Helpers, stock, wishlist, productStorage
```

## Admin Panel

Access the admin panel at `/admin` to:

- **Add / Edit / Delete** products
- Manage **variants** with storage, RAM, color, price, stock, and condition
- Upload **color-specific images** so each variant displays its own photo
- Categorize products as **Phone, Headphones, Watch, or Accessory**
- View and manage **orders**

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## License

MIT
# mobile-store.com
