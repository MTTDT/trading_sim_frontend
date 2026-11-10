import path from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({ mode }) => {
  // Load env vars for the current mode (development/production/etc.)
  // Third arg "" loads ALL vars (not just VITE_*)
  const env = loadEnv(mode, process.cwd(), "")

  const backendUrl = env.VITE_BACKEND_URL || "http://localhost:3001"

  return {
    plugins: [react(), tailwindcss()],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    server: {
      proxy: {
        // /api/auth/login -> http://localhost:3001/auth/login
        "/api": {
          target: backendUrl,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
      },
    },
  }
})