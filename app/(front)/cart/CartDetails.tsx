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
      <h1
        className="py-4 text-2xl text-orangeDefault font-semibold
"
      >
        Meu carrinho
      </h1>
      {items.length === 0 ? (
        <div className="text-black">
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        // If any shit happen set those values again: grid md:grid-cols-4 md:gap-5
        <div className=" grid md:grid-cols-4 md:gap-5">
          <div className="flex flex-col gap-15">
            {items.map((item) => (
              <div
                key={item.slug}
                className="flex flex-col items-center justify-between gap-4 shadow-xl py-4"
              >
                <div className="flex flex-col items-center">
                  <div>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-center align-center">
                    {/* <p className="text-black font-semibold text-base leading-[1.0625rem] items-center align-center justify-center">
                      {item.name}
                    </p> */}
                    <p className="text-black font-semibold text-base leading-[1.0625rem] items-center align-center justify-center">
                      {item.name}
                    </p>

                    <span className="text-black leading-[1.0625rem] items-center align-center">
                      Vendido por ZunStore
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center align-center">
                  <p className="text-black font-semibold text-lg items-center align-center justify-center">
                    R$ {item.price}
                  </p>
                  <div className="border-[2px] border-[#D9D9D9] rounded-2xl flex items-center justify-center w-[30%] gap-2 px-8 py-2 ">
                    <button
                      className="text-black cursor-pointer"
                      onClick={() => decrease(item)}
                    >
                      -
                    </button>
                    <span className="px-2 text-black">{item.qty}</span>
                    <button
                      className="text-black cursor-pointer"
                      onClick={() => increase(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <Image
                  src={'/assets/bin.svg'}
                  alt={'ícone de Lixiera'}
                  width={20}
                  height={20}
                />
                {/* trash icon */}
              </div>
            ))}
          </div>

          {/* <div>
            <div>
              Image
              <div>
                <p></p>
                <span>Vendido por fulando de cicrano</span>
              </div>
              <div>
                <span>Qunatidade</span>
                <span>Preço</span>
              </div>
              <span>Lixeira</span>
            </div>
          </div> */}

          {/* <div className="overflow-x-auto md:col-span-3">
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
          </div> */}
          <div className="bg-white shadow-xl flex flex-col items-center justify-center my-6 mx-6 py-8">
            <ul className="flex flex-col items-center justify-center gap-2 text-black">
              <li className="flex space-between gap-2">
                <span>SubTotal</span>
                <span>R$ 1917,99</span>
              </li>

              <li className="flex items-center gap-2">
                <span>Descontos</span>
                <span>R$ 174,80</span>
              </li>
              <li className="flex items-center gap-2">
                <span>Total</span>
                <span>R$ 1743,19</span>
              </li>
              <li>
                <button className="text-white text-xl bg-orangeDefault px-12 py-2 rounded-4xl">
                  Continuar
                </button>
              </li>
            </ul>
          </div>

          {/* <div className="card bg-base-300">
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
          </div> */}
        </div>
      )}
    </>
  )
}
