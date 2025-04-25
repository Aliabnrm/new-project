import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'
import Logout from '../(auth)/logout'

const JWT_SECRET = process.env.JWT_SECRET as string

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  try {
    if (!token) throw new Error('No token')
    const user = jwt.verify(token, JWT_SECRET) as { email: string }
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">سلام {user.email} 👋</h1>
        <p>به داشبورد خوش اومدی</p>

        <Logout />
      </div>
    )
  } catch (err) {
    redirect('/sign-in')
  }
}
