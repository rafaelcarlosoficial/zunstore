import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'

export const POST = async (request: NextRequest) => {
  const { name, email, password, confirmPassword } = await request.json()
  await dbConnect()

  // Basic server-side validation
  if (!name || !email || !password) {
    return Response.json(
      { message: 'Missing required fields' },
      { status: 400 }
    )
  }

  if (typeof password !== 'string' || password.length < 6) {
    return Response.json(
      { message: 'Password must be at least 6 characters' },
      { status: 400 }
    )
  }

  // If client sends confirmPassword, ensure it matches
  if (confirmPassword !== undefined && password !== confirmPassword) {
    return Response.json({ message: 'Passwords do not match' }, { status: 400 })
  }

  // prevent duplicate users
  const existing = await UserModel.findOne({ email })
  if (existing) {
    return Response.json({ message: 'Email already in use' }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(password, 5)
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
    return Response.json(
      { message: 'User has been created successfully' },
      { status: 201 }
    )
  } catch (err: any) {
    return Response.json(
      {
        message: err.message,
      },
      {
        status: 500,
      }
    )
  }
}
