import { Header } from "@/components/header"
import { AuthForm } from "@/components/auth-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
            <h1 className="text-3xl font-bold text-white mb-2 text-center">Sign In</h1>
            <p className="text-gray-400 text-center mb-6">Welcome back to StreamBox</p>

            <AuthForm type="login" />

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-red-500 hover:text-red-400">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
