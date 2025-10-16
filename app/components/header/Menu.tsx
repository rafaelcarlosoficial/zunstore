'use client'
import useCartService from '@/lib/hooks/useCartStore'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
const Menu = () => {
  const { items } = useCartService()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      <ul className="flex items-stretch gap-2">
        <li>
          <Link href="/cart">
            <Image
              src="/assets/Cart.png"
              alt="shopping cart"
              width={24}
              height={24}
            />
            {mounted && items.length != 0 && (
              <div
                className="badge -mt-[13px] bg-orangeDefault text-white border-0 rounded-full text-sm
"
              >
                {items.reduce((a, c) => a + c.qty, 0)}
              </div>
            )}
          </Link>
        </li>
        <li>
          <Image
            src="/assets/Avatar.png"
            alt="User Avatar"
            width={24}
            height={24}
          />
        </li>
      </ul>
    </div>
  )
}

export default Menu
