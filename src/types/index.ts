export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice: number | null
  discount: number | null
  images: string[]
  categoryId: string
  category: Category
  sizes: string[]
  colors: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  isNew: boolean
  isFeatured: boolean
  isBestSeller: boolean
  createdAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string | null
  parentId: string | null
  products: Product[]
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  size: string
  color: string
}

export interface WishlistItem {
  id: string
  productId: string
  product: Product
}

export interface Review {
  id: string
  userId: string
  user: { name: string; image: string | null }
  productId: string
  rating: number
  comment: string
  createdAt: Date
}

export interface Address {
  id: string
  fullName: string
  phone: string
  street: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  subtotal: number
  shipping: number
  discount: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  paymentMethod: "razorpay" | "cod"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  shippingAddress: Address
  createdAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  size: string
  color: string
  price: number
}

export interface Coupon {
  id: string
  code: string
  discount: number
  type: "percentage" | "fixed"
  minAmount: number
  maxDiscount: number | null
  expiresAt: Date
  isActive: boolean
}

export interface User {
  id: string
  name: string
  email: string
  image: string | null
  role: "user" | "admin"
}
