'use client'

import { Order } from '@/lib/models/OrderModel'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function MyOrders() {
  const router = useRouter()
  const { data: orders, error } = useSWR(`/api/orders/mine`)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  if (error) return <p className="text-black">An error has occurred.</p>
  if (!orders) return <p className="text-black">Loading...</p>

  return (
    <div className="overflow-x-auto text-black">
      <table className="table text-black border border-gray-300">
        <thead className="text-black bg-gray-100">
          <tr>
            <th className="text-black">ID</th>
            <th className="text-black">DATE</th>
            <th className="text-black">TOTAL</th>
            <th className="text-black">PAID</th>
            <th className="text-black">DELIVERED</th>
            <th className="text-black">ACTION</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {orders.map((order: Order) => (
            <tr key={order._id} className="text-black hover:bg-gray-50">
              <td>{order._id.substring(20, 24)}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>R${order.totalPrice}</td>
              <td>
                {order.isPaid && order.paidAt
                  ? `${order.paidAt.substring(0, 10)}`
                  : 'not paid'}
              </td>
              <td>
                {order.isDelivered && order.deliveredAt
                  ? `${order.deliveredAt.substring(0, 10)}`
                  : 'not delivered'}
              </td>
              <td>
                <Link
                  href={`/order/${order._id}`}
                  passHref
                  className="text-blue-600 hover:underline"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
