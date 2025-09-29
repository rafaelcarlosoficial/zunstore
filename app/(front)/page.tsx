import Productitem from '../components/products/Productitem'
import data from '@/lib/data'
export default function Home() {
  return (
    <>
      <h2 className="text-2xl py-2">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <Productitem key={product.slug} product={product} />
        ))}
      </div>
    </>
  )
}
