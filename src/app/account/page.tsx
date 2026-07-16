"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Clock,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const menuItems = [
  {
    icon: Package,
    label: "Orders",
    href: "/account/orders",
    count: "3",
  },
  {
    icon: Heart,
    label: "Wishlist",
    href: "/account/wishlist",
    count: "12",
  },
  {
    icon: MapPin,
    label: "Addresses",
    href: "/account/addresses",
    count: "2",
  },
  {
    icon: CreditCard,
    label: "Payment Methods",
    href: "/account/payments",
  },
  {
    icon: Clock,
    label: "Recently Viewed",
    href: "/account/recently-viewed",
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    date: "12 Jul 2026",
    status: "Delivered",
    total: 2499,
    items: 2,
  },
  {
    id: "ORD-002",
    date: "08 Jul 2026",
    status: "Shipped",
    total: 3999,
    items: 1,
  },
]

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border">
              <div className="text-center mb-6">
                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarFallback className="bg-[#800020] text-white text-lg">
                    U
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold">Guest User</h2>
                <p className="text-sm text-[#737373]">guest@example.com</p>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-[#F5F0EB] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-[#737373] group-hover:text-[#800020]" />
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {"count" in item && (
                        <span className="text-xs text-[#737373]">
                          {item.count}
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 text-[#737373]" />
                    </div>
                  </Link>
                ))}
              </nav>

              <Separator className="my-4" />

              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#800020] to-[#1A1A1A] rounded-xl p-8 text-white"
            >
              <h1 className="text-2xl font-bold font-display">
                Welcome back!
              </h1>
              <p className="text-white/70 mt-2">
                Manage your account, track orders, and more.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Orders", value: "5" },
                { label: "Wishlist", value: "12" },
                { label: "Reviews", value: "3" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl p-4 border text-center"
                >
                  <p className="text-2xl font-bold text-[#800020]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#737373] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl border">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Recent Orders</h3>
                <Link
                  href="/account/orders"
                  className="text-sm text-[#800020] hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-xs text-[#737373]">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ₹{order.total.toLocaleString()}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-50 text-green-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist Preview */}
            <div className="bg-white rounded-xl border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Your Wishlist</h3>
                <Link
                  href="/account/wishlist"
                  className="text-sm text-[#800020] hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="text-center py-8 text-[#737373]">
                <Heart className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">
                  Items added to your wishlist will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
