"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface SimpleUser {
  id: string
  email: string
  name: string
  isAdmin: boolean
}

interface AuthContextType {
  user: SimpleUser | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USER_PASSWORD = "demo123"
const ADMIN_PASSWORD = "admin123"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SimpleUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("auth_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      let isAdmin = false
      let isValidPassword = false

      if (password === ADMIN_PASSWORD) {
        isAdmin = true
        isValidPassword = true
      } else if (password === USER_PASSWORD) {
        isAdmin = false
        isValidPassword = true
      }

      if (!isValidPassword) {
        return {
          success: false,
          error: "Invalid password. Use 'demo123' to access the tools.",
        }
      }

      const userSession = {
        id: isAdmin ? "admin" : "user",
        email: email,
        name: email.split("@")[0], // Use email prefix as name
        isAdmin: isAdmin,
      }

      setUser(userSession)
      localStorage.setItem("auth_user", JSON.stringify(userSession))

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Network error. Please try again." }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      let isAdmin = false
      let isValidPassword = false

      if (password === ADMIN_PASSWORD) {
        isAdmin = true
        isValidPassword = true
      } else if (password === USER_PASSWORD) {
        isAdmin = false
        isValidPassword = true
      }

      if (!isValidPassword) {
        return {
          success: false,
          error: "Invalid password. Use 'demo123' to access the tools.",
        }
      }

      const userSession = {
        id: isAdmin ? "admin" : "user",
        email: email,
        name: name,
        isAdmin: isAdmin,
      }

      setUser(userSession)
      localStorage.setItem("auth_user", JSON.stringify(userSession))

      return { success: true }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "Network error. Please try again." }
    }
  }

  const logout = async () => {
    try {
      setUser(null)
      localStorage.removeItem("auth_user")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
