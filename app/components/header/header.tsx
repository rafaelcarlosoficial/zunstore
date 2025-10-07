import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Menu from './Menu'
const Header = () => {
  return (
    <header className="bg-white shadow-xl/20">
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
          <Menu />
        </div>
      </nav>
    </header>
  )
}

export default Header
