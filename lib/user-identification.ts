// User identification utilities

export function getUserIdentifier(): string {
  // Generate a simple user identifier based on browser fingerprint
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillText("User fingerprint", 2, 2)
  }

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
  ].join("|")

  // Simple hash function
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36)
}

export function getPersistentUserId(): string {
  // Try to get from localStorage first
  if (typeof window !== "undefined") {
    let userId = localStorage.getItem("user_id")
    if (!userId) {
      userId = getUserIdentifier()
      localStorage.setItem("user_id", userId)
    }
    return userId
  }

  return getUserIdentifier()
}
