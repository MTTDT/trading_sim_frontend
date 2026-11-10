import path from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({ mode }) => {

  const envDir = path.resolve(__dirname, "..") 
  const env = loadEnv(mode, envDir, "")
  const backendUrl = env.VITE_BACKEND_URL || "http://localhost:3001"

  return {
    plugins: [react(), tailwindcss()],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    server: {
      allowedHosts: [".trycloudflare.com"],
      proxy: {
        // /api/auth/login -> http://localhost:3001/auth/login
        "/api": {
          target: backendUrl,
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
      },
    },
  }
})