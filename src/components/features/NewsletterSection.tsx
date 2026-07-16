"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    toast.success("Subscribed!", {
      description: "Thank you for subscribing to FashionKraft.",
    })
    setEmail("")
  }

  return (
    <section className="py-20 md:py-28 bg-[#F5F0EB]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#800020]/10 rounded-full px-4 py-1.5 text-[#800020] text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            Stay in the Loop
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-[#1A1A1A] mb-4">
            Join the FashionKraft Family
          </h2>
          <p className="text-[#737373] text-lg max-w-lg mx-auto mb-8">
            Subscribe to get special offers, free giveaways, and exclusive deals
            delivered straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3 bg-white border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020] placeholder:text-[#737373]"
            />
            <Button
              type="submit"
              className="bg-[#800020] hover:bg-[#800020]/90 text-white rounded-xl h-12 px-6"
            >
              Subscribe
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-xs text-[#737373] mt-4">
            No spam. Unsubscribe anytime. By subscribing, you agree to our
            Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
