"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ArrowUpDown, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProductCard } from "@/components/features/ProductCard"
import { ProductFilters, type FilterState } from "@/components/features/ProductFilters"
import { SORT_OPTIONS } from "@/lib/constants"
import { IMAGES } from "@/lib/images"

const placeholderProducts = [
  {
    id: "1", name: "Silk Banarasi Saree", slug: "silk-banarasi-saree", price: 2499,
    comparePrice: 4999, discount: 50, images: [IMAGES.products[0]], rating: 4.5,
    reviewCount: 128, isNew: true, inStock: true, category: "sarees",
  },
  {
    id: "2", name: "Cotton Printed Kurti", slug: "cotton-printed-kurti", price: 1299,
    comparePrice: 1999, discount: 35, images: [IMAGES.products[1]], rating: 4.2,
    reviewCount: 89, isNew: false, inStock: true, category: "kurtis",
  },
  {
    id: "3", name: "Designer Lehenga Choli", slug: "designer-lehenga-choli", price: 8999,
    comparePrice: 14999, discount: 40, images: [IMAGES.products[2]], rating: 4.8,
    reviewCount: 256, isNew: true, inStock: true, category: "lehengas",
  },
  {
    id: "4", name: "Floral Maxi Dress", slug: "floral-maxi-dress", price: 1999,
    comparePrice: null, discount: null, images: [IMAGES.products[3]], rating: 4.0,
    reviewCount: 45, isNew: false, inStock: true, category: "dresses",
  },
  {
    id: "5", name: "Embroidered Anarkali", slug: "embroidered-anarkali", price: 3999,
    comparePrice: 5999, discount: 33, images: [IMAGES.products[4]], rating: 4.6,
    reviewCount: 172, isNew: true, inStock: true, category: "kurtis",
  },
  {
    id: "6", name: "Linen Shirt Dress", slug: "linen-shirt-dress", price: 2499,
    comparePrice: 3499, discount: 28, images: [IMAGES.products[5]], rating: 4.3,
    reviewCount: 67, isNew: false, inStock: true, category: "dresses",
  },
  {
    id: "7", name: "Party Wear Sharara Set", slug: "party-wear-sharara-set", price: 5499,
    comparePrice: 7999, discount: 31, images: [IMAGES.products[6]], rating: 4.7,
    reviewCount: 94, isNew: true, inStock: true, category: "lehengas",
  },
  {
    id: "8", name: "Casual Cotton Top", slug: "casual-cotton-top", price: 899,
    comparePrice: 1499, discount: 40, images: [IMAGES.products[7]], rating: 4.1,
    reviewCount: 203, isNew: false, inStock: true, category: "tops",
  },
  {
    id: "9", name: "Georgette Saree", slug: "georgette-saree", price: 3499,
    comparePrice: 5499, discount: 36, images: [IMAGES.products[0]], rating: 4.4,
    reviewCount: 156, isNew: false, inStock: true, category: "sarees",
  },
  {
    id: "10", name: "Silk Lehenga", slug: "silk-lehenga", price: 12999,
    comparePrice: 19999, discount: 35, images: [IMAGES.products[1]], rating: 4.9,
    reviewCount: 312, isNew: true, inStock: true, category: "lehengas",
  },
  {
    id: "11", name: "Printed Kurta Set", slug: "printed-kurta-set", price: 1599,
    comparePrice: 2499, discount: 36, images: [IMAGES.products[2]], rating: 4.3,
    reviewCount: 78, isNew: false, inStock: true, category: "kurtis",
  },
  {
    id: "12", name: "Evening Gown", slug: "evening-gown", price: 7999,
    comparePrice: 12999, discount: 38, images: [IMAGES.products[3]], rating: 4.6,
    reviewCount: 45, isNew: true, inStock: false, category: "dresses",
  },
]

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 50000],
    sizes: [],
    colors: [],
    ratings: [],
    inStock: false,
  })
  const [sort, setSort] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProducts = useMemo(() => {
    let products = [...placeholderProducts]

    if (filters.categories.length > 0) {
      products = products.filter((p) =>
        filters.categories.includes(p.category)
      )
    }

    products = products.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    if (filters.ratings.length > 0) {
      const maxRating = Math.max(...filters.ratings)
      products = products.filter((p) => Math.floor(p.rating) >= maxRating)
    }

    if (filters.inStock) {
      products = products.filter((p) => p.inStock)
    }

    switch (sort) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        products.sort((a, b) => b.price - a.price)
        break
      case "newest":
        break
      default:
        products.sort((a, b) => b.rating - a.rating)
    }

    return products
  }, [filters, sort])

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold font-display text-[#1A1A1A]">
              All Products
            </h1>
            <p className="text-[#737373] mt-2">
              Showing {filteredProducts.length} products
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <ProductFilters
            onFiltersChange={setFilters}
            activeFilters={filters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {/* Mobile filter trigger is inside ProductFilters */}
                <div className="hidden lg:flex items-center gap-2 text-sm text-[#737373]">
                  <span>{filteredProducts.length} products</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="hidden sm:flex border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-none h-8 w-8 ${
                      viewMode === "grid"
                        ? "bg-[#800020] text-white"
                        : "text-[#737373]"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-none h-8 w-8 ${
                      viewMode === "list"
                        ? "bg-[#800020] text-white"
                        : "text-[#737373]"
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort */}
                <Select value={sort} onValueChange={(v) => v && setSort(v)}>
                  <SelectTrigger className="w-[160px] h-8 text-sm border-[#E5E5E5]">
                    <ArrowUpDown className="h-3 w-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#F5F0EB] flex items-center justify-center">
                    <ArrowUpDown className="h-8 w-8 text-[#737373]" />
                  </div>
                  <h3 className="text-lg font-medium text-[#1A1A1A]">
                    No products found
                  </h3>
                  <p className="text-sm text-[#737373] max-w-sm mx-auto">
                    Try adjusting your filters or search criteria to find what
                    you&apos;re looking for.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() =>
                      setFilters({
                        categories: [],
                        priceRange: [0, 50000],
                        sizes: [],
                        colors: [],
                        ratings: [],
                        inStock: false,
                      })
                    }
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
