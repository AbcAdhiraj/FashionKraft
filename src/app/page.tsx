import { HeroSection } from "@/components/features/HeroSection"
import { BrandMarquee } from "@/components/features/BrandMarquee"
import { ProductGridSection } from "@/components/features/ProductGridSection"
import { CategoryShowcase } from "@/components/features/CategoryShowcase"
import { FeaturedBanner } from "@/components/features/FeaturedBanner"
import { NewsletterSection } from "@/components/features/NewsletterSection"

import { IMAGES } from "@/lib/images"

const placeholderProducts = [
  {
    id: "1",
    name: "Silk Banarasi Saree",
    slug: "silk-banarasi-saree",
    price: 2499,
    comparePrice: 4999,
    discount: 50,
    images: [IMAGES.products[0]],
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Cotton Printed Kurti",
    slug: "cotton-printed-kurti",
    price: 1299,
    comparePrice: 1999,
    discount: 35,
    images: [IMAGES.products[1]],
    rating: 4.2,
    reviewCount: 89,
    isNew: false,
    inStock: true,
  },
  {
    id: "3",
    name: "Designer Lehenga Choli",
    slug: "designer-lehenga-choli",
    price: 8999,
    comparePrice: 14999,
    discount: 40,
    images: [IMAGES.products[2]],
    rating: 4.8,
    reviewCount: 256,
    isNew: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Floral Maxi Dress",
    slug: "floral-maxi-dress",
    price: 1999,
    comparePrice: null,
    discount: null,
    images: [IMAGES.products[3]],
    rating: 4.0,
    reviewCount: 45,
    isNew: false,
    inStock: true,
  },
  {
    id: "5",
    name: "Embroidered Anarkali",
    slug: "embroidered-anarkali",
    price: 3999,
    comparePrice: 5999,
    discount: 33,
    images: [IMAGES.products[4]],
    rating: 4.6,
    reviewCount: 172,
    isNew: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Linen Shirt Dress",
    slug: "linen-shirt-dress",
    price: 2499,
    comparePrice: 3499,
    discount: 28,
    images: [IMAGES.products[5]],
    rating: 4.3,
    reviewCount: 67,
    isNew: false,
    inStock: true,
  },
  {
    id: "7",
    name: "Party Wear Sharara Set",
    slug: "party-wear-sharara-set",
    price: 5499,
    comparePrice: 7999,
    discount: 31,
    images: [IMAGES.products[6]],
    rating: 4.7,
    reviewCount: 94,
    isNew: true,
    inStock: true,
  },
  {
    id: "8",
    name: "Casual Cotton Top",
    slug: "casual-cotton-top",
    price: 899,
    comparePrice: 1499,
    discount: 40,
    images: [IMAGES.products[7]],
    rating: 4.1,
    reviewCount: 203,
    isNew: false,
    inStock: true,
  },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandMarquee />
      <CategoryShowcase />
      <ProductGridSection
        title="Trending Now"
        description="Most loved products by our customers this season"
        href="/products?sort=popularity"
        products={placeholderProducts.slice(0, 4)}
      />
      <ProductGridSection
        title="New Arrivals"
        description="Fresh drops to elevate your style"
        href="/products?sort=newest"
        products={placeholderProducts.slice(4, 8)}
      />
      <FeaturedBanner />
      <ProductGridSection
        title="Best Sellers"
        description="Our most popular picks loved by thousands"
        href="/products?sort=popularity"
        products={placeholderProducts}
      />
      <NewsletterSection />
    </>
  )
}
