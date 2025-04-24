"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Logout = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await fetch("/api/auth/logout", {method: 'POST' })
        router.push("/sign-in")
    }

  return (
    <div>
      <button
      onClick={handleLogout}
      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
    >
      Sign Out
    </button>
    </div>
  )
}

export default Logout
