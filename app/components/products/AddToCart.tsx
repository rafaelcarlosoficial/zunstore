'use client'
import useCartService from '@/lib/hooks/useCartStore'
import { OrderItem } from '@/lib/models/OrderModel'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter()
  const { items, increase, decrease } = useCartService()
  const [existItem, setExistItem] = useState<OrderItem | undefined>()

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug))
  }, [item, items])

  // Always show the controls, defaulting to 0 if not in cart
  const qty = existItem?.qty ?? 0

  return (
    <div className="border-[2px] border-[#D9D9D9] rounded-4xl flex items-center justify-center gap-4 px-10 py-4">
      <button
        className="text-black cursor-pointer"
        type="button"
        onClick={() => decrease(item)}
      >
        -
      </button>
      <span className="px-2 text-black cursor-pointer">{qty}</span>
      <button
        className="text-black cursor-pointer"
        type="button"
        onClick={() => increase(item)}
      >
        +
      </button>
    </div>
  )
}
