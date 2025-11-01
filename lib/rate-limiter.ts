const requests = new Map<string, number[]>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30 // 30 requests per minute

export function checkRateLimit(clientId: string): boolean {
  const now = Date.now()
  const clientRequests = requests.get(clientId) || []

  // Remove old requests outside the window
  const recentRequests = clientRequests.filter((time) => now - time < RATE_LIMIT_WINDOW)

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  recentRequests.push(now)
  requests.set(clientId, recentRequests)

  return true
}

export function getRemainingRequests(clientId: string): number {
  const now = Date.now()
  const clientRequests = requests.get(clientId) || []
  const recentRequests = clientRequests.filter((time) => now - time < RATE_LIMIT_WINDOW)
  return Math.max(0, RATE_LIMIT_MAX_REQUESTS - recentRequests.length)
}
