'use client'
import useCartStore from '@/lib/hooks/useCartStore'
import React from 'react'
import Link from 'next/link'
// import { useState } from 'react'
import { Product } from '@/lib/models/ProductModel'
import useLocalQtyStore from '@/lib/hooks/useLocalQtyStore'

const BuyButton = ({ product }: { product: Product }) => {
  const { increase } = useCartStore()

  // const [selectedQty, setSelectedQty] = useState(1)
  const { localQty } = useLocalQtyStore()

  const handleBuy = () => {
    // if (selectedQty <= 0) return
    // increase({ ...product, qty: selectedQty }, selectedQty)
    if (localQty <= 0) return
    increase({ ...product, qty: localQty }, localQty)
    //this one for some reason return the value again to 1
    // setSelectedQty(1)
  }
  return (
    <div className="flex flex-col gap-4 items-center">
      <button
        onClick={handleBuy}
        className="text-white text-xl bg-orangeDefault px-35 py-4 rounded-4xl xs:w-full hover:bg-orangeHover"
      >
        Comprar
      </button>

      <Link href="/cart">
        <button
          className="text-xl px-25 py-4 rounded-full xs:w-full
      border-2 border-orangeDefault text-orangeDefault
      hover:bg-orangeHover hover:text-white"
        >
          Ir para o carrinho
        </button>
      </Link>
    </div>
  )
}

export default BuyButton
