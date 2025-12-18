// Simple authentication utilities
// In production, use a proper auth solution like NextAuth.js or Supabase Auth

export function isAuthenticated(): boolean {
  // Check if user is authenticated
  // This is a mock implementation
  if (typeof window === "undefined") return false
  return localStorage.getItem("isAuthenticated") === "true"
}

export function setAuthenticated(value: boolean): void {
  if (typeof window === "undefined") return
  if (value) {
    localStorage.setItem("isAuthenticated", "true")
  } else {
    localStorage.removeItem("isAuthenticated")
  }
}

export function logout(): void {
  setAuthenticated(false)
  window.location.href = "/login"
}
