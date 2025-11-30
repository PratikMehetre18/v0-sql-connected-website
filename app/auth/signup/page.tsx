import { Header } from "@/components/header"
import { AuthForm } from "@/components/auth-form"
import Link from "next/link"

export default function SignupPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
            <h1 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h1>
            <p className="text-gray-400 text-center mb-6">Join StreamBox today</p>

            <AuthForm type="signup" />

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-red-500 hover:text-red-400">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
