"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface SimpleUser {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: SimpleUser | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TEST_USERS = [
  { id: "1", email: "test@example.com", password: "password123", name: "Test User" },
  { id: "2", email: "demo@example.com", password: "demo123", name: "Demo User" },
  { id: "3", email: "admin@example.com", password: "admin123", name: "Admin User" },
]

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
      const testUser = TEST_USERS.find((u) => u.email === email && u.password === password)

      if (!testUser) {
        return { success: false, error: "Invalid email or password" }
      }

      const userSession = {
        id: testUser.id,
        email: testUser.email,
        name: testUser.name,
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
      // Check if user already exists
      const existingUser = TEST_USERS.find((u) => u.email === email)
      if (existingUser) {
        return { success: false, error: "User with this email already exists" }
      }

      // Create new user
      const newUser = {
        id: (TEST_USERS.length + 1).toString(),
        email,
        password,
        name,
      }

      TEST_USERS.push(newUser)

      const userSession = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
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
