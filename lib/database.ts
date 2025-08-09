import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export interface User {
  id: string
  email: string
  name: string
  password: string
  createdAt: string
  lastLogin?: string
}

const DB_FILE = path.join(process.cwd(), 'data', 'users.json')

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(DB_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Hash password
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

// Generate user ID
function generateUserId(): string {
  return crypto.randomUUID()
}

// Read users from file
function readUsers(): User[] {
  ensureDataDir()
  
  if (!fs.existsSync(DB_FILE)) {
    return []
  }
  
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users file:', error)
    return []
  }
}

// Write users to file
function writeUsers(users: User[]): void {
  ensureDataDir()
  
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error writing users file:', error)
    throw new Error('Failed to save user data')
  }
}

// Create new user
export function createUser(email: string, name: string, password: string): User {
  const users = readUsers()
  
  // Check if user already exists
  if (users.find(user => user.email === email)) {
    throw new Error('Пользователь с таким email уже существует')
  }
  
  const newUser: User = {
    id: generateUserId(),
    email: email.toLowerCase(),
    name,
    password: hashPassword(password),
    createdAt: new Date().toISOString()
  }
  
  users.push(newUser)
  writeUsers(users)
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser
  return userWithoutPassword as User
}

// Find user by email
export function findUserByEmail(email: string): User | null {
  const users = readUsers()
  return users.find(user => user.email === email.toLowerCase()) || null
}

// Find user by ID
export function findUserById(id: string): User | null {
  const users = readUsers()
  const user = users.find(user => user.id === id)
  if (user) {
    // Return user without password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword as User
  }
  return null
}

// Verify user credentials
export function verifyUser(email: string, password: string): User | null {
  const user = findUserByEmail(email)
  
  if (!user) {
    return null
  }
  
  const hashedPassword = hashPassword(password)
  if (user.password === hashedPassword) {
    // Update last login
    updateUserLastLogin(user.id)
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword as User
  }
  
  return null
}

// Update user last login
function updateUserLastLogin(userId: string): void {
  const users = readUsers()
  const userIndex = users.findIndex(user => user.id === userId)
  
  if (userIndex !== -1) {
    users[userIndex].lastLogin = new Date().toISOString()
    writeUsers(users)
  }
}

// Get all users (admin function)
export function getAllUsers(): Omit<User, 'password'>[] {
  const users = readUsers()
  return users.map(({ password, ...user }) => user)
}

// Get user stats
export function getUserStats(userId: string) {
  const users = readUsers()
  const user = users.find(u => u.id === userId)
  
  if (!user) {
    return null
  }
  
  return {
    memberSince: user.createdAt,
    lastLogin: user.lastLogin,
    totalUsers: users.length,
    userRank: users.findIndex(u => u.id === userId) + 1
  }
}
