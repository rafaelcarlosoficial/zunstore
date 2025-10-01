import Image from 'next/image'
import Link from 'next/link'
import data from '@/lib/data'

export default async function ProductDetails({
  params,
}: {
  params: { slug: string }
}) {
  const product = data.products.find((x) => x.slug === params.slug)
  if (!product) {
    return <div>Product not found</div>
  }
  return (
    <>
      <div className="my-2">
        <Link href="/">
          <span className="text-black">back to products</span>
        </Link>
      </div>

      <div className="flex ">
        <div>
          <div>
            <div>
              <Image
                src={product.image}
                alt={product.name}
                width={580}
                height={580}
              />
            </div>
            <div>{/* imagens aqui */}</div>
          </div>
        </div>
        <div>
          <div>{/* stars here */}</div>
          <div>
            <h2 className="text-black font-semibold text-4xl">
              {product.name}
            </h2>
            <div className="flex gap-2">
              <Image
                src="/assets/house-Icon.svg"
                alt="house icon"
                width={25}
                height={25}
              />
              <p className="text-black text-xl">
                Vendido e entregue por{' '}
                <span className="font-semibold text-orangeDefault ">
                  ZunStore
                </span>
              </p>
            </div>
          </div>
          <div>
            <p className="text-black">
              <span className="font-semibold">${product.price}</span> em até{' '}
              <span className="font-semibold">
                {product.installments}X de{' '}
                {product.price / product.installments}
              </span>{' '}
              sem juros no cartão
            </p>
            <p className="text-black text-5xl font-semibold">
              R${product.price}
            </p>
            <p className="text-black">À vista com {}%desconto</p>
          </div>
          <div className="flex gap-4">
            <button className="text-black border-[2px] border-[#D9D9D9] rounded-4xl px-6 py-4 bg-transparent">
              <span> -</span> <span>1</span> <span>+</span>
            </button>
            <button className="text-white text-xl bg-orangeDefault px-35 py-4 rounded-4xl">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
