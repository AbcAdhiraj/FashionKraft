"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/features/ProductCard"
import { useWishlist } from "@/hooks/useWishlist"
import { useCart } from "@/hooks/useCart"
import { formatPrice, formatDiscount } from "@/lib/utils"
import { IMAGES } from "@/lib/images"
import { toast } from "sonner"

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
const productColors = [
  { name: "Rose Gold", value: "#B76E79" },
  { name: "Ivory", value: "#FFFFF0" },
  { name: "Black", value: "#1A1A1A" },
  { name: "Maroon", value: "#800020" },
]

const product = {
  id: "1",
  name: "Silk Banarasi Saree",
  slug: "silk-banarasi-saree",
  price: 2499,
  comparePrice: 4999,
  discount: 50,
  description:
    "Handwoven pure silk Banarasi saree with intricate zari work. This exquisite piece features traditional motifs woven with fine gold and silver threads, creating a timeless masterpiece perfect for weddings and festive occasions.",
  images: [IMAGES.products[0], IMAGES.products[1], IMAGES.products[2], IMAGES.products[3], IMAGES.products[4]],
  rating: 4.5,
  reviewCount: 128,
  inStock: true,
  isNew: true,
  category: "Sarees",
}

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState(productColors[0].name)
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [showZoom, setShowZoom] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const { isInWishlist, toggleItem } = useWishlist()
  const { addItem } = useCart()

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor,
      discount: product.discount,
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    toast.success("Proceeding to checkout...")
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPosition({ x, y })
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#737373] mb-8">
          <Link href="/" className="hover:text-[#800020] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#800020] transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Image Gallery */}
          <div className="space-y-4">
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F5F0EB] cursor-crosshair"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={product.images[currentImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {showZoom && (
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background: `url(${product.images[currentImage] || "/placeholder.svg"})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: "200%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount && (
                  <Badge className="bg-[#800020] text-white text-sm px-3 py-1 rounded-lg">
                    {formatDiscount(product.discount)}
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-[#1A1A1A] text-white text-xs px-2 py-0.5 rounded-md">
                    New
                  </Badge>
                )}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentImage((p) => Math.max(0, p - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentImage((p) => Math.min(product.images.length - 1, p + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    i === currentImage
                      ? "border-[#800020] opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#B76E79] font-medium tracking-wider uppercase">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-[#737373]">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-[#1A1A1A]">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-bold text-[#800020]">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <>
                    <span className="text-lg text-[#737373] line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                      Save {formatPrice(product.comparePrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm text-[#737373] mt-2">
                Inclusive of all taxes. Free shipping on orders above ₹999.
              </p>
            </motion.div>

            <Separator />

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Select Size</h3>
                <button className="text-xs text-[#800020] hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 w-12 rounded-lg text-sm font-medium border transition-all ${
                      selectedSize === size
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "bg-white text-[#1A1A1A] border-[#E5E5E5] hover:border-[#1A1A1A]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <h3 className="text-sm font-semibold mb-3">
                Color: <span className="font-normal text-[#737373]">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {productColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-[#1A1A1A] scale-110"
                        : "border-transparent hover:scale-110"
                    }`}
                    style={{
                      backgroundColor: color.value,
                      borderColor:
                        color.value === "#FFFFF0" && selectedColor !== color.name
                          ? "#E5E5E5"
                          : selectedColor === color.name
                          ? "#1A1A1A"
                          : undefined,
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3 border rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 flex items-center justify-center hover:bg-[#F5F0EB] transition-colors rounded-l-lg"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="h-10 w-10 flex items-center justify-center hover:bg-[#F5F0EB] transition-colors rounded-r-lg"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Delivery Checker */}
            <div className="bg-[#F5F0EB] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-4 w-4 text-[#800020]" />
                <span className="text-sm font-medium">Delivery Options</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  className="flex-1 px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#800020]"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white"
                >
                  Check
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                className="flex-1 bg-[#800020] hover:bg-[#800020]/90 text-white h-12 text-base rounded-xl"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white h-12 text-base rounded-xl"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 border-[#E5E5E5] rounded-xl"
                onClick={() =>
                  toggleItem({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    discount: product.discount,
                  })
                }
              >
                <Heart
                  className={`h-5 w-5 ${
                    inWishlist ? "fill-[#800020] text-[#800020]" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Free Shipping", desc: "On orders ₹999+" },
                { icon: RotateCcw, label: "Easy Return", desc: "30 days return" },
                { icon: ShieldCheck, label: "Secure", desc: "100% secure" },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="text-center p-3 bg-[#F5F0EB] rounded-xl"
                >
                  <feature.icon className="h-5 w-5 mx-auto text-[#800020]" />
                  <p className="text-xs font-medium mt-1">{feature.label}</p>
                  <p className="text-[10px] text-[#737373]">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description, Reviews */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#800020] data-[state=active]:bg-transparent px-6 py-3 text-sm"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#800020] data-[state=active]:bg-transparent px-6 py-3 text-sm"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#800020] data-[state=active]:bg-transparent px-6 py-3 text-sm"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="prose prose-sm max-w-none text-[#737373]">
                <p>{product.description}</p>
                <p className="mt-4">
                  Each piece is carefully handcrafted by skilled artisans,
                  ensuring that every saree is unique. The fabric is sourced from
                  the finest weavers of Varanasi, known for their centuries-old
                  tradition of silk weaving.
                </p>
                <ul className="mt-4 space-y-2">
                  <li>Pure Katan silk with zari work</li>
                  <li>Blouse piece included</li>
                  <li>Dry clean only</li>
                  <li>Length: 5.5 meters + 0.8 meters blouse</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                {[
                  { label: "Fabric", value: "Pure Silk" },
                  { label: "Weave Type", value: "Banarasi" },
                  { label: "Ornamentation", value: "Zari Work" },
                  { label: "Occasion", value: "Wedding, Festive" },
                  { label: "Care Instructions", value: "Dry Clean Only" },
                  { label: "Country of Origin", value: "India" },
                ].map((spec) => (
                  <div key={spec.label} className="flex flex-col">
                    <span className="text-xs text-[#737373]">{spec.label}</span>
                    <span className="text-sm font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="text-center py-12">
                <Star className="h-12 w-12 mx-auto text-[#737373]" />
                <h3 className="text-lg font-medium mt-4">No reviews yet</h3>
                <p className="text-sm text-[#737373] mt-1">
                  Be the first to review this product.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-[#1A1A1A] mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCard
                key={i}
                product={{
                  id: `related-${i}`,
                  name: ["Silk Lehenga", "Embroidered Kurti", "Designer Saree", "Casual Dress"][i],
                  slug: `related-${i}`,
                  price: 1999 + i * 1500,
                  comparePrice: 2999 + i * 1500,
                  discount: 30 + i * 5,
                  images: [IMAGES.products[(i + 3) % IMAGES.products.length]],
                  rating: 4 + i * 0.2,
                  reviewCount: 50 + i * 25,
                  isNew: i === 0,
                  inStock: true,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
