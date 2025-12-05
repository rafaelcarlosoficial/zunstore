'use client'
import CheckoutSteps from '@/app/components/CheckoutSteps'
import useCartService from '@/lib/hooks/useCartStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import Image from 'next/image'

const Form = () => {
  const router = useRouter()
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService()

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        clear()
        toast.success('Order placed successfully')
        return router.push(`/order/${data.order._id}`)
      } else {
        toast.error(data.message)
      }
    }
  )

  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment')
    }
    if (items.length === 0) {
      return router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router])

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  return (
    <div>
      <CheckoutSteps current={4} />

      <div className="grid lg:grid-cols-4 lg:gap-5 my-4">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card bg-white">
            <div className="card-body bg-white border border-black rounded-2xl">
              <div className="flex justify-between">
                <h2 className="card-title text-orangeDefault flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-orangeDefault text-orangeDefault text-sm font-semibold">
                    1
                  </span>
                  Dados de entrega
                </h2>

                <div className="flex flex-row justify-center items-center gap-1">
                  <Link
                    href="/shipping"
                    className="flex items-center gap-1 text-black font-semibold"
                  >
                    <Image
                      src="/assets/edit.svg"
                      alt="Editar"
                      width={24}
                      height={24}
                    />
                    <span>Editar</span>
                  </Link>
                </div>
              </div>

              <p className="text-black">{shippingAddress.fullName}</p>
              <p className="text-black">
                {shippingAddress.address}, {shippingAddress.city},{' '}
              </p>
              <p className="text-black">
                {shippingAddress.postalCode}, {shippingAddress.country}{' '}
              </p>
            </div>
          </div>

          <div className="card bg-white mt-4">
            <div className="card-body bg-white border border-black rounded-2xl ">
              <div className="flex justify-between">
                <h2 className="card-title text-orangeDefault flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-orangeDefault text-orangeDefault text-sm font-semibold">
                    2
                  </span>
                  Método de Pagamento
                </h2>

                <Link
                  href="/shipping"
                  className="flex items-center gap-1 text-black font-semibold"
                >
                  <Image
                    src="/assets/edit.svg"
                    alt="Editar"
                    width={24}
                    height={24}
                  />
                  <span>Editar</span>
                </Link>
              </div>

              <p className="text-black">{paymentMethod}</p>
            </div>
          </div>

          <div className="card bg-white mt-4">
            <div className="card-body border-black rounded-2xl border">
              <div className="flex justify-between">
                <h2 className="card-title text-orangeDefault flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-orangeDefault text-orangeDefault text-sm font-semibold">
                    3
                  </span>
                  Items
                </h2>
                <Link
                  href="/shipping"
                  className="flex items-center gap-1 text-black font-semibold"
                >
                  <Image
                    src="/assets/edit.svg"
                    alt="Editar"
                    width={24}
                    height={24}
                  />
                  <span>Editar</span>
                </Link>
              </div>
              <table className="table">
                <thead>
                  <tr className="text-black">
                    <th className="text-black">Item</th>
                    <th className="text-black">Quantidade</th>
                    <th className="text-black">Preço</th>
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
                        <span className="text-black">{item.qty}</span>
                      </td>
                      <td className="text-black">${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-5 lg:mt-0">
          <div className="card bg-white border border-black rounded-2xl">
            <div className="card-body">
              <ul className="space-y-3">
                <li>
                  <div className="flex justify-between text-black">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between text-black">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between text-black">
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between text-black text-bold">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>

                <li>
                  <button
                    onClick={() => placeOrder()}
                    disabled={isPlacing}
                    className="btn btn-primary w-full bg-orangeDefault border-orangeDefault hover:bg-orangeHover hover:cursor-pointer py-5"
                  >
                    {isPlacing && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Continuar
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
