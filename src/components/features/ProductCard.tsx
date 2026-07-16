"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Eye, ShoppingBag, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/hooks/useWishlist"
import { useCart } from "@/hooks/useCart"
import { formatPrice, formatDiscount } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    comparePrice: number | null
    discount: number | null
    images: string[]
    rating: number
    reviewCount: number
    isNew: boolean
    inStock: boolean
  }
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { isInWishlist, toggleItem } = useWishlist()
  const { addItem } = useCart()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.inStock) return
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/placeholder.svg",
      quantity: 1,
      size: "M",
      color: "Default",
      discount: product.discount,
    })
  }

  const router = useRouter()

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/placeholder.svg",
      discount: product.discount,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        <div
          className="relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden bg-[#F5F0EB] mb-2 sm:mb-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!imageError ? (
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F5F0EB]">
              <div className="text-center">
                <ShoppingBag className="h-6 sm:h-8 w-6 sm:w-8 mx-auto text-[#737373] mb-1" />
                <span className="text-[11px] sm:text-xs text-[#737373]">{product.name}</span>
              </div>
            </div>
          )}

          {/* Hover Actions — desktop only */}
          <div
            className={`hidden md:flex absolute inset-x-0 bottom-0 p-3 gap-2 transition-all duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Button
              size="sm"
              className="flex-1 bg-white text-[#1A1A1A] hover:bg-[#800020] hover:text-white shadow-lg rounded-lg h-10 text-xs font-medium truncate"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button
              size="icon"
              className="bg-white text-[#1A1A1A] hover:bg-[#800020] hover:text-white shadow-lg rounded-lg h-10 w-10 shrink-0"
              onClick={handleWishlist}
            >
              <Heart
                className={`h-4 w-4 ${
                  inWishlist ? "fill-[#800020] text-[#800020]" : ""
                }`}
              />
            </Button>
          </div>

          {/* Mobile bottom bar — always visible */}
          <div className="flex md:hidden absolute inset-x-0 bottom-0 p-1.5 sm:p-2 gap-1 sm:gap-1.5">
            <Button
              size="sm"
              className="flex-1 bg-white/90 text-[#1A1A1A] text-xs font-medium shadow-lg rounded-lg h-8 sm:h-9 backdrop-blur-sm truncate"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button
              size="icon"
              className="bg-white/90 text-[#1A1A1A] shadow-lg rounded-lg h-8 sm:h-9 w-8 sm:w-9 backdrop-blur-sm shrink-0"
              onClick={handleWishlist}
            >
              <Heart
                className={`h-3.5 sm:h-4 w-3.5 sm:w-4 ${
                  inWishlist ? "fill-[#800020] text-[#800020]" : ""
                }`}
              />
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-0.5 sm:gap-1">
            {product.discount && product.discount > 0 && (
              <Badge className="bg-[#800020] text-white text-[11px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-md">
                {formatDiscount(product.discount)}
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-[#1A1A1A] text-white text-[11px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-md">
                New
              </Badge>
            )}
          </div>

          {/* Wishlist button on top-right */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-7 sm:h-9 w-7 sm:w-9 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-sm"
            onClick={handleWishlist}
          >
            <Heart
              className={`h-3 sm:h-4 w-3 sm:w-4 ${
                inWishlist ? "fill-[#800020] text-[#800020]" : ""
              }`}
            />
          </Button>

          {/* Quick view */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push(`/products/${product.slug}`)
            }}
            className="absolute top-1.5 sm:top-2 right-10 sm:right-14 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-7 sm:h-9 w-7 sm:w-9 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity inline-flex items-center justify-center shadow-sm"
          >
            <Eye className="h-3 sm:h-4 w-3 sm:w-4" />
          </button>
        </div>

        <div className="space-y-0.5 sm:space-y-1 px-0.5 sm:px-1">
          <h3 className="text-xs sm:text-sm font-medium text-[#1A1A1A] line-clamp-1 group-hover:text-[#800020] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-0.5 sm:gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-2.5 sm:h-3 w-2.5 sm:w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-[#FFD700] text-[#FFD700]"
                    : "text-[#D4D4D4]"
                }`}
              />
            ))}
            <span className="text-[11px] sm:text-xs text-[#737373] ml-0.5 sm:ml-1">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-[11px] sm:text-xs text-[#737373] line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
