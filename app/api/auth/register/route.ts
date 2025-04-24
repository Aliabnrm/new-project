import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()
const JWT_SECRET = 'your_secret_key'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    })

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '1h',
    })

    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 3600,
    })

    return NextResponse.json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('REGISTER ERROR:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
