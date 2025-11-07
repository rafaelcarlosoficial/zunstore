import { Metadata } from 'next'
import Productitem from '../components/products/Productitem'
import data from '@/lib/data'
import productService from '@/lib/services/productService'
import LoadMoreProducts from '../components/products/LoadMoreProducts'
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
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <Image
          src="/assets/Desktop-banner-ZunStore.webp"
          alt="banner"
          width={1920}
          height={150}
          className="w-[100vw]"
          priority
        />
      </div>

      <h2 className="text-2xl py-2 text-black">Os melhores fones sem fio</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 justify-center">
        {latestProducts.map((product) => (
          <Productitem key={product.slug} product={product} />
        ))}
      </div>
      <div className="flex align-center justify-center">
        <button
          className="bg-orangeDefault p-2 text-white text-semibold border-rounded mt-4 hover:bg-orangeHover rounded-2xl

"
        >
          Load More
        </button>
      </div>
    </div>
  )
}
