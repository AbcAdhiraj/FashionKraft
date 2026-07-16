"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { IMAGES } from "@/lib/images"

const categories = [
  {
    name: "Sarees",
    slug: "sarees",
    image: IMAGES.categories[0],
    count: "248+ Products",
    size: "large",
  },
  {
    name: "Lehengas",
    slug: "lehengas",
    image: IMAGES.categories[1],
    count: "186+ Products",
    size: "small",
  },
  {
    name: "Kurtis",
    slug: "kurtis",
    image: IMAGES.categories[2],
    count: "312+ Products",
    size: "small",
  },
  {
    name: "Dresses",
    slug: "dresses",
    image: IMAGES.categories[3],
    count: "195+ Products",
    size: "small",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: IMAGES.categories[4],
    count: "420+ Products",
    size: "large",
  },
]

export function CategoryShowcase() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-[#B76E79] text-sm font-medium tracking-[0.2em] uppercase">
            Categories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-[#1A1A1A] mt-2">
            Shop by Category
          </h2>
          <p className="mt-3 text-[#737373] max-w-lg mx-auto">
            Explore our curated collection across categories
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl bg-[#F5F0EB] cursor-pointer ${
                index === 0 || index === 4
                  ? "md:col-span-2 md:row-span-2"
                  : ""
              } ${index === 0 ? "row-span-2" : ""}`}
              style={{
                aspectRatio: index === 0 || index === 4 ? undefined : "3/4",
                minHeight: index === 0 || index === 4 ? "400px" : "280px",
              }}
            >
              <Link href={`/products?category=${cat.slug}`}>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl md:text-2xl font-bold text-white font-display">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/70 mt-1">{cat.count}</p>
                  <div className="mt-3 flex items-center gap-1 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-[#800020]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
