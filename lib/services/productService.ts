import { cache } from 'react'
import dbConnect from '../dbConnect'
import ProductModel, { Product } from '@/lib/models/ProductModel'

export const revalidate = 3600

const getLatest = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({}).sort({ _id: -1 }).limit(9).lean()
  return products as Product[]
})

const getProductsBatch = async (skip = 0) => {
  await dbConnect()
  const products = await ProductModel.find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(4)
    .lean()
  return products as Product[]
}

const getFeatured = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({ isFeatured: true }).limit(3).lean()
  // console.log('olho os produtos aqui', products)
  return products
})

const getBySlug = cache(async (slug: string) => {
  await dbConnect()
  const product = await ProductModel.findOne({ slug }).lean()
  return product as Product
})

const productService = {
  getLatest,
  getFeatured,
  getBySlug,
  getProductsBatch,
}

export default productService
