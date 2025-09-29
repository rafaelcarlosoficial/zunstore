import { Product } from '@/lib/models/ProductModel'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
export default function Productitem({ product }: { product: Product }) {
  return (
    <div className="card bg-white mb-4 rounded-none shadow-[6px_11px_54.42px_rgba(0,0,0,0.25)]">
      <figure>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover h-64 w-full"
          />
        </Link>
      </figure>
      <div className="card-body">
        <Link href={`/product/${product.slug}`}>
          <h2 className="card-title font-normal text-black">{product.name}</h2>
        </Link>
        <p className="mb-2 text-black">{product.brand}</p>
        <div className="card-actions flex items-center justify-between">
          <span className="text-2xl text-black">{product.price}</span>
        </div>
      </div>
    </div>
  )
}
