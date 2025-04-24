import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async  function POST() {
    const coockieStore = await cookies()
    coockieStore.set("token", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(0),
    })
  return NextResponse.json({ message: "Logged out successfully" })
}
