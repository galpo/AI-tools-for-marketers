"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { useAuth } from "@/contexts/auth-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode)
  const { login, register } = useAuth()

  const handleLoginSuccess = async (email: string, password: string) => {
    const result = await login(email, password)
    if (result.success) {
      onClose()
    }
    return result
  }

  const handleRegisterSuccess = async (name: string, email: string, password: string) => {
    const result = await register(name, email, password)
    if (result.success) {
      onClose()
    }
    return result
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white border shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle>{mode === "login" ? "Sign In" : "Create Account"}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          {mode === "login" ? (
            <LoginForm onSuccess={handleLoginSuccess} onSwitchToRegister={() => setMode("register")} />
          ) : (
            <RegisterForm onSuccess={handleRegisterSuccess} onSwitchToLogin={() => setMode("login")} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
