'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { KeyRound, Mail, Loader2, ArrowLeft, RefreshCw, Key } from 'lucide-react'

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [isRecovery, setIsRecovery] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event) => {
            if (event === 'PASSWORD_RECOVERY') {
                setIsRecovery(true)
            }
        })
    }, [])

    const handleResetRequest = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })

        if (error) {
            setError(error.message)
        } else {
            setMessage('Reset link sent! Please check your email inbox.')
        }
        setLoading(false)
    }

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.updateUser({ password: newPassword })

        if (error) {
            setError(error.message)
        } else {
            setMessage('Password updated successfully! Redirecting to login...')
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side - Branded Context */}
            <div className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden bg-black/20">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                            <KeyRound className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">SupabaseCore</span>
                    </div>

                    <h2 className="heading-premium max-w-lg">
                        Secure <br />
                        <span className="text-emerald-400">Recovery</span>.
                    </h2>
                    <p className="text-slate-400 mt-6 text-lg max-w-md leading-relaxed">
                        Lost your key? No problem. Our iron-clad recovery process gets you back to work safely and quickly.
                    </p>

                    <div className="mt-12 p-6 glass rounded-2xl border-indigo-500/20 bg-indigo-500/5">
                        <div className="flex gap-4 items-start">
                            <RefreshCw className="w-6 h-6 text-indigo-400 mt-1" />
                            <div>
                                <p className="font-bold text-white">Automated Process</p>
                                <p className="text-sm text-slate-400 mt-1">Verification links expire in 1 hour for your protection.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-xs text-slate-600 uppercase tracking-widest font-bold">Encrypted via Supabase Auth</p>
                </div>

                {/* Decorative background for left side */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            {/* Right side - Reset Form */}
            <div className="flex items-center justify-center p-8 bg-black/10 backdrop-blur-sm border-l border-white/[0.05]">
                <div className="w-full max-w-md animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="mb-10 lg:hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                                <KeyRound className="text-white w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold tracking-tight">SupabaseCore</span>
                        </div>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-3xl font-bold mb-2 tracking-tight">
                            {isRecovery ? 'Set new password' : 'Reset password'}
                        </h1>
                        <p className="text-slate-500">
                            {isRecovery ? 'Enter your new credentials below.' : "We'll send a recovery link to your inbox."}
                        </p>
                    </div>

                    {error && <div className="status-error mb-6">{error}</div>}
                    {message && <div className="status-success mb-6">{message}</div>}

                    <form onSubmit={isRecovery ? handlePasswordUpdate : handleResetRequest} className="space-y-6">
                        {!isRecovery ? (
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-400 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-field pl-12"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-400 ml-1">New Password</label>
                                <div className="relative">
                                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="input-field pl-12"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        )}

                        <button type="submit" disabled={loading} className="btn-primary group">
                            <div className="flex items-center justify-center gap-2">
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>{isRecovery ? 'Update security keys' : 'Send recovery link'}</>
                                )}
                            </div>
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link href="/login" className="text-sm text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
