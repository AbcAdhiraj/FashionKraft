"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BRAND } from "@/lib/constants"
import { IMAGES } from "@/lib/images"

const slides = [
  {
    title: "Festive Elegance",
    subtitle: "Discover our curated collection of handpicked festive wear",
    cta: "Shop Collection",
    href: "/products?category=festive",
    image: IMAGES.hero[0],
    bg: "from-[#800020]/70 via-[#800020]/30 to-transparent",
  },
  {
    title: "Summer Essentials",
    subtitle: "Light, breezy, and beautiful — your summer wardrobe awaits",
    cta: "Explore Now",
    href: "/products?category=summer",
    image: IMAGES.hero[1],
    bg: "from-[#800020]/60 via-[#B76E79]/20 to-transparent",
  },
  {
    title: "New Arrivals",
    subtitle: "Be the first to wear the latest trends from top designers",
    cta: "Shop New In",
    href: "/products?sort=newest",
    image: IMAGES.hero[2],
    bg: "from-[#1A1A1A]/70 via-[#1A1A1A]/20 to-transparent",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bg}`}
          />

          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-64 h-64 border border-white/20 rounded-full" />
            <div className="absolute bottom-20 right-10 w-96 h-96 border border-white/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex items-center">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block text-[#B76E79] text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4"
                >
                  {BRAND.name} Collection
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white leading-tight mb-6"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base md:text-lg text-white/80 max-w-lg mb-8 leading-relaxed"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link href={slides[currentSlide].href}>
                    <Button
                      size="lg"
                      className="bg-white text-[#1A1A1A] hover:bg-white/90 rounded-full px-8 h-12 text-base font-medium group"
                    >
                      {slides[currentSlide].cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 bg-transparent text-white hover:bg-white/10 rounded-full px-8 h-12 text-base"
                    >
                      Explore New Arrivals
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "w-12 bg-white"
                : "w-4 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm font-mono">
        0{currentSlide + 1} / 0{slides.length}
      </div>
    </section>
  )
}
