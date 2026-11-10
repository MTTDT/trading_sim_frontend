import axios from "axios"


export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
})


export function errorMessage(err) {
  const status = err?.response?.status
  if (status === 401) return "Invalid email or password."
  if (status === 409) return "That email is already registered."

  const msg = err?.response?.data?.error
  if (typeof msg === "string" && msg) return msg

  return "Something went wrong. Please try again."
}