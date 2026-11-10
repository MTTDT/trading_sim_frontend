import * as React from "react"

import { api } from "@/lib/api"

const AuthContext = React.createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  // On page load, ask the backend whether the session cookie is still valid.
  React.useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  // login/register throw on failure so the forms can show the error.
  const login = React.useCallback(async (values) => {
    const res = await api.post("/auth/login", values)
    setUser(res.data)
  }, [])

  const register = React.useCallback(async (values) => {
    const res = await api.post("/auth/register", values)
    setUser(res.data)
  }, [])

  const logout = React.useCallback(async () => {
    await api.post("/auth/logout")
    setUser(null)
  }, [])

  const value = React.useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}