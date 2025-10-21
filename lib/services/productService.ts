// import { cache } from "react";
// import dbConnect from "../dbConnect";
// import ProductModel, { Product } from '@/lib/models/ProductModel'

// export const revalidate = 3600

// const getLatest = cache(async () => {
//     await dbConnect()
//     const products = await ProductModel.find({}).sort({_id: -1}).limit(4).lean()
//     return products as Product[]
// })

// const productService = {
//     getLatest,
// }

// export default productService
