"use client"
import { useCallback } from "react"

export function useLogout() {
  const logout = useCallback(async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    })

    if (res.ok) {
      window.location.href = "/sign-in"
    } else {
      const error = await res.json()
      alert(error.error || "خطا در خروج از حساب")
    }
  }, [])

  return logout
}
