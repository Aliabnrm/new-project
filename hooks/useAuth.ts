import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET_KEY as string

export async function getUserFromToken(): Promise<{ email: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string }
    return { email: decoded.email }
  } catch {
    return null
  }
}
