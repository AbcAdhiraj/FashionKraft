"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IMAGES } from "@/lib/images"

export function FeaturedBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            backgroundImage: `url(${IMAGES.hero[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#800020]/95 via-[#800020]/85 to-[#1A1A1A]/90" />

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B76E79]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full" />
          </div>

          <div className="relative px-6 py-12 sm:px-8 sm:py-16 md:px-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-white/80 text-sm mb-6">
                <Sparkles className="h-4 w-4 text-[#F7E7CE]" />
                Limited Time Offer
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-4"
            >
              Festive Collection 2025
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/70 text-lg max-w-xl mx-auto mb-8"
            >
              Celebrate in style with our exclusive festive edit. From
              traditional elegance to contemporary chic.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
            >
              <Link href="/products?category=festive">
                <Button
                  size="lg"
                  className="bg-white text-[#800020] hover:bg-white/90 rounded-full px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base group w-full sm:w-auto"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products?sale=true">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base w-full sm:w-auto"
                >
                  View Offers
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
