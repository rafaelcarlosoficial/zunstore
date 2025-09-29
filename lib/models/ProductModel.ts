export type Product = {
  _id?: string
  name: string
  slug: string
  image: string
  banner?: string
  price: number
  installments: number
  brand: string
  //Is category necessary here?
  category?: string
  rating: number
  numReviews: number
  countInStock: number
}
