"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

interface AuthContextType {
  user: any | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(status === "loading")
  }, [status])

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        return { success: false, error: result.error }
      }

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Network error. Please try again." }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "Registration failed" }
      }

      // After successful registration, sign them in
      const loginResult = await login(email, password)
      return loginResult
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "Network error. Please try again." }
    }
  }

  const logout = async () => {
    try {
      await signOut({ redirect: false })
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
