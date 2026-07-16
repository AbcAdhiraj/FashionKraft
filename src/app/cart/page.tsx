"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)

  const shipping = subtotal >= 999 ? 0 : 99
  const discount = couponApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "FKRFT10") {
      setCouponApplied(true)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 bg-[#FFFFF0]">
        <div className="w-24 h-24 rounded-full bg-[#F5F0EB] flex items-center justify-center">
          <ShoppingBag className="h-10 w-10 text-[#737373]" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">
            Your cart is empty
          </h1>
          <p className="text-[#737373] mt-2">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
        </div>
        <Link href="/products">
          <Button className="bg-[#800020] hover:bg-[#800020]/90 text-white rounded-full px-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold font-display text-[#1A1A1A] mb-8">
          Shopping Cart ({items.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-4 bg-white rounded-xl p-4 border"
                >
                  <div className="relative w-24 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-[#F5F0EB]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          href={`/products/${item.productId}`}
                          className="text-sm font-medium hover:text-[#800020] transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-[#737373] mt-0.5">
                          Size: {item.size} | Color: {item.color}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#737373] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8 flex items-center justify-center hover:bg-[#F5F0EB] transition-colors rounded-l-lg"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 flex items-center justify-center hover:bg-[#F5F0EB] transition-colors rounded-r-lg"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.discount && item.discount > 0 && (
                          <p className="text-xs text-green-600">
                            You save {formatPrice(
                              item.price * item.quantity * item.discount * 0.01
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#737373]">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#737373]">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount (10%)</span>
                    <span className="text-green-600 font-medium">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-[#800020]" />
                  <span className="text-sm font-medium">Apply Coupon</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="h-9 text-sm bg-white"
                    disabled={couponApplied}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white"
                    onClick={applyCoupon}
                    disabled={couponApplied || !couponCode}
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </Button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-green-600 mt-1">
                    Coupon FKRFT10 applied successfully!
                  </p>
                )}
                <p className="text-xs text-[#737373] mt-1">
                  Try code: FKRFT10 for 10% off
                </p>
              </div>

              <Link href="/checkout">
                <Button className="w-full mt-6 bg-[#800020] hover:bg-[#800020]/90 text-white h-12 text-base">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/products">
                <Button
                  variant="ghost"
                  className="w-full mt-2 text-sm text-[#737373]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
