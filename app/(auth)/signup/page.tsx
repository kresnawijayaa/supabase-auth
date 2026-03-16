'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { UserPlus, Mail, Lock, Loader2, ArrowRight, ShieldCheck } from 'lucide-react'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const supabase = createClient()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side - Branded Context */}
            <div className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden bg-black/20">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                            <Lock className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">SupabaseCore</span>
                    </div>

                    <h2 className="heading-premium max-w-lg">
                        Build with <br />
                        <span className="text-pink-500">Confidence</span>.
                    </h2>
                    <p className="text-slate-400 mt-6 text-lg max-w-md leading-relaxed">
                        Enterprise-grade security meets world-class design. Join the next generation of professional applications.
                    </p>

                    <div className="mt-12 space-y-6">
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            </div>
                            <span>End-to-end encryption included</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                            </div>
                            <span>Multi-factor authentication ready</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-sm text-slate-600 font-medium italic">"The most beautiful auth implementation I've ever seen."</p>
                    <p className="text-xs text-slate-500 mt-2">— Lead Architect, TechNode</p>
                </div>

                {/* Decorative background for left side */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            {/* Right side - Signup Form */}
            <div className="flex items-center justify-center p-8 bg-black/10 backdrop-blur-sm border-l border-white/[0.05]">
                <div className="w-full max-w-md animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="mb-10 lg:hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                                <Lock className="text-white w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold tracking-tight">SupabaseCore</span>
                        </div>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-3xl font-bold mb-2 tracking-tight">Create your account</h1>
                        <p className="text-slate-500">Sign up and start building in minutes.</p>
                    </div>

                    {error && <div className="status-error mb-6">{error}</div>}
                    {success && <div className="status-success mb-6">Account created! Check your email for the link.</div>}

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400 ml-1">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-12"
                                    placeholder="name@company.com"
                                    required
                                    disabled={success}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-12"
                                    placeholder="Create a strong password"
                                    required
                                    minLength={6}
                                    disabled={success}
                                />
                            </div>
                            <p className="text-[10px] text-slate-600 ml-1">Min. 6 characters with special symbols recommended.</p>
                        </div>

                        <button type="submit" disabled={loading || success} className="btn-primary group">
                            <div className="flex items-center justify-center gap-2">
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>Create professional account</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    <p className="mt-10 text-center text-sm text-slate-500">
                        Already have an account? <Link href="/login" id="login-link" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline-offset-4 hover:underline">Sign in</Link>
                    </p>

                    <div className="mt-12 pt-8 border-t border-white/5">
                        <p className="text-[10px] text-center text-slate-600 leading-relaxed">
                            By signing up, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
