// 'use client'
// import { useState } from 'react'
// import { Product } from '@/lib/models/ProductModel'
// import Productitem from './Productitem'

// type LoadMoreProductsProps = {
//   initialProducts: Product[]
// }
// export default function LoadMoreProducts({
//   initialProducts,
// }: LoadMoreProductsProps) {
//   const [products, setProducts] = useState(initialProducts)
//   const [page, setPage] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [hasMore, setHasMore] = useState(true)

//   const loadMore = async () => {
//     setLoading(true)
//     try {
//       const res = await fetch(`/api/products?page=${page + 1}`)
//       const data = await res.json()

//       if (data.products.length === 0) {
//         setHasMore(false)
//       } else {
//         setProducts([...products, ...data.products])
//         setPage(page + 1)
//       }

//       return Response.json(
//         { message: 'Products loaded' },
//         {
//           status: 200,
//         }
//       )
//     } catch (error: any) {
//       return Response.json(
//         { error: error.message },
//         {
//           status: 500,
//         }
//       )
//     }
//   }
//   return (
//     <div>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 justify-center">
//         {initialProducts.map((product) => (
//           <Productitem key={product.slug} product={product} />
//         ))}
//       </div>

//       {hasMore && (
//         <div className="flex justify-center mt-4">
//           <button
//             onClick={loadMore}
//             disabled={loading}
//             className="btn btn-outline btn-primary"
//           >
//             {loading ? 'Loading...' : 'Load More Products'}
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }
