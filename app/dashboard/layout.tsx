import NavbarServer from '@/components/Navbar/NavbarServer'
import { getUserFromToken } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardLayout = async ({ children }: {children: React.ReactNode}) => {
    const user = await getUserFromToken()

    if(!user) {
      console.log('No user found, redirecting...')
        redirect('/sign-in')

      }
      console.log('User:', user)
  return (
    <>
      <NavbarServer userEmail={user.email} />
      <main className="p-4">{children}</main>
    </>
  )
}

export default DashboardLayout
