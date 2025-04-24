import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// rememmber me for add role based

const JWT_SECRET = process.env.JWT_SECRET_KEY as string

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  try {
    jwt.verify(token, JWT_SECRET)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*',],
}
