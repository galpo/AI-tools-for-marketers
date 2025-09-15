// Shared user storage for authentication
// In production, this would be replaced with a real database

export interface User {
  id: string
  email: string
  password: string
  name: string
  createdAt: string
}

// Initialize with demo users and allow runtime additions
const initialUsers: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "admin@aitools.com",
    password: "admin123",
    name: "Admin User",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    email: "riteerouf@gmail.com",
    password: "password123", // Using default password since original was lost
    name: "Registered User",
    createdAt: new Date().toISOString(),
  },
]

// Simple in-memory storage (resets on server restart)
const users: User[] = [...initialUsers]

export function addUser(user: User): void {
  users.push(user)
  console.log("[v0] User added. Total users:", users.length)
}

export function findUserByEmail(email: string): User | undefined {
  const user = users.find((u) => u.email === email)
  console.log("[v0] Finding user by email:", email, "Found:", !!user)
  return user
}

export function findUserByCredentials(email: string, password: string): User | undefined {
  const user = users.find((u) => u.email === email && u.password === password)
  console.log("[v0] Finding user by credentials:", email, "Found:", !!user)
  console.log(
    "[v0] Available users:",
    users.map((u) => u.email),
  )
  return user
}

export function getAllUsers(): User[] {
  return users
}
