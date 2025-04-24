// components/NavbarServer.tsx
import { getUserFromToken } from '@/hooks/useAuth'
import NavbarClient from './NavbarClient'

const NavbarServer = () => {
  const user = getUserFromToken()
  return <NavbarClient userEmail={user?.email || ''} />
}

export default NavbarServer
