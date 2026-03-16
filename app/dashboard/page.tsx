import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LogOut, Shield, Mail, Calendar, Key, User, ArrowUpRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    return (
        <div className="min-h-screen border-x border-[#111] max-w-7xl mx-auto flex flex-col bg-black">
            {/* Minimal Nav */}
            <nav className="border-b border-[#111] bg-black/50 backdrop-blur-xl">
                <div className="px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-white rounded-xs flex items-center justify-center">
                                <Shield className="text-black w-3.5 h-3.5" />
                            </div>
                            <span className="font-bold tracking-tighter uppercase text-sm">S-Core</span>
                        </div>
                        <div className="flex gap-8">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-white cursor-pointer border-b border-white pb-7">Session</span>
                            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-600 hover:text-white pb-7 transition-colors cursor-pointer">Security</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 p-12">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Stats Column */}
                    <div className="lg:col-span-8 space-y-12">
                        <header className="animate-in fade-in slide-in-from-top-4 duration-500">
                            <h1 className="text-4xl font-bold tracking-tighter mb-4">Workspace / Active</h1>
                            <p className="text-neutral-500 font-light text-lg">Identity successfully verified at {new Date(user.created_at).toLocaleDateString()}.</p>
                        </header>

                        {/* Profile Block */}
                        <section className="border border-[#111] p-10 bg-[#050505] animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                                <div className="w-24 h-24 bg-white rounded-xs flex items-center justify-center text-black text-3xl font-black">
                                    {user.email?.charAt(0).toUpperCase()}
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-3xl font-bold tracking-tight">{user.email?.split('@')[0]}</h2>
                                        <span className="text-[10px] font-bold tracking-widest px-3 py-1 bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase">Pro</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8 pt-4">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-bold text-neutral-700 uppercase tracking-[0.2em]">Provider</p>
                                            <p className="text-sm font-mono text-neutral-300">Email/Password</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-bold text-neutral-700 uppercase tracking-[0.2em]">Account ID</p>
                                            <p className="text-sm font-mono text-neutral-300">US-CORE-{user.id.slice(0, 8)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Recent Events */}
                        <section className="space-y-6">
                            <div className="flex justify-between items-end border-b border-[#111] pb-4">
                                <h3 className="text-xs font-bold tracking-[0.3em] text-neutral-600 uppercase">Recent Activity Logs</h3>
                                <ArrowUpRight className="w-4 h-4 text-neutral-700" />
                            </div>
                            <div className="divide-y divide-[#111] border-b border-[#111]">
                                {[
                                    { log: 'Access Code Exchanged', id: 'EV-01', time: 'JUST NOW' },
                                    { log: 'Session Initialized', id: 'EV-02', time: '12S AGO' },
                                    { log: 'Middleware Handshake', id: 'EV-03', time: '1M AGO' }
                                ].map((item, i) => (
                                    <div key={i} className="py-5 flex justify-between items-center group cursor-default">
                                        <div className="flex gap-6 items-center">
                                            <span className="text-[9px] font-mono text-neutral-800">{item.id}</span>
                                            <span className="text-xs font-bold text-neutral-500 group-hover:text-white transition-colors">{item.log}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-neutral-700">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Action Sidebar */}
                    <div className="lg:col-span-4 space-y-12">
                        <section className="border border-[#111] p-8 space-y-10">
                            <div>
                                <h3 className="text-xs font-bold tracking-[0.3em] text-neutral-600 uppercase mb-6">Management</h3>
                                <div className="space-y-4">
                                    <button className="btn-primary !text-xs tracking-[0.2em] uppercase !rounded-none !py-4">Download Keys</button>
                                    <form action="/auth/signout" method="post">
                                        <button className="w-full py-4 text-xs font-bold text-red-700 hover:text-red-500 border border-[#111] hover:border-red-900/50 transition-all uppercase tracking-[0.2em]">Termin Session</button>
                                    </form>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-[#111]">
                                <h3 className="text-xs font-bold tracking-[0.3em] text-neutral-600 uppercase mb-6">Security Meta</h3>
                                <div className="bg-[#050505] p-6 border border-[#111] font-mono text-[9px] text-neutral-600 leading-relaxed overflow-auto max-h-[300px]">
                                    {JSON.stringify(user, null, 2)}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
