import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export const metadata = {
  title: "Login - Admin Portal",
  description: "Login to access the admin dashboard",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to access your admin dashboard</p>
        </div>

        <LoginForm />

        <div className="text-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
