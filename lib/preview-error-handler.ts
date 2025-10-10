/**
 * Utility to handle errors specific to v0 preview environments
 */

// Check if we're in a v0 preview environment
export function isV0PreviewEnvironment(): boolean {
  if (typeof window === "undefined") return false

  return window.location.hostname.includes("vusercontent.net") || window.location.hostname.includes("v0.dev")
}

// Clear problematic cache entries that might cause errors
export async function clearV0PreviewCache(): Promise<boolean> {
  try {
    if (typeof window === "undefined") return false

    // List of cache keys that might cause issues
    const problematicCacheKeys = ["_next/data", "next-data", "webpack", "workbox", "v0-cache"]

    // Clear matching cache entries
    if ("caches" in window) {
      const cacheKeys = await caches.keys()

      for (const key of cacheKeys) {
        if (problematicCacheKeys.some((badKey) => key.includes(badKey))) {
          await caches.delete(key)
          console.log(`Cleared potentially problematic cache: ${key}`)
        }
      }
    }

    // Clear problematic localStorage entries
    const localStorageKeysToPreserve = ["chatTuentiUserId", "chatTuentiConversations", "chatTuentiMessages"]

    // Backup essential data
    const preservedData: Record<string, string> = {}
    localStorageKeysToPreserve.forEach((key) => {
      const value = localStorage.getItem(key)
      if (value) preservedData[key] = value
    })

    // Clear localStorage entries that might be causing issues
    Object.keys(localStorage).forEach((key) => {
      if (
        key.includes("next-") ||
        key.includes("_next") ||
        key.includes("webpack") ||
        (key.startsWith("v0-") && !localStorageKeysToPreserve.includes(key))
      ) {
        localStorage.removeItem(key)
        console.log(`Cleared potentially problematic localStorage key: ${key}`)
      }
    })

    // Restore preserved data
    Object.entries(preservedData).forEach(([key, value]) => {
      localStorage.setItem(key, value)
    })

    return true
  } catch (error) {
    console.error("Error clearing v0 preview cache:", error)
    return false
  }
}

// Check if the error is related to database connection
export function isDatabaseConnectionError(error: Error | string): boolean {
  const errorMessage = typeof error === "string" ? error : error.message

  return (
    errorMessage.includes("database") ||
    errorMessage.includes("connection") ||
    errorMessage.includes("sql") ||
    errorMessage.includes("neon") ||
    errorMessage.includes("postgres")
  )
}

// Handle database connection errors in preview environments
export async function handleDatabaseConnectionError(): Promise<void> {
  if (!isV0PreviewEnvironment()) return

  // In preview environments, we'll use in-memory storage as fallback
  console.log("Database connection issue detected in preview environment. Using in-memory fallback.")

  // Set a flag to indicate we should use in-memory storage
  localStorage.setItem("v0_preview_use_memory_storage", "true")
}

// Auto-recovery function to be called on application load
export async function attemptV0PreviewRecovery(): Promise<void> {
  if (!isV0PreviewEnvironment()) return

  // Check for error indicators in URL or localStorage
  const hasErrorParam = new URLSearchParams(window.location.search).has("recovery")
  const hadPreviousError = localStorage.getItem("v0_preview_had_error") === "true"
  const hasDatabaseError = localStorage.getItem("v0_preview_database_error") === "true"

  if (hasErrorParam || hadPreviousError || hasDatabaseError) {
    console.log("Attempting v0 preview recovery...")
    await clearV0PreviewCache()

    // Clear error indicators
    localStorage.removeItem("v0_preview_had_error")
    localStorage.removeItem("v0_preview_database_error")

    // If there was a database error, set the flag to use in-memory storage
    if (hasDatabaseError) {
      localStorage.setItem("v0_preview_use_memory_storage", "true")
    }

    // Reload without the recovery parameter if it exists
    if (hasErrorParam) {
      const url = new URL(window.location.href)
      url.searchParams.delete("recovery")
      window.location.href = url.toString()
    }
  }

  // Set up error detection
  window.addEventListener("error", (event) => {
    localStorage.setItem("v0_preview_had_error", "true")

    // Check if it's a database error
    if (isDatabaseConnectionError(event.error)) {
      localStorage.setItem("v0_preview_database_error", "true")
      handleDatabaseConnectionError()
    }
  })

  window.addEventListener("unhandledrejection", (event) => {
    localStorage.setItem("v0_preview_had_error", "true")

    // Check if it's a database error
    if (isDatabaseConnectionError(event.reason)) {
      localStorage.setItem("v0_preview_database_error", "true")
      handleDatabaseConnectionError()
    }
  })
}
