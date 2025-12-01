'use client'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { OrderItem } from '@/lib/models/OrderModel'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

export default function OrderDetails({
  orderId,
  paypalClientId,
}: {
  orderId: string
  paypalClientId: string
}) {
  const { data: session } = useSession()

  function createPayPalOrder() {
    return fetch(`/api/orders/${orderId}/create-paypal-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((order) => order.id)
  }

  function onApprovePayPalOrder(data: any) {
    return fetch(`/api/orders/${orderId}/capture-paypal-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((orderData) => {
        toast.success('Order paid successfully')
      })
  }

  const { data, error } = useSWR(`/api/orders/${orderId}`)

  if (error) return error.message
  if (!data) return 'Loading...'

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = data

  return (
    <div>
      <h1 className="text-2xl py-4 text-black">Order {orderId}</h1>

      <div className="grid md:grid-cols-4 md:gap-5 my-4">
        {/* LEFT COLUMN */}
        <div className="md:col-span-3">
          {/* SHIPPING */}
          <div className="card bg-white border border-black rounded-2xl">
            <div className="card-body">
              <h2 className="card-title text-orangeDefault">
                <span>1</span> Shipping Address
              </h2>

              <p className="text-black">{shippingAddress.fullName}</p>
              <p className="text-black">
                {shippingAddress.address}, {shippingAddress.city}, {''}
              </p>
              <p className="text-black">
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>

              {isDelivered ? (
                <div className="text-green-600">
                  Delivered at: {deliveredAt}
                </div>
              ) : (
                <div className="text-red-600">Not Delivered</div>
              )}
            </div>
          </div>

          {/* PAYMENT */}
          <div className="card bg-white border border-black rounded-2xl mt-4">
            <div className="card-body">
              <h2 className="card-title text-orangeDefault">
                <span>2</span> Payment Method
              </h2>

              <p className="text-black">{paymentMethod}</p>

              {isPaid ? (
                <div className="text-green-600">Paid at: {paidAt}</div>
              ) : (
                <div className="text-red-600">Not Paid</div>
              )}
            </div>
          </div>

          {/* ITEMS */}
          <div className="card bg-white border border-black rounded-2xl mt-4">
            <div className="card-body">
              <h2 className="card-title text-orangeDefault">
                <span>3</span> Items
              </h2>

              <table className="table">
                <thead>
                  <tr className="text-black">
                    <th className="text-black">Item</th>
                    <th className="text-black">Quantity</th>
                    <th className="text-black">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item: OrderItem) => (
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

                      <td className="text-black">{item.qty}</td>

                      <td className="text-black">${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN = SUMMARY */}
        <div>
          <div className="card bg-white border border-black rounded-2xl">
            <div className="card-body">
              <h2 className="card-title text-orangeDefault">Order Summary</h2>

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
                  <div className="flex justify-between text-black font-bold">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>

                {!isPaid && paymentMethod === 'PayPal' && (
                  <li>
                    <PayPalScriptProvider
                      options={{ clientId: paypalClientId }}
                    >
                      <PayPalButtons
                        createOrder={createPayPalOrder}
                        onApprove={onApprovePayPalOrder}
                      />
                    </PayPalScriptProvider>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
