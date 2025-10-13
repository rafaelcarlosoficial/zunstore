'use client'
import { useEffect } from 'react'
import useLocalQtyStore from '@/lib/hooks/useLocalQtyStore'
import ProductStock from './ProductStock'
import BuyButton from './BuyButton'
import { Product } from '@/lib/models/ProductModel'

export default function ProductDetailsClient({
  product,
}: {
  product: Product
}) {
  const { setLocalQty } = useLocalQtyStore()

  useEffect(() => {
    setLocalQty(1)
  }, [product.slug])

  return (
    <div className="flex flex-col gap-4 xs:w-full">
      <ProductStock product={product} />
      <BuyButton product={product} />
    </div>
  )
}
