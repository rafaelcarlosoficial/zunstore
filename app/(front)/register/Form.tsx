'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Form = () => {
  const { data: session } = useSession()
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') || '/'
  const router = useRouter()

  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  useEffect(() => {
    if (session && session.user) router.push(callbackUrl)
  }, [callbackUrl, router, session])

  const formSubmit: SubmitHandler<Inputs> = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    // Password match check
    if (password !== confirmPassword) {
      setFormError('As senhas não conferem!')
      return
    }

    setFormError(null) // clear previous errors

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      })

      if (!res.ok) {
        const data = await res.json()
        setFormError(data.message || 'Erro ao criar conta')
        return
      }

      router.push(
        `/signin?callbackUrl=${callbackUrl}&success=Conta criada com sucesso!`
      )
    } catch (err) {
      setFormError('Erro ao criar conta')
    }
  }

  return (
    <div className="max-w-sm mx-auto card bg-orangeWhite shadow-xl/20 py-8 my-12">
      <div className="card-body">
        <div className="flex justify-center">
          <h1 className="card-title text-black text-3xl text-center">
            Criar conta
          </h1>
        </div>

        {/* Error message from state */}
        {formError && (
          <div className="alert text-error bg-orangeWhite border-none shadow-none text-lg font-semibold text-center flex justify-center items-center my-2">
            {formError}
          </div>
        )}

        {/* Success message from query */}
        {params.get('success') && (
          <div className="bg-green-50 text-green-800 border border-green-200 rounded-md px-4 py-2 text-lg font-semibold text-center flex justify-center items-center my-2">
            {params.get('success')}
          </div>
        )}

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label className="label text-black" htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: 'O nome é obrigatório',
                pattern: {
                  // Unicode letters + spaces only (no numbers)
                  value: /^\p{L}+(?:\s\p{L}+)*$/u,
                  message: 'O nome só pode conter letras e espaços',
                },
              })}
              className="input input-bordered w-full max-w-sm bg-white border-black text-black"
              placeholder="Digite seu nome completo"
            />
            {errors.name?.message && (
              <div className="text-error">{errors.name.message}</div>
            )}
          </div>

          <div className="my-2">
            <label className="label text-black" htmlFor="email">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              {...register('email', {
                required: 'O e-mail é obrigatório',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'O e-mail é inválido',
                },
              })}
              className="input input-bordered w-full max-w-sm bg-white border-black text-black"
              placeholder="Digite seu e-mail"
            />
            {errors.email?.message && (
              <div className="text-error">{errors.email.message}</div>
            )}
          </div>

          <div className="my-2">
            <label className="label text-black" htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'A senha é obrigatória' })}
              className="input input-bordered w-full max-w-sm bg-white border-black text-black"
              placeholder="Digite sua senha"
            />
            {errors.password?.message && (
              <div className="text-error">{errors.password.message}</div>
            )}
          </div>

          <div className="my-2">
            <label className="label text-black" htmlFor="confirmPassword">
              Confirmar senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'A confirmação de senha é obrigatória',
              })}
              className="input input-bordered w-full max-w-sm bg-white border-black text-black"
              placeholder="Confirme sua senha"
            />
            {errors.confirmPassword?.message && (
              <div className="text-error">{errors.confirmPassword.message}</div>
            )}
          </div>

          <div className="my-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full bg-orangeDefault border-2 border-orangeDefault hover:bg-orangeHover hover:cursor-pointer py-5"
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Criar sua conta
            </button>
          </div>
        </form>

        <div className="flex justify-center">
          <span className="text-black">
            Já possui uma conta?{' '}
            <Link
              href={`/signin?callbackUrl=${callbackUrl}`}
              className="link text-orangeDefault font-semibold hover:text-orangeHover"
            >
              Entrar
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Form
