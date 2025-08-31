// Frontend-only utilities - sin conexión a base de datos

// Rate limiting storage (in-memory for demo)
const rateLimitStore: Record<string, { count: number; resetTime: number }> = {}

// Simple rate limiting function (solo para demo)
export function isRateLimited(key: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitStore[key]

  if (!record || now > record.resetTime) {
    rateLimitStore[key] = { count: 1, resetTime: now + windowMs }
    return false
  }

  if (record.count >= maxRequests) {
    return true
  }

  record.count++
  return false
}

// Generate a unique ID
export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Format error response
export function formatErrorResponse(message: string, status: number, details?: string) {
  return {
    error: message,
    status,
    details,
    timestamp: new Date().toISOString(),
  }
}

// Mock database connection test
export async function testDatabaseConnection(): Promise<boolean> {
  console.log("Mock: Database connection test - always returns true")
  return true
}

// Mock table initialization
export async function initializeBasicTables() {
  console.log("Mock: Basic tables initialized (no real database)")
  return true
}
