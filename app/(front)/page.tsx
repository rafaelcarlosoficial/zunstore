import { Metadata } from 'next'
import Productitem from '../components/products/Productitem'
import data from '@/lib/data'
import productService from '@/lib/services/productService'
import Link from 'next/link'
import Image from 'next/image'
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'zunstore',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Nextjs, Server components, Next auth, daisyui, zustand',
}
export default async function Home() {
  const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest()
  return (
    <div>
      <div className="w-full carousel rounded-box mt-4">
        {featuredProducts.map((product, index) => (
          <div
            key={product._id}
            id={`slide-${index}`}
            className="carousel-item relative w-full"
          >
            <Link href={`/product/${product.slug}`}>
              <div className="relative w-full h-[650px]">
                <Image
                  src="/assets/Desktop-banner-ZunStore.webp"
                  alt="banner"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Link>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide-${
                  index === 0 ? featuredProducts.length - 1 : index - 1
                }`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide-${
                  index === featuredProducts.length - 1 ? 0 : index + 1
                }`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl py-2 text-black">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 justify-center">
        {latestProducts.map((product) => (
          <Productitem key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
