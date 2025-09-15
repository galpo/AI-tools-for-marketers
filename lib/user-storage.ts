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
]

// Use a global variable to persist users across requests in development
// In production, this would be a database
declare global {
  var __users: User[] | undefined
}

if (!global.__users) {
  global.__users = [...initialUsers]
}

export const users = global.__users

export function addUser(user: User): void {
  users.push(user)
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email)
}

export function findUserByCredentials(email: string, password: string): User | undefined {
  return users.find((u) => u.email === email && u.password === password)
}
