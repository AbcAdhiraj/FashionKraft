"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "./ProductCard"

interface ProductGridSectionProps {
  title: string
  description?: string
  href: string
  products: Array<{
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
  }>
}

export function ProductGridSection({
  title,
  description,
  href,
  products,
}: ProductGridSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-[#1A1A1A]">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-[#737373] max-w-lg">{description}</p>
            )}
          </div>
          <Link href={href}>
            <Button
              variant="outline"
              className="group rounded-full border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-white"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#737373]">No products available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
