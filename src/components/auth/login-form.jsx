import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { errorMessage } from "@/lib/api"
import { FormField } from "./form-field"
import { PasswordInput } from "./password-input"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginForm({ onSubmit }) {
  const [errors, setErrors] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const values = {
      email: String(data.get("email") ?? "").trim(),
      password: String(data.get("password") ?? ""),
    }

    const next = {}
    if (!EMAIL_RE.test(values.email)) next.email = "Enter a valid email address."
    if (!values.password) next.password = "Password is required."
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    try {
      await onSubmit?.(values)
    } catch (err) {
      setErrors({ form: errorMessage(err) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <FormField id="login-email" label="Email" error={errors.email}>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "login-email-error" : undefined}
        />
      </FormField>

      <FormField
        id="login-password"
        label="Password"
        error={errors.password}
        action={
          <a
            href="#"
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Forgot password?
          </a>
        }
      >
        <PasswordInput
          id="login-password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "login-password-error" : undefined}
        />
      </FormField>

      {errors.form ? (
        <p role="alert" className="text-sm text-destructive">
          {errors.form}
        </p>
      ) : null}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}