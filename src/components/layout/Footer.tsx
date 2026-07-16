import Link from "next/link"
import { BRAND, CATEGORIES } from "@/lib/constants"
import { Heart, ShoppingBag, Shield, Truck, RotateCcw } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#F5F0EB]">
      {/* Features Bar */}
      <div className="border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: Shield, title: "Secure Checkout", desc: "100% secure payments" },
              { icon: Heart, title: "Premium Quality", desc: "Handpicked collection" },
            ].map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#800020]/20 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-[#B76E79]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{feature.title}</h4>
                  <p className="text-xs text-[#737373]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold font-display text-white">
              {BRAND.name}
            </Link>
            <p className="mt-4 text-sm text-[#737373] leading-relaxed max-w-sm">
              {BRAND.description}. We curate the finest collection of traditional and
              contemporary fashion pieces that celebrate Indian craftsmanship.
            </p>
            <div className="mt-6 flex gap-3">
              {["Instagram", "Facebook", "Twitter", "Pinterest"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#333333] flex items-center justify-center text-xs text-[#737373] hover:border-[#B76E79] hover:text-[#B76E79] transition-colors"
                >
                  {social[0]}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {["New Arrivals", "Best Sellers", "Festive Collection", "Sale"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-[#737373] hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              {CATEGORIES.flatMap((cat) =>
                cat.subcategories.slice(0, 2).map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/products?category=${sub.slug}`}
                      className="text-sm text-[#737373] hover:text-white transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {["Contact Us", "FAQs", "Shipping & Delivery", "Returns & Exchange", "Size Guide"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-[#737373] hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-[#333333]">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Join the FashionKraft Family
            </h3>
            <p className="text-sm text-[#737373] mb-4">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-[#262626] border border-[#333333] rounded-lg text-sm text-white placeholder:text-[#737373] focus:outline-none focus:border-[#B76E79]"
              />
              <button className="px-6 py-2.5 bg-[#800020] hover:bg-[#800020]/90 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#737373]">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-[#737373]">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
