"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Package,
  ShoppingBag,
  Users,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const stats = [
  {
    label: "Total Revenue",
    value: "₹12,45,678",
    change: "+12.5%",
    trend: "up",
    icon: IndianRupee,
  },
  {
    label: "Orders",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
  },
  {
    label: "Products",
    value: "2,847",
    change: "+3.1%",
    trend: "up",
    icon: Package,
  },
  {
    label: "Customers",
    value: "1,234",
    change: "-2.4%",
    trend: "down",
    icon: Users,
  },
]

const recentOrders = [
  { id: "#ORD-001", customer: "Priya Sharma", items: 3, total: 5499, status: "Delivered", date: "12 Jul 2026" },
  { id: "#ORD-002", customer: "Ananya Patel", items: 1, total: 2499, status: "Shipped", date: "11 Jul 2026" },
  { id: "#ORD-003", customer: "Riya Gupta", items: 2, total: 3998, status: "Processing", date: "10 Jul 2026" },
  { id: "#ORD-004", customer: "Neha Singh", items: 4, total: 12999, status: "Pending", date: "09 Jul 2026" },
  { id: "#ORD-005", customer: "Kavita Reddy", items: 1, total: 899, status: "Cancelled", date: "08 Jul 2026" },
]

const products = [
  { name: "Silk Banarasi Saree", category: "Sarees", price: 2499, stock: 45, sales: 128 },
  { name: "Cotton Printed Kurti", category: "Kurtis", price: 1299, stock: 78, sales: 89 },
  { name: "Designer Lehenga Choli", category: "Lehengas", price: 8999, stock: 12, sales: 256 },
  { name: "Floral Maxi Dress", category: "Dresses", price: 1999, stock: 34, sales: 45 },
]

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Admin Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-display text-[#1A1A1A]">
                Admin Dashboard
              </h1>
              <p className="text-sm text-[#737373]">Welcome back, Admin</p>
            </div>
            <Button className="bg-[#800020] hover:bg-[#800020]/90 text-white">
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#800020]/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-[#800020]" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-[#737373] mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs: Orders, Products */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="bg-white border">
            <TabsTrigger value="orders" className="data-[state=active]:bg-[#800020] data-[state=active]:text-white">
              Orders
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-[#800020] data-[state=active]:text-white">
              Products
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#800020] data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-4">
            <div className="bg-white rounded-xl border overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">Recent Orders</h3>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search orders..."
                    className="h-8 w-48 text-sm bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-32 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F5F0EB]">
                    <tr>
                      <th className="text-left p-3 font-medium">Order</th>
                      <th className="text-left p-3 font-medium">Customer</th>
                      <th className="text-left p-3 font-medium">Items</th>
                      <th className="text-left p-3 font-medium">Total</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Date</th>
                      <th className="text-left p-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#F5F0EB]/50 transition-colors">
                        <td className="p-3 font-medium">{order.id}</td>
                        <td className="p-3">{order.customer}</td>
                        <td className="p-3">{order.items}</td>
                        <td className="p-3">₹{order.total.toLocaleString()}</td>
                        <td className="p-3">
                          <Badge
                            className={`text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-50 text-green-600"
                                : order.status === "Shipped"
                                ? "bg-blue-50 text-blue-600"
                                : order.status === "Processing"
                                ? "bg-yellow-50 text-yellow-600"
                                : order.status === "Cancelled"
                                ? "bg-red-50 text-red-600"
                                : "bg-gray-50 text-gray-600"
                            }`}
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-[#737373]">{order.date}</td>
                        <td className="p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-4">
            <div className="bg-white rounded-xl border overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">Product Inventory</h3>
                <Button size="sm" className="bg-[#800020] hover:bg-[#800020]/90 text-white">
                  <Plus className="h-3 w-3 mr-1" /> Add Product
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F5F0EB]">
                    <tr>
                      <th className="text-left p-3 font-medium">Product</th>
                      <th className="text-left p-3 font-medium">Category</th>
                      <th className="text-left p-3 font-medium">Price</th>
                      <th className="text-left p-3 font-medium">Stock</th>
                      <th className="text-left p-3 font-medium">Sales</th>
                      <th className="text-left p-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {products.map((product) => (
                      <tr key={product.name} className="hover:bg-[#F5F0EB]/50 transition-colors">
                        <td className="p-3 font-medium">{product.name}</td>
                        <td className="p-3 text-[#737373]">{product.category}</td>
                        <td className="p-3">₹{product.price.toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`${
                            product.stock < 20 ? "text-red-600 font-medium" : ""
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-3">{product.sales}</td>
                        <td className="p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="font-semibold mb-4">Sales Overview</h3>
                <div className="h-48 flex items-center justify-center text-[#737373] text-sm">
                  Chart will render here with recharts
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="font-semibold mb-4">Top Categories</h3>
                <div className="h-48 flex items-center justify-center text-[#737373] text-sm">
                  Chart will render here with recharts
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
