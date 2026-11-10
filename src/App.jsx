import NavBar from './components/nav-bar'
import { AuthPage } from './components/auth/auth-page'
import { Button } from '@/components/ui/button'
import { AuthProvider, useAuth } from '@/lib/auth'

function Content() {
  const { user, loading, login, register, logout } = useAuth()

  // Wait for /auth/me before deciding what to show, to avoid a login-form flash.
  if (loading) return null

  if (!user) {
    return <AuthPage onLogin={login} onRegister={register} />
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 font-mono">
      <p>Signed in as {user.name} ({user.email})</p>
      <Button variant="outline" onClick={logout}>
        Log out
      </Button>
    </main>
  )
}

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Content />
    </AuthProvider>
  )
}

export default App