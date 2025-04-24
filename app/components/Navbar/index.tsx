import { getUserFromToken } from '@/app/hooks/useAuth'
import Link from 'next/link'

const Navbar = () => {
  const user = getUserFromToken()

  return (
    <nav className="flex items-center justify-between bg-white shadow px-6 py-4">
      <Link href="/" className="text-xl font-bold text-gray-800">
        MyApp
      </Link>
      <div className="flex items-center gap-4">
        {user?.email && <span className="text-gray-600">👋 {user.email}</span>}
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="rounded-md bg-red-500 px-4 py-2 text-white text-sm hover:bg-red-600"
          >
            خروج
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
