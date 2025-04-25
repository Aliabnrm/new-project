import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET!
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })

    const res = NextResponse.json({ message: 'Login successful' })
    res.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60,
      path: '/',
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
    })

    return res
  } catch (error) {
    console.error('LOGIN ERROR:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
