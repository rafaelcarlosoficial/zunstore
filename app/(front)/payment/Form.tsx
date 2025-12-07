'use client'
import CheckoutSteps from '@/app/components/CheckoutSteps'
import useCartService from '@/lib/hooks/useCartStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Form = () => {
  const router = useRouter()
  const { savePaymentMethod, paymentMethod, shippingAddress } = useCartService()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    savePaymentMethod(selectedPaymentMethod)
    router.push('/place-order')
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping')
    }
    setSelectedPaymentMethod(paymentMethod || 'PayPal')
  }, [paymentMethod, router, shippingAddress.address])

  return (
    <div>
      <CheckoutSteps current={2} />
      <div className="max-w-sm mx-auto card bg-orangeWhite shadow-xl/20 py-8 my-12">
        <div className="card-body">
          <h1 className="card-title text-black text-center">
            Método De Pagamento
          </h1>
          <form onSubmit={handleSubmit}>
            {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
              <div key={payment}>
                <label className="label cursor-pointer">
                  <span className="label-text text-black">{payment}</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="radio"
                    value={payment}
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                  />
                </label>
              </div>
            ))}
            <div className="my-2">
              <button
                type="submit"
                className="btn btn-primary w-full bg-orangeDefault border-orangeDefault hover:bg-orangeHover hover:cursor-pointer py-5 border-none"
              >
                Next
              </button>
            </div>
            <div className="my-2">
              <button
                type="button"
                className="btn w-full my-2 bg-black text-white"
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Form
