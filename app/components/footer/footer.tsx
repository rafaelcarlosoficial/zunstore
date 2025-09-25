import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer>
      <div>
        <Link href="/">
          <Image
            src="/assets/pay-method/applePay.svg"
            alt="Zunstore Logo"
            width={100}
            height={24}
          />
        </Link>
        <Link href="/">
          <Image
            src="/assets/pay-method/googlePay.svg"
            alt="Zunstore Logo"
            width={100}
            height={24}
          />
        </Link>
        <Link href="/">
          <Image
            src="/assets/pay-method/Mastercard.svg"
            alt="Zunstore Logo"
            width={100}
            height={24}
          />
        </Link>
        <Link href="/">
          <Image
            src="/assets/pay-method/visa.svg"
            alt="Zunstore Logo"
            width={100}
            height={24}
          />
        </Link>
      </div>
      <Link href="/">
        <Image
          src={'/assets/WhiteZunStore.svg'}
          alt="Zunstore Logo"
          width={357}
          height={104}
        />
      </Link>
      <p>
        Zunstore, onde tecnologia e estilo se encontram. Conecte-se ao novo som
        da sua vida
      </p>
      <div>
        <ul>
          <li>
            <Link href="/">
              <Image
                src="assets/Social Media/Twitter.svg"
                alt="Twitter"
                width={60}
                height={60}
              />
            </Link>
          </li>
          <li>
            <Link href="/">
              <Image
                src="assets/Social Media/Facebook.svg"
                alt="Facebook"
                width={60}
                height={60}
              />
            </Link>
          </li>
          <li>
            <Link href="/">
              <Image
                src="assets/Social Media/Instagram.svg"
                alt="Instagram"
                width={60}
                height={60}
              />
            </Link>
          </li>
          <li>
            <Link href="/">
              <Image
                src="assets/Social Media/github.svg"
                alt="GitHub"
                width={60}
                height={60}
              />
            </Link>
          </li>
        </ul>
      </div>
      <p>© 2025 Zunstore. Todos os direitos reservados.</p>
    </footer>
  )
}

export default Footer
