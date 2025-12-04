'use client'

import useCartService from '@/lib/hooks/useCartStore'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function CartDetails() {
  const router = useRouter()
  const { items, itemsPrice, decrease, increase, remove } = useCartService()

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
          O carrinho está vazio.{' '}
          <Link href="/">Adicione algum item ao carrinho</Link>
        </div>
      ) : (
        // If any shit happen set those values again: grid md:grid-cols-4 md:gap-5
        // <div className="flex flex-col lg:flex-row lg:items-center ">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-around">
          <div className="flex flex-col gap-3 ">
            {items.map((item) => (
              <div
                key={item.slug}
                className="flex flex-col xl:flex-row items-center justify-between gap-3 shadow-xl py-4 sm:flex-row pr-[1.875rem] pl-[0.625rem] md:scale-[0.84] md:origin-top rounded-[10px]"
              >
                <div className="flex flex-col items-center sm:flex-row">
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
                    <p className="text-black font-semibold text-base leading-[1.0625rem] items-center align-center justify-center sm:text-xl">
                      {item.name}
                    </p>

                    <span className="text-black leading-[1.0625rem] items-center align-center">
                      Vendido por ZunStore
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center align-center sm:flex-row-reverse ">
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
                  className="cursor-pointer"
                  onClick={() => remove(item)}
                />

                {/* trash icon */}
              </div>
            ))}
          </div>

          <div className="bg-white shadow-xl flex flex-col items-center justify-center my-6 mx-6 py-8 md:min-w-[503px]">
            <div className="h-[2px] bg-[#ADADAD] w-[90%] my-5"></div>

            <ul className="flex flex-col items-center justify-between gap-2 text-black w-full md:pt-[1.25rem] md:pb-[1.25rem]">
              <li className="flex justify-around items-center gap-2 w-full">
                <span>SubTotal</span>
                <span>R$ 1917,99</span>
              </li>

              <li className="flex justify-around items-center gap-2 w-full">
                <span>Descontos</span>
                <span>R$ 174,80</span>
              </li>

              <li className="flex justify-around items-center gap-2 w-full">
                <span
                  className="md:text-2xl font-semibold text-lg
"
                >
                  Total
                </span>
                <span
                  className="md:text-2xl font-semibold text-1xl
"
                >
                  R$ 1743,19
                </span>
              </li>

              <li>
                <Link href="/shipping">
                  <button className="text-white text-xl hover:cursor-pointer bg-orangeDefault px-12 py-2 rounded-4xl sm:w-full md:w-full md:py-[10px] md:px-[9rem] hover:bg-orangeHover">
                    Continuar
                  </button>
                </Link>
              </li>
              <Link href="/">
                <li className="text-sm text-black underline hover:text-orangeDefault hover:cursor-pointer">
                  Adicionar mais produtos
                </li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
