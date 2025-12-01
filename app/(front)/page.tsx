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
      {/* <div className="bg-orangeDefault flex gap-3 w-screen py-4 ">
        <Image
          src="/assets/sponsors/apple.svg"
          alt="banner"
          width={110}
          height={90}
        />
        <Image
          src="/assets/sponsors/JBL.svg"
          alt="banner"
          width={110}
          height={90}
        />
        <Image
          src="/assets/sponsors/Spotify.svg"
          alt="banner"
          width={110}
          height={90}
        />
      </div> */}
      <h2
        className="text-2xl md:text-3xl py-2 text-black font-custom text-center mb-8 mt-8
"
      >
        Os melhores fones sem fio
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 justify-center">
        {latestProducts.map((product) => (
          <Productitem key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
