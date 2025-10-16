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

          <Menu />
        </div>
      </nav>
    </header>
  )
}

export default Header
