// 'use client'
// import { useSession } from 'next-auth/react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useEffect } from 'react'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import toast from 'react-hot-toast'
// import Link from 'next/link'

// type Inputs = {
//   name: string
//   email: string
//   password: string
//   confirmPassword: string
// }

// const Form = () => {
//   const { data: session } = useSession()

//   const params = useSearchParams()
//   const router = useRouter()
//   let callbackUrl = params.get('callbackUrl') || '/'
//   const {
//     register,
//     handleSubmit,
//     getValues,
//     formState: { errors, isSubmitting },
//   } = useForm<Inputs>({
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//     },
//   })
//   useEffect(() => {
//     if (session && session.user) {
//       router.push(callbackUrl)
//     }
//   }, [callbackUrl, params, router, session])

//   const formSubmit: SubmitHandler<Inputs> = async (form) => {
//     const { name, email, password } = form

//     try {
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       })
//       if (res.ok) {
//         return router.push(
//           `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
//         )
//       } else {
//         const data = await res.json()
//         throw new Error(data.message)
//       }
//     } catch (err: any) {
//       const error =
//         err.message && err.message.indexOf('E11000') === 0
//           ? 'Email is duplicate'
//           : err.message
//       toast.error(error || 'error')
//     }
//   }
//   return (
//     <div className="max-w-sm  mx-auto card bg-base-300 my-4">
//       <div className="card-body">
//         <h1 className="card-title">Register</h1>
//         <form onSubmit={handleSubmit(formSubmit)}>
//           <div className="my-2">
//             <label className="label" htmlFor="name">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               {...register('name', {
//                 required: 'Name is required',
//               })}
//               className="input input-bordered w-full max-w-sm"
//             />
//             {errors.name?.message && (
//               <div className="text-error">{errors.name.message}</div>
//             )}
//           </div>
//           <div className="my-2">
//             <label className="label" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="text"
//               id="email"
//               {...register('email', {
//                 required: 'Email is required',
//                 pattern: {
//                   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
//                   message: 'Email is invalid',
//                 },
//               })}
//               className="input input-bordered w-full max-w-sm"
//             />
//             {errors.email?.message && (
//               <div className="text-error"> {errors.email.message}</div>
//             )}
//           </div>
//           <div className="my-2">
//             <label className="label" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               {...register('password', {
//                 required: 'Password is required',
//               })}
//               className="input input-bordered w-full max-w-sm"
//             />
//             {errors.password?.message && (
//               <div className="text-error">{errors.password.message}</div>
//             )}
//           </div>
//           <div className="my-2">
//             <label className="label" htmlFor="confirmPassword">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               {...register('confirmPassword', {
//                 required: 'Confirm Password is required',
//                 validate: (value) => {
//                   const { password } = getValues()
//                   return password === value || 'Passwords should match!'
//                 },
//               })}
//               className="input input-bordered w-full max-w-sm"
//             />
//             {errors.confirmPassword?.message && (
//               <div className="text-error">{errors.confirmPassword.message}</div>
//             )}
//           </div>
//           <div className="my-2">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="btn btn-primary w-full"
//             >
//               {isSubmitting && (
//                 <span className="loading loading-spinner"></span>
//               )}
//               Register
//             </button>
//           </div>
//         </form>

//         <div className="divider"> </div>
//         <div>
//           Already have an account?{' '}
//           <Link className="link" href={`/signin?callbackUrl=${callbackUrl}`}>
//             Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Form

'use client'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
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
  let callbackUrl = params.get('callbackUrl') || '/'
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session])

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    router.push(
      `/signin?callbackUrl=${callbackUrl}&success=Conta criada com sucesso!`
    )
  }

  return (
    <div className="max-w-sm mx-auto card bg-orangeWhite shadow-xl/20 py-8 my-12">
      <div className="card-body">
        <div className="flex align-center justify-center">
          <h1 className="card-title text-black text-3xl text-center">
            Criar conta
          </h1>
        </div>

        {params.get('error') && (
          <div className="alert text-error">{params.get('error')}</div>
        )}
        {params.get('success') && (
          <div className="alert text-success">{params.get('success')}</div>
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
              {...register('password', {
                required: 'A senha é obrigatória',
              })}
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

        <div className="flex align-center justify-center">
          <span className="text-black">
            Já possui uma conta?{' '}
            <Link
              className="link text-orangeDefault font-semibold hover:text-orangeHover"
              href={`/signin?callbackUrl=${callbackUrl}`}
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
