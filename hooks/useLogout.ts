// hooks/useLogout.ts
export const useLogout = () => {
  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    })
    window.location.href = '/sign-in'
  }

  return { logout }
}
