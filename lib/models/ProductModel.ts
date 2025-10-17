import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },
    discount: { type: Number, required: true, default: 0 },
    banner: { type: String },
    price: { type: Number, required: true },
    installments: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String }, // optional
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
)

// Prevents model overwrite error during hot reloads
const ProductModel =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default ProductModel

export type Product = {
  _id?: string
  name: string
  slug: string
  image: string
  image2: string
  image3: string
  image4: string
  discount: number
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
