import Image from 'next/image'
import Link from 'next/link'
import data from '@/lib/data'
import ImageDetails from './imageDetails'
import AddToCart from '@/app/components/products/AddToCart'
import { convertDocToObj, round2 } from '@/lib/utils'
import ProductDetailsClient from './ProductDetailsClient'
import productService from '@/lib/services/productService'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await productService.getBySlug(slug)
  if (!product) {
    return { title: 'Product not found' }
  }

  return {
    title: product.name,
  }
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const product = await productService.getBySlug(slug)
  if (!product) return <div>Product not found</div>

  return (
    <div className="my-16">
      <div className="my-2">
        <Link href="/">
          <span className="text-black">back to products</span>
        </Link>
      </div>

      <div className="flex flex-col justify-around lg:flex-row ">
        <div>
          <div className="lg: flex items-center align-center justify-center">
            {/* <ImageDetails product={convertDocToObj(product)} /> */}
          </div>
        </div>

        <div className="flex flex-col gap-6 justify-center align-center pb-14 sm: items-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-black font-semibold text-4xl">
              {product.name}
            </h2>

            <div className="flex gap-2">
              {/* <Image
                src="/assets/house-Icon.svg"
                alt="house icon"
                width={25}
                height={25}
              /> */}
              <p className="text-black text-xl">
                Vendido e entregue por{' '}
                <span className="font-semibold text-orangeDefault ">
                  ZunStore
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-black">
              <span className="font-semibold">R${product.price}</span> em até{' '}
              <span className="font-semibold">
                {product.installments}X de{' '}
                {round2(product.price / product.installments)}
              </span>{' '}
              sem juros no cartão
            </p>

            <p className="text-black text-5xl font-semibold">
              R${product.price}
            </p>

            <p className="text-black font-semibold">
              À vista com{' '}
              <span className="text-green-600">
                {product.discount}%desconto
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-4 xs:w-full">
            <ProductDetailsClient product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
