"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, X, ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CATEGORIES, PRICE_RANGES, RATING_OPTIONS } from "@/lib/constants"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  activeFilters: FilterState
}

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  sizes: string[]
  colors: string[]
  ratings: number[]
  inStock: boolean
}

const defaultFilters: FilterState = {
  categories: [],
  priceRange: [0, 50000],
  sizes: [],
  colors: [],
  ratings: [],
  inStock: false,
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
const colors = [
  { name: "Red", value: "#FF0000" },
  { name: "Blue", value: "#0000FF" },
  { name: "Green", value: "#00FF00" },
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Pink", value: "#FFC0CB" },
  { name: "Gold", value: "#FFD700" },
  { name: "Purple", value: "#800080" },
]

export function ProductFilters({ onFiltersChange, activeFilters }: ProductFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(activeFilters)

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const toggleArrayFilter = (key: "categories" | "sizes" | "colors" | "ratings", value: string | number) => {
    const current = localFilters[key] as (string | number)[]
    const filtered = current.filter((v) => v !== value)
    const newValue = current.length === filtered.length ? [...current, value] : filtered
    updateFilter(key as keyof FilterState, newValue as never)
  }

  const clearAll = () => {
    setLocalFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const hasActiveFilters =
    localFilters.categories.length > 0 ||
    localFilters.sizes.length > 0 ||
    localFilters.colors.length > 0 ||
    localFilters.ratings.length > 0 ||
    localFilters.inStock ||
    localFilters.priceRange[0] > 0 ||
    localFilters.priceRange[1] < 50000

  const filterContent = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.flatMap((cat) =>
            cat.subcategories.map((sub) => (
              <label key={sub.slug} className="flex items-center gap-2 cursor-pointer group">
                <Checkbox
                  checked={localFilters.categories.includes(sub.slug)}
                  onCheckedChange={() => toggleArrayFilter("categories", sub.slug)}
                  className="data-[state=checked]:bg-[#800020] data-[state=checked]:border-[#800020]"
                />
                <span className="text-sm text-[#737373] group-hover:text-[#1A1A1A] transition-colors">
                  {sub.name}
                </span>
              </label>
            ))
          )}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={[localFilters.priceRange[0], localFilters.priceRange[1]]}
            onValueChange={(v) => {
              const values = Array.isArray(v) ? v : [v]
              updateFilter("priceRange", [values[0], values[1] ?? values[0]])
            }}
            min={0}
            max={50000}
            step={500}
            className="[&_[data-slot=slider-thumb]]:bg-[#800020] [&_[data-slot=slider-range]]:bg-[#800020]"
          />
          <div className="flex justify-between mt-2 text-xs text-[#737373]">
            <span>₹{localFilters.priceRange[0].toLocaleString()}</span>
            <span>₹{localFilters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Size */}
      <div>
        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleArrayFilter("sizes", size)}
              className={`h-8 w-10 rounded-lg text-xs font-medium border transition-all ${
                localFilters.sizes.includes(size)
                  ? "bg-[#800020] text-white border-[#800020]"
                  : "bg-white text-[#737373] border-[#E5E5E5] hover:border-[#800020] hover:text-[#800020]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Color */}
      <div>
        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => toggleArrayFilter("colors", color.name)}
              title={color.name}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                localFilters.colors.includes(color.name)
                  ? "border-[#800020] scale-110"
                  : "border-transparent hover:scale-110"
              }`}
              style={{
                backgroundColor: color.value,
                borderColor:
                  color.value === "#FFFFFF" && !localFilters.colors.includes(color.name)
                    ? "#E5E5E5"
                    : localFilters.colors.includes(color.name)
                    ? "#800020"
                    : undefined,
              }}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">Rating</h3>
        <div className="space-y-2">
          {RATING_OPTIONS.map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={localFilters.ratings.includes(rating)}
                onCheckedChange={() => toggleArrayFilter("ratings", rating)}
                className="data-[state=checked]:bg-[#800020] data-[state=checked]:border-[#800020]"
              />
              <span className="text-sm text-[#737373] group-hover:text-[#1A1A1A] transition-colors">
                {rating} ★ & above
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox
            checked={localFilters.inStock}
            onCheckedChange={(checked) => updateFilter("inStock", checked as boolean)}
            className="data-[state=checked]:bg-[#800020] data-[state=checked]:border-[#800020]"
          />
          <span className="text-sm text-[#737373] group-hover:text-[#1A1A1A] transition-colors">
            In Stock Only
          </span>
        </label>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full text-sm"
          onClick={clearAll}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-xs text-[#800020] hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          {filterContent}
        </div>
      </div>

      {/* Mobile Filters */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden flex items-center gap-2"
            />
          }
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-[#800020] text-white text-xs rounded-full flex items-center justify-center">
              !
            </span>
          )}
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">{filterContent}</div>
        </SheetContent>
      </Sheet>
    </>
  )
}
