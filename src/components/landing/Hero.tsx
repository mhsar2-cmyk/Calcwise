"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { AreaChart, Zap, ArrowLeft } from 'lucide-react';




export const Hero = () => {
    return (
        <section className="relative pt-40 pb-20 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] hero-gradient pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
                >
                    <Zap size={16} fill="currentColor" />
                    <span>البنية التحتية لتداول الجيل القادم</span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    أتمتة <br />
                    <span className="gradient-text">استراتيجيات تداولك</span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    مؤشرات متقدمة، تحليلات السوق بالذكاء الاصطناعي، وحاسبات احترافية.
                    كل ما تحتاجه لتعزيز تفوقك في التداول.
                </motion.p>

                <motion.div
                    className="flex flex-wrap items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link href="/login">
                        <Button size="lg" className="flex items-center gap-2 group">
                            ابدأ التجربة المجانية <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="outline" size="lg">استكشف المؤشرات</Button>
                    </Link>
                </motion.div>


                {/* Mockup Preview */}
                <motion.div
                    className="mt-20 relative px-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="max-w-5xl mx-auto glass rounded-2xl p-4 border border-white/5 shadow-2xl relative">
                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
                        <div className="bg-slate-900/50 rounded-xl overflow-hidden border border-white/5 aspect-video md:aspect-[21/9] flex items-center justify-center relative">
                            <AreaChart className="text-blue-500/20 w-40 h-40 animate-pulse" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

