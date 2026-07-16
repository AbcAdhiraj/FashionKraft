export const BRAND = {
  name: "FashionKraft",
  tagline: "Where Style Meets Craftsmanship",
  description: "Premium boutique fashion for the modern woman",
} as const

export const COLORS = {
  ivory: "#FFFFF0",
  champagne: "#F7E7CE",
  black: "#1A1A1A",
  roseGold: "#B76E79",
  deepMaroon: "#800020",
  softBeige: "#F5F0EB",
} as const

export const CATEGORIES = [
  {
    name: "Women",
    slug: "women",
    subcategories: [
      { name: "Sarees", slug: "sarees" },
      { name: "Kurtis", slug: "kurtis" },
      { name: "Dresses", slug: "dresses" },
      { name: "Lehengas", slug: "lehengas" },
      { name: "Tops", slug: "tops" },
      { name: "Western Wear", slug: "western-wear" },
    ],
  },
  {
    name: "Men",
    slug: "men",
    subcategories: [
      { name: "Shirts", slug: "shirts" },
      { name: "Kurtas", slug: "kurtas" },
      { name: "Jackets", slug: "jackets" },
    ],
  },
  {
    name: "Accessories",
    slug: "accessories",
    subcategories: [
      { name: "Jewellery", slug: "jewellery" },
      { name: "Bags", slug: "bags" },
      { name: "Footwear", slug: "footwear" },
    ],
  },
] as const

export const SORT_OPTIONS = [
  { name: "Popularity", value: "popularity" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
  { name: "New Arrivals", value: "newest" },
] as const

export const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"] as const

export const RATING_OPTIONS = [5, 4, 3, 2, 1] as const

export const PRICE_RANGES = [
  { name: "Under ₹1,000", min: 0, max: 1000 },
  { name: "₹1,000 - ₹3,000", min: 1000, max: 3000 },
  { name: "₹3,000 - ₹5,000", min: 3000, max: 5000 },
  { name: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { name: "Above ₹10,000", min: 10000, max: Infinity },
] as const

export const NAV_LINKS = [
  { name: "New Arrivals", href: "/products?sort=newest" },
  { name: "Best Sellers", href: "/products?sort=popularity" },
  { name: "Festive Collection", href: "/products?category=festive" },
  { name: "Sale", href: "/products?sale=true" },
] as const
