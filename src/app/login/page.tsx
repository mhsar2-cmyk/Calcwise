"use client";
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-slate-950 flex flex-col text-right">
            <Navbar />

            <div className="flex-grow flex items-center justify-center p-6 pt-24">
                <div className="w-full max-w-md glass p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[80px] -translate-y-1/2 translate-x-1/2 rounded-full" />

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">مرحباً بك مجدداً</h1>
                        <p className="text-slate-400 text-sm">ادخل بياناتك للوصول إلى أدواتك الذكية.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-1">البريد الإلكتروني</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-all dir-ltr"
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">كلمة المرور</label>
                                <a href="#" className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors">نسيت كلمة المرور؟</a>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-white focus:border-blue-500/50 outline-none transition-all dir-ltr"
                            />
                        </div>

                        <Button
                            className="w-full py-4 mt-4 font-bold rounded-2xl"
                            disabled={loading}
                        >
                            {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5">
                        <p className="text-center text-slate-500 text-xs">
                            ليس لديك حساب؟ {" "}
                            <a href="#" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">اشترك الآن</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
