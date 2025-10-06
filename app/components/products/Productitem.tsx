import { Product } from '@/lib/models/ProductModel'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
export default function Productitem({ product }: { product: Product }) {
  return (
    <div
      className="card bg-white mb-4 rounded-none shadow-xl/20

 flex flex-col items-center justify-center pt-6 pb-2"
    >
      <Link href={`/product/${product.slug}`}>
        <h2 className="card-title font-semibold text-black text-center text-xl">
          {product.name}
        </h2>
      </Link>
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
      <div className="card-body flex flex-col items-center w-full">
        <div className="card-actions flex flex-col items-center justify-between w-full">
          <p className="text-4xl text-greenLight font-semibold text-center w-full max-w-xs">
            R$ {product.price}
          </p>
          <span
            className=" text-cent text-black text-base
"
          >
            à vista{' '}
          </span>
          <span className="text-xl text-black text-center w-full max-w-xs ">
            ou em {product.installments}X no cartão
          </span>
        </div>
        <button
          className="size-min bg-orangeDefault text-white text-base
 font-semibold rounded-[30px] hover:bg-green-700 py-5 px-14  w-full"
        >
          Comprar
        </button>
      </div>
    </div>
  )
}
