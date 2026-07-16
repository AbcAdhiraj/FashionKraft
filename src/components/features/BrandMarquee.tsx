"use client"

import { motion } from "framer-motion"

const brands = [
  "Premium Quality",
  "Handpicked Collection",
  "Free Shipping",
  "Easy Returns",
  "Secure Payments",
  "24/7 Support",
  "Authentic Products",
  "Trendy Styles",
]

export function BrandMarquee() {
  return (
    <section className="py-8 border-y border-[#E5E5E5] bg-white overflow-hidden">
      <div className="relative">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-[#1A1A1A]/60"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B76E79]" />
              <span className="text-sm font-medium tracking-wide uppercase">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
