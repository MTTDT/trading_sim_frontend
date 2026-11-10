import { GithubLogoIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

// OAuth is a full-page redirect (not an axios call): the browser goes to GitHub,
// GitHub sends it back to the backend callback, and the backend redirects home.
export function SocialButtons() {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => {
        window.location.href = "/api/auth/github"
      }}
    >
      <GithubLogoIcon weight="bold" />
      Continue with GitHub
    </Button>
  )
}