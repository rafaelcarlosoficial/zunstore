import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="bg-white shadow-[0_16px_33px_rgba(0,0,0,0.25)]">
      <nav className="px-11">
        <div className="navbar flex justify-between">
          <Link href="/">
            <Image
              src="/assets/zunstoreBlack.svg"
              alt="Zunstore Logo"
              width={202}
              height={72}
            />
          </Link>
          <ul className="flex gap-[30px] justify-center items-center">
            <li>
              <Link href="/">
                <Image
                  src="/assets/Avatar.png"
                  alt="User Avatar"
                  width={24}
                  height={24}
                />
              </Link>
            </li>
            <li>
              <Link href="/">
                <Image
                  src="/assets/Cart.png"
                  alt="shopping cart"
                  width={24}
                  height={24}
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
