import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { SocialButtons } from "./social-buttons"

const COPY = {
  login: {
    title: "Welcome back",
    description: "Sign in to your account to continue.",
    switchText: "Don't have an account?",
    switchLabel: "Sign up",
  },
  register: {
    title: "Create an account",
    description: "Enter your details to get started.",
    switchText: "Already have an account?",
    switchLabel: "Sign in",
  },
}

// initialMode: "login" | "register"
export function AuthPage({ initialMode = "login", onLogin, onRegister }) {
  const [mode, setMode] = React.useState(initialMode)
  const copy = COPY[mode]

  return (
    <main className="flex min-h-svh items-center justify-center bg-background p-4 font-mono">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{copy.title}</CardTitle>
          <CardDescription>{copy.description}</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-5">
          <SocialButtons />

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or continue with email
            <span className="h-px flex-1 bg-border" />
          </div>

          {mode === "login" ? (
            <LoginForm onSubmit={onLogin} />
          ) : (
            <RegisterForm onSubmit={onRegister} />
          )}
        </CardContent>

        <CardFooter className="justify-center gap-1 text-sm text-muted-foreground">
          {copy.switchText}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {copy.switchLabel}
          </button>
        </CardFooter>
      </Card>
    </main>
  )
}