"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/features/ProductCard"
import { useWishlist } from "@/hooks/useWishlist"
import { IMAGES } from "@/lib/images"

const allProducts = [
  {
    id: "1", name: "Silk Banarasi Saree", slug: "silk-banarasi-saree", price: 2499,
    comparePrice: 4999, discount: 50, images: [IMAGES.products[0]], rating: 4.5,
    reviewCount: 128, isNew: true, inStock: true,
  },
  {
    id: "2", name: "Cotton Printed Kurti", slug: "cotton-printed-kurti", price: 1299,
    comparePrice: 1999, discount: 35, images: [IMAGES.products[1]], rating: 4.2,
    reviewCount: 89, isNew: false, inStock: true,
  },
  {
    id: "3", name: "Designer Lehenga Choli", slug: "designer-lehenga-choli", price: 8999,
    comparePrice: 14999, discount: 40, images: [IMAGES.products[2]], rating: 4.8,
    reviewCount: 256, isNew: true, inStock: true,
  },
  {
    id: "4", name: "Floral Maxi Dress", slug: "floral-maxi-dress", price: 1999,
    comparePrice: null, discount: null, images: [IMAGES.products[3]], rating: 4.0,
    reviewCount: 45, isNew: false, inStock: true,
  },
]

export default function WishlistPage() {
  const { items } = useWishlist()

  const wishlistProducts = allProducts.filter((p) =>
    items.some((i) => i.productId === p.id)
  )

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 bg-[#FFFFF0]">
        <div className="w-24 h-24 rounded-full bg-[#F5F0EB] flex items-center justify-center">
          <Heart className="h-10 w-10 text-[#737373]" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">
            Your wishlist is empty
          </h1>
          <p className="text-[#737373] mt-2">
            Save your favorite items to your wishlist and shop them later.
          </p>
        </div>
        <Link href="/products">
          <Button className="bg-[#800020] hover:bg-[#800020]/90 text-white rounded-full px-8">
            <ShoppingBag className="mr-2 h-4 w-4" /> Explore Products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-[#1A1A1A]">
              My Wishlist
            </h1>
            <p className="text-[#737373] mt-1">
              {items.length} items saved
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
