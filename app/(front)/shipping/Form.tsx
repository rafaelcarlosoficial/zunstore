'use client'
import CheckoutSteps from '@/app/components/CheckoutSteps'
import useCartService from '@/lib/hooks/useCartStore'
import { ShippingAddress } from '@/lib/models/OrderModel'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, ValidationRule, useForm } from 'react-hook-form'

const Form = () => {
  const router = useRouter()
  const { saveShippingAddress, shippingAddress } = useCartService() // fixed typo

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  })

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('postalCode', shippingAddress.postalCode)
    setValue('country', shippingAddress.country)
  }, [setValue, shippingAddress])

  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddress(form)
    router.push('/payment')
  }

  const FormInput = ({
    id,
    name,
    required,
    pattern,
    placeholder,
  }: {
    id: keyof ShippingAddress
    name: string
    required?: boolean
    pattern?: ValidationRule<RegExp>
    placeholder: string
  }) => (
    <div className="mb-2">
      <label className="label text-black" htmlFor={id}>
        {name}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        className="input input-bordered w-full max-w-sm bg-white text-black border-black "
      />
      {errors[id]?.message && (
        <div className="text-error">{errors[id]?.message}</div>
      )}
    </div>
  )

  return (
    <div>
      <CheckoutSteps current={1} />
      <div className="max-w-sm mx-auto card bg-orangeWhite shadow-xl/20  py-8 my-12">
        <div className="card-body ">
          <h1 className="card-title text-black">Endereço para envio</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormInput
              name="Nome completo"
              id="fullName"
              placeholder="Digite seu nome"
              required
              pattern={{
                value: /^[A-Za-z\s]+$/,
                message: 'Nome só pode conter letras e espaços',
              }}
            />
            <FormInput
              name="Endereço"
              id="address"
              placeholder="Digite seu endereço"
              required
            />
            <FormInput
              name="Cidade"
              id="city"
              placeholder="Digite sua cidade"
              required
            />
            <FormInput
              name="CEP"
              id="postalCode"
              placeholder="Digite seu CEP"
              required
              pattern={{
                value: /^[0-9]+$/,
                message: 'CEP só pode conter números',
              }}
            />
            <FormInput
              name="País"
              id="country"
              placeholder="Digite seu país"
              required
              pattern={{
                value: /^[A-Za-z\s]+$/,
                message: 'País só pode conter letras',
              }}
            />
            <div className="my-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full bg-orangeDefault border-orangeDefault hover:bg-orangeHover hover:cursor-pointer py-5 border-none"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Form
