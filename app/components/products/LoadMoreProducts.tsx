'use client'
import { useState } from 'react'
import { Product } from '@/lib/models/ProductModel'
import Productitem from './Productitem'

type LoadMoreProductsProps = {
  initialProducts: Product[]
}

export default function LoadMoreProducts({
  initialProducts,
}: LoadMoreProductsProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const res = await fetch(`/api/products/load?page=${page + 1}`)
      const data = await res.json()

      if (!data.products.length) {
        setHasMore(false)
      } else {
        setProducts((prev) => [...prev, ...data.products])
        setPage((prev) => prev + 1)
      }
    } catch (error) {
      console.error('Failed to load more products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Productitem key={product._id ?? product.slug} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="btn btn-outline btn-primary"
          >
            {loading ? 'Loading...' : 'Load More Products'}
          </button>
        </div>
      )}
    </div>
  )
}
