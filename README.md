# ArtCommerce Platform

A premium, gallery-inspired E-commerce and Creative Services platform.

## Features

- **E-commerce**: Buy original artwork, prints, and merchandise.
  - Filtered categories: Physical Art, Merchandise, Digital.
  - Shopping Cart with persistence.
- **Creative Services**: Commission custom art, book workshops, and more.
  - Detailed service pages.
  - Booking/Inquiry modal.
- **Artist Features**:
  - Artist Registration Portal (`/sell`).
  - Seller Dashboard with analytics (`/dashboard`).
- **Tech Stack**: Next.js App Router, React Context, Tailwind-like Utility Classes (Custom CSS).
- **Backend**: Simulated with `db.json` persistence (Mock Prisma Adapter) to ensure portability.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Seed the database (optional, pre-seeded):
   Access `http://localhost:3000/api/seed` (or 3001 if port busy).
   
3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) (or port shown in terminal).

## Project Structure

- `src/app`: App Router pages and API routes.
- `src/components`: Reusable UI components (Hero, Navigation, CartSidebar).
- `src/context`: React Context providers (CartContext).
- `src/lib`: Utilities including Mock Prisma Client (`prisma.js`).
- `db.json`: Local JSON database for products and users.
