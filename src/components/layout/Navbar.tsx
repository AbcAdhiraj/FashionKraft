"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
  Package,
  LogOut,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { CATEGORIES, NAV_LINKS, BRAND } from "@/lib/constants"
import { CartSheet } from "@/components/features/CartSheet"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { itemCount, toggleCart } = useCart()
  const { items: wishlistItems } = useWishlist()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsSearchOpen(false)
    setActiveDropdown(null)
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#FFFFF0]/90 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Announcement Bar */}
        <div className="hidden md:block bg-[#1A1A1A] text-white text-center text-xs py-2 tracking-wider">
          <span className="animate-pulse">FREE SHIPPING</span> on orders above ₹999 &middot; Use code <span className="font-semibold">FKRFT10</span> for 10% OFF
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu */}
            <div className="flex items-center gap-2 md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger
                  render={
                    <Button variant="ghost" size="icon" className="hover:bg-transparent" />
                  }
                >
                  <Menu className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-[#FFFFF0] p-0">
                  <div className="p-6 border-b">
                    <Link href="/" className="text-2xl font-bold font-display text-[#1A1A1A]">
                      {BRAND.name}
                    </Link>
                  </div>
                  <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <Link
                      href="/"
                      className="flex items-center gap-3 text-lg text-[#1A1A1A] hover:text-[#800020] transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Home className="h-5 w-5" /> Home
                    </Link>
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-lg text-[#1A1A1A] hover:text-[#800020] transition-colors font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="border-t pt-6">
                      <h3 className="text-sm font-semibold text-[#800020] tracking-wider uppercase mb-4">
                        Categories
                      </h3>
                      {CATEGORIES.map((cat) => (
                        <div key={cat.slug} className="mb-4">
                          <h4 className="font-medium text-[#1A1A1A] mb-2">{cat.name}</h4>
                          <div className="ml-3 space-y-2">
                            {cat.subcategories.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/products?category=${sub.slug}`}
                                className="block text-sm text-[#737373] hover:text-[#800020] transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-6 space-y-4">
                      <Link
                        href="/account"
                        className="flex items-center gap-3 text-[#1A1A1A]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5" /> My Account
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-3 text-[#1A1A1A]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Heart className="h-5 w-5" /> Wishlist
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 text-[#1A1A1A]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Package className="h-5 w-5" /> Orders
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-bold font-display tracking-tight text-[#1A1A1A]">
                {BRAND.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-[#1A1A1A]/80 hover:text-[#800020] transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#800020] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}

              {/* Category Dropdowns */}
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.slug}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(cat.slug)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#1A1A1A]/80 hover:text-[#800020] transition-colors">
                    {cat.name}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === cat.slug && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 bg-white shadow-lg border rounded-lg p-4 min-w-[200px]"
                      >
                        <div className="space-y-2">
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/products?category=${sub.slug}`}
                              className="block text-sm text-[#737373] hover:text-[#800020] transition-colors py-1"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Home */}
              <Link href="/">
                <Button variant="ghost" size="icon" className="hover:bg-transparent">
                  <Home className="h-5 w-5" />
                </Button>
              </Link>

              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Account */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-transparent" />
                  }
                >
                  <User className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/account" className="w-full cursor-pointer">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/account/orders" className="w-full cursor-pointer">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/account/wishlist" className="w-full cursor-pointer">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/account/addresses" className="w-full cursor-pointer">Addresses</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/login" className="w-full cursor-pointer flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> Sign In
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="hover:bg-transparent relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#800020] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent relative"
                onClick={toggleCart}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#800020] text-white">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t bg-[#FFFFF0]/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="max-w-3xl mx-auto px-4 py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#737373]" />
                  <Input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, brands, categories..."
                    className="pl-12 pr-4 h-12 bg-white border-[#E5E5E5] rounded-xl text-base focus-visible:ring-[#800020]"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Sheet */}
      <CartSheet />
    </>
  )
}
