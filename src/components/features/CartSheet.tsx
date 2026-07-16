"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/utils"

export function CartSheet() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, subtotal } = useCart()

  const shipping = subtotal >= 999 ? 0 : 99
  const total = subtotal + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FFFFF0] z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-lg font-semibold">
                  Cart ({items.length})
                </h2>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleCart}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
                <ShoppingBag className="h-16 w-16 text-[#737373]" />
                <h3 className="text-lg font-medium text-[#737373]">
                  Your cart is empty
                </h3>
                <p className="text-sm text-[#737373] text-center">
                  Looks like you haven&apos;t added anything yet.
                </p>
                <Link href="/products" onClick={toggleCart}>
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex gap-4 bg-white rounded-lg p-3 border"
                      >
                        <div className="relative w-20 h-24 rounded-md overflow-hidden flex-shrink-0 bg-[#F5F0EB]">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#737373] mt-0.5">
                            {item.size} &middot; {item.color}
                          </p>
                          <p className="text-sm font-semibold mt-1">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-6 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-500 hover:text-red-700"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#737373]">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#737373]">Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-base font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <Link href="/checkout" onClick={toggleCart}>
                    <Button className="w-full bg-[#800020] hover:bg-[#800020]/90 text-white h-12 text-base">
                      Checkout
                    </Button>
                  </Link>
                  <Link href="/cart" onClick={toggleCart}>
                    <Button variant="outline" className="w-full h-10 text-sm">
                      View Cart
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
