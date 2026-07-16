# FashionKraft Architecture

## System Overview
FashionKraft is a premium boutique fashion ecommerce platform built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Prisma ORM with PostgreSQL.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, Lucide React
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Auth**: NextAuth.js (Auth.js) v5 with Email + Google providers
- **Payments**: Razorpay integration + COD support
- **Storage**: Cloudinary/AWS S3 compatible
- **Deployment**: Vercel-optimized

## Project Structure
```
src/
  app/                    # Next.js App Router pages
    (auth)/              # Auth-related pages (login, register)
    (shop)/              # Shop pages (products, categories)
    account/             # User account dashboard
    admin/               # Admin dashboard
    cart/                # Cart page
    checkout/            # Checkout flow
    api/                 # API routes
  components/
    ui/                  # Shadcn UI base components
    features/            # Feature-specific components
    layout/              # Layout components (Header, Footer)
  hooks/                 # Custom React hooks
  lib/                   # Utility libraries
  prisma/                # Prisma schema & migrations
  services/              # Business logic services
  types/                 # TypeScript type definitions
  utils/                 # Helper functions
public/                  # Static assets
  images/                # Image assets
```

## Database Schema (Prisma)
Models: User, Product, Category, CartItem, WishlistItem, Order, OrderItem, Review, Address, Coupon

## Component Hierarchy
```
RootLayout
  Providers (Session, Theme, Cart)
  Navbar
    Logo, SearchBar, NavLinks, UserMenu, CartBadge
  Main Content (pages)
  Footer
```

## Data Flow
- Server Components fetch data directly via Prisma
- Client Components use React hooks + SWR/React Query
- API Routes handle mutations (cart, orders, auth)
- Auth state managed via NextAuth session
- Cart state persisted to DB (authenticated) or localStorage (guest)

## Route Design
| Route | Type | Description |
|-------|------|-------------|
| / | Static | Homepage |
| /products | Dynamic | Product listing with filters |
| /products/[id] | Dynamic | Product detail |
| /cart | Static | Shopping cart |
| /checkout | Static | Checkout flow |
| /account | Static | User dashboard |
| /admin | Static | Admin dashboard |
| /auth/login | Static | Login |
| /auth/register | Static | Register |
| /api/* | API | RESTful API routes |

## Design Tokens
- Ivory: #FFFFF0
- Champagne: #F7E7CE
- Black: #1A1A1A
- Rose Gold: #B76E79
- Deep Maroon: #800020
- Soft Beige: #F5F0EB
