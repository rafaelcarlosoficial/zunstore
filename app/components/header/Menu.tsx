'use client'

import useCartService from '@/lib/hooks/useCartStore'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

const Menu = () => {
  const { items, init } = useCartService()
  const [mounted, setMounted] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  const signoutHandler = () => {
    signOut({ callbackUrl: '/signin' })
    init()
  }

  return (
    <div>
      <ul className="flex items-stretch gap-2">
        <li className="relative">
          <Link href="/cart">
            <Image
              src="/assets/Cart.png"
              alt="shopping cart"
              width={24}
              height={24}
            />
            {mounted && items.length !== 0 && (
              <div className="badge absolute -top-2 -right-2 bg-orangeDefault text-white border-0 rounded-full text-sm">
                {items.reduce((a, c) => a + c.qty, 0)}
              </div>
            )}
          </Link>
        </li>

        {session && session.user ? (
          <li>
            <div className="dropdown dropdown-bottom dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost rounded-btn flex items-center gap-1"
              >
                {session.user.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52"
              >
                <li>
                  <Link href="/order-history">Order history</Link>
                </li>
                <li>
                  <button type="button" onClick={signoutHandler}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <li>
            <Image
              src="/assets/Avatar.png"
              alt="User Avatar"
              width={24}
              height={24}
              onClick={() => signIn()}
              className="cursor-pointer"
            />
          </li>
        )}
      </ul>
    </div>
  )
}

export default Menu
