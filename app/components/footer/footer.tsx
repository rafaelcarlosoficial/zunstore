import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="flex gap-[30px] flex-col items-center justify-center bg-lightBlack text-white py-10 px-5">
      <div className="flex">
        <Link href="/">
          <Image
            src="/assets/pay-method/applePay.svg"
            alt="Apple Pay"
            width={49}
            height={28}
          />
        </Link>
        <Link href="/">
          <Image
            src="/assets/pay-method/googlePay.svg"
            alt="Google Pay"
            width={49}
            height={28}
          />
        </Link>
        <Link href="/">
          <Image
            src="/assets/pay-method/Mastercard.svg"
            alt="Mastercard"
            width={49}
            height={28}
          />
        </Link>
        <Link href="/">
          <Image
            src="/assets/pay-method/visa.svg"
            alt="Visa"
            width={49}
            height={28}
          />
        </Link>
        <Link href="/">
          <Image
            src="/assets/pay-method/Paypal.svg"
            alt="PayPal"
            width={49}
            height={28}
          />
        </Link>
      </div>

      <Link href="/">
        <Image
          src={'/assets/WhiteZunStore.svg'}
          alt="Zunstore Logo"
          width={250}
          height={73}
        />
      </Link>
      <p className="items-center text-center leading-[25px]">
        <strong className="opacity-100 text-orangeDefault">Zunstore </strong>
        <span className="opacity-70">
          onde tecnologia e estilo se <br /> encontram. Conecte-se ao novo som
          da <br /> sua vida
        </span>
      </p>
      <div>
        <ul className="flex gap-[25px]">
          <li>
            <Link href="/">
              <Image
                src="assets/Social Media/Twitter.svg"
                alt="Twitter"
                width={48}
                height={48}
              />
            </Link>
          </li>
          <li>
            <Link href="/">
              <Image
                src="assets/Social Media/Facebook.svg"
                alt="Facebook"
                width={48}
                height={48}
              />
            </Link>
          </li>
          <li>
            <Link href="/">
              <Image
                src="assets/Social Media/Instagram.svg"
                alt="Instagram"
                width={48}
                height={48}
              />
            </Link>
          </li>
          <li>
            <Link href="/">
              <Image
                src="assets/Social Media/github.svg"
                alt="GitHub"
                width={48}
                height={48}
              />
            </Link>
          </li>
        </ul>
      </div>
      <p className="text-xs text-center">
        © 2025 Zunstore. Todos os direitos reservados.
      </p>
    </footer>
  )
}

export default Footer
