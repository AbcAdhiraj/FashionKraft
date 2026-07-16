"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  CreditCard,
  Truck,
  MapPin,
  ShieldCheck,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"

const paymentMethods = [
  { id: "razorpay", label: "Razorpay", icon: CreditCard, desc: "Pay via UPI, Card, Net Banking" },
  { id: "cod", label: "Cash on Delivery", icon: Wallet, desc: "Pay when you receive" },
]

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [isProcessing, setIsProcessing] = useState(false)

  const shipping = subtotal >= 999 ? 0 : 99
  const total = subtotal + shipping

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 1500))

    if (paymentMethod === "cod") {
      toast.success("Order placed successfully!", {
        description: "Your order will be delivered within 5-7 business days.",
      })
    } else {
      toast.success("Redirecting to payment...")
    }
    setIsProcessing(false)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#FFFFF0]">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1 text-sm text-[#737373] hover:text-[#800020] transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Cart
        </Link>

        <h1 className="text-3xl font-bold font-display text-[#1A1A1A] mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 border"
            >
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-[#800020]" />
                <h2 className="text-lg font-semibold">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label>Full Name</Label>
                  <Input placeholder="John Doe" className="bg-white mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Phone Number</Label>
                  <Input placeholder="+91 98765 43210" className="bg-white mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Street Address</Label>
                  <Input placeholder="123, Fashion Street" className="bg-white mt-1" />
                </div>
                <div>
                  <Label>City</Label>
                  <Input placeholder="Mumbai" className="bg-white mt-1" />
                </div>
                <div>
                  <Label>State</Label>
                  <Input placeholder="Maharashtra" className="bg-white mt-1" />
                </div>
                <div>
                  <Label>Pincode</Label>
                  <Input placeholder="400001" className="bg-white mt-1" />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 border"
            >
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5 text-[#800020]" />
                <h2 className="text-lg font-semibold">Payment Method</h2>
              </div>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? "border-[#800020] bg-[#800020]/5"
                          : "border-[#E5E5E5] hover:border-[#800020]"
                      }`}
                    >
                      <RadioGroupItem value={method.id} className="data-[state=checked]:border-[#800020] data-[state=checked]:text-[#800020]" />
                      <method.icon className="h-5 w-5 text-[#737373]" />
                      <div>
                        <p className="text-sm font-medium">{method.label}</p>
                        <p className="text-xs text-[#737373]">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </RadioGroup>

              {paymentMethod === "razorpay" && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    Your payment is secured with 256-bit SSL encryption. We
                    support UPI, Credit/Debit Cards, Net Banking, and Wallets.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-12 h-14 rounded-md overflow-hidden flex-shrink-0 bg-[#F5F0EB]">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.name}</p>
                      <p className="text-[10px] text-[#737373]">
                        Qty: {item.quantity} | {item.size}
                      </p>
                      <p className="text-xs font-semibold mt-0.5">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2 mt-4">
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

              <div className="mt-4 flex items-center gap-2 text-xs text-[#737373]">
                <Truck className="h-3 w-3" />
                Estimated delivery: 5-7 business days
              </div>

              <Button
                className="w-full mt-6 bg-[#800020] hover:bg-[#800020]/90 text-white h-12 text-base"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : paymentMethod === "cod" ? (
                  "Place Order (COD)"
                ) : (
                  "Pay & Place Order"
                )}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-1 text-xs text-[#737373]">
                <ShieldCheck className="h-3 w-3" />
                Secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
