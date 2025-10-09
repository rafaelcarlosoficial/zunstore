'use client'

import useCartService from '@/lib/hooks/useCartStore'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function CartDetails() {
  const router = useRouter()
  const { items, itemsPrice, decrease, increase } = useCartService()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  return (
    <>
      <h1 className="py-4 text-2xl text-black">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-black">
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2 text-black">{item.name}</span>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => decrease(item)}
                      >
                        -
                      </button>
                      <span className="px-2 text-black">{item.qty}</span>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => increase(item)}
                      >
                        +
                      </button>
                    </td>
                    <td className="text-black">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card bg-base-300">
            <div className="card-body">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Subtotal ({items.reduce((a, c) => a + c.qty, 0)})
                    {itemsPrice}
                  </div>
                </li>
                <li>
                  <button onClick={() => router.push('/shipping')}>
                    Proceed to Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
