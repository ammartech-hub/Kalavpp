# Kalavpp Platform Architecture

## 1. Overview
Kalavpp is a comprehensive web platform integrating ArtCommerce (e-commerce) and Creative Services. It is built using a modern, scalable technology stack designed for performance, modularity, and future mobile app compatibility.

## 2. Technology Stack

### Frontend
*   **Framework**: Next.js 14+ (App Router)
*   **Language**: JavaScript / TypeScript (TSX)
*   **Styling**: Tailwind CSS + CSS Modules
*   **State Management**: React Context API (`CartContext`)
*   **UI Components**: Lucide React (Icons), Modular Component Architecture

### Backend
*   **API Framework**: Next.js API Routes (Serverless Functions)
*   **Database Interface**: Prisma ORM (Currently utilizing a Custom Mock Adapter for rapid prototyping and file-system persistence)
*   **Authentication**: NextAuth.js (Credentials Provider with JWT sessions)
*   **Database**: Designed for PostgreSQL (Schema defined in `prisma/schema.prisma`).

## 3. Architecture Design

### modular Component-Based Structure
The application follows a strict component-based architecture:
*   `src/app`: Page routes and layouts.
*   `src/components`: Reusable UI elements (Navigation, Footer, Cards).
*   `src/context`: Global state management.
*   `src/lib`: Utility libraries and database clients.

### API-First Design (Flutter Compatible)
The backend exposes a RESTful API consumed by the frontend. These endpoints return standard JSON and are ready for consumption by a future Flutter mobile application.

**Key Endpoints:**
*   `GET /api/products` - List all products for the shop.
*   `POST /api/products` - Create a new product listing (Vendor/Admin).
*   `GET /api/users` - Admin: List all users.
*   `PUT /api/users/[id]` - Admin: Update user roles (Approve Vendors).
*   `POST /api/orders` - Submit a new order.
*   `GET /api/orders` - Admin: Fetch all orders for analytics.
*   `GET /api/orders/user?email=...` - Fetch specific user history.

### Database Layer
*   **Schema**: see `prisma/schema.prisma`
*   **Scalability**: The database schema is normalized to support `User`, `Product`, `Order`, and `Workshop` entities with proper relations.
*   **Separation**: The database logic is decoupled via the `prisma` client abstraction, allowing seamless switching between the Mock Adapter and a real PostgreSQL instance.

## 4. Mobile Compatibility
*   **Authentication**: Uses standard JWT tokens compatible with mobile HTTP headers.
*   **Data Format**: All APIs return strict JSON.
*   **Asset Management**: Images are served via URL, compatible with Flutter's `NetworkImage`.

## 5. Security
*   **RBAC**: Middleware-enforced Role-Based Access Control (Admin, Artist, User).
*   **Environment Variables**: Sensitive keys managed via `.env`.
*   **Input Validation**: API routes validate request bodies before processing.
