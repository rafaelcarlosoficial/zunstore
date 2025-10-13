'use client'
import React, { useState } from 'react'
import { Product } from '@/lib/models/ProductModel'
import AddToCart from '@/app/components/products/AddToCart'

const ProductStock = ({ product }: { product: Product }) => {
  const [selectedQty, setSelectedQty] = useState(1)

  return (
    <>
      {product.countInStock !== 0 && (
        <div className="card-actions justify-center">
          <AddToCart onQtyChange={(qty) => setSelectedQty(qty)} />
        </div>
      )}
    </>
  )
}

export default ProductStock
