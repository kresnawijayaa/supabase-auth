'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { LogIn, Mail, Lock, Loader2, ArrowRight } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            window.location.href = '/dashboard'
        }
    }

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-black">
            {/* Left side - Branded Context */}
            <div className="hidden lg:flex flex-col justify-between p-20 relative bg-[#050505] border-r border-[#111]">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                            <Lock className="text-black w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tighter uppercase">Supabase.Core</span>
                    </div>

                    <h2 className="heading-premium max-w-lg mb-8">
                        The next level of <br />
                        <span className="text-neutral-500">Authentication.</span>
                    </h2>
                    <p className="text-neutral-500 mt-6 text-xl max-w-md leading-relaxed font-light">
                        High-performance, secure, and minimalist. Professional-grade authentication for scalable enterprise applications.
                    </p>
                </div>

                <div className="relative z-10 border-t border-[#111] pt-10">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <p className="text-xs text-neutral-600 font-mono tracking-widest uppercase">System Operational // v2.4.0</p>
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    <div className="mb-12">
                        <h1 className="text-2xl font-bold tracking-tight mb-2">Login</h1>
                        <p className="text-neutral-500 text-sm font-light">Access your workspace using your secure credentials.</p>
                    </div>

                    {error && <div className="status-error mb-8">{error}</div>}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest ml-1">Account Provider</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field"
                                    placeholder="email@enterprise.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Secret Key</label>
                                <Link href="/reset-password" id="forgot-password-link" className="text-[10px] text-neutral-500 hover:text-white font-bold transition-colors uppercase tracking-widest">
                                    Recovery?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary">
                            <div className="flex items-center justify-center gap-2">
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>CONTINUE TO DASHBOARD</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    <div className="relative my-10 flex items-center">
                        <div className="flex-1 border-t border-neutral-900" />
                        <span className="px-4 text-[10px] font-bold text-neutral-800 tracking-tighter">OAUTH 2.0</span>
                        <div className="flex-1 border-t border-neutral-900" />
                    </div>

                    <button onClick={handleGoogleLogin} className="btn-outline">
                        <div className="flex items-center justify-center gap-3">
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4 grayscale opacity-70 group-hover:opacity-100 transition-all" />
                            <span className="text-xs uppercase tracking-widest">Sign in with Google</span>
                        </div>
                    </button>

                    <p className="mt-12 text-center text-[10px] font-bold text-neutral-700 tracking-widest uppercase">
                        New user? <Link href="/signup" id="signup-link" className="text-white hover:underline underline-offset-4">Create account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
