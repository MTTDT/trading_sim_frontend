import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { errorMessage } from "@/lib/api"
import { FormField } from "./form-field"
import { PasswordInput } from "./password-input"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD = 8

export function RegisterForm({ onSubmit }) {
  const [errors, setErrors] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      password: String(data.get("password") ?? ""),
    }
    const confirm = String(data.get("confirm") ?? "")

    const next = {}
    if (!values.name) next.name = "Name is required."
    if (!EMAIL_RE.test(values.email)) next.email = "Enter a valid email address."
    if (values.password.length < MIN_PASSWORD)
      next.password = `Use at least ${MIN_PASSWORD} characters.`
    if (confirm !== values.password) next.confirm = "Passwords do not match."
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
      <FormField id="register-name" label="Name" error={errors.name}>
        <Input
          id="register-name"
          name="name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "register-name-error" : undefined}
        />
      </FormField>

      <FormField id="register-email" label="Email" error={errors.email}>
        <Input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "register-email-error" : undefined}
        />
      </FormField>

      <FormField id="register-password" label="Password" error={errors.password}>
        <PasswordInput
          id="register-password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          aria-invalid={!!errors.password}
          aria-describedby={
            errors.password ? "register-password-error" : undefined
          }
        />
      </FormField>

      <FormField id="register-confirm" label="Confirm password" error={errors.confirm}>
        <PasswordInput
          id="register-confirm"
          name="confirm"
          autoComplete="new-password"
          placeholder="Repeat password"
          aria-invalid={!!errors.confirm}
          aria-describedby={errors.confirm ? "register-confirm-error" : undefined}
        />
      </FormField>

      {errors.form ? (
        <p role="alert" className="text-sm text-destructive">
          {errors.form}
        </p>
      ) : null}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  )
}