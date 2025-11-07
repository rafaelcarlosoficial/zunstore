import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page') || 1)
  const limit = 4
  const skip = (page - 1) * limit

  try {
    await dbConnect()
    const products = await ProductModel.find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    return Response.json({ products })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
