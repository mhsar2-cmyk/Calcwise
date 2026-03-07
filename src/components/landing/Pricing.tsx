"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Crown } from 'lucide-react';
import { Button } from '../ui/Button';

const PLANS = [
    {
        name: "الخطة المجانية",
        price: "0",
        description: "مثالية للمتداولين المبتدئين لاستكشاف الأدوات الأساسية.",
        features: [
            "حاسبة حجم الصفقة",
            "تحليل تحيز السوق اليومي",
            "مؤشر Liquidity Sweep الأساسي",
            "سجل الصفقات (إلى 10 صفقات/شهر)",
            "دعم المجتمع عبر ديسكورد"
        ],
        icon: Zap,
        popular: false
    },
    {
        name: "خطة PRO",
        price: "49",
        description: "للمتداولين الجادين الذين يسعون للحصول على ميزة حقيقية.",
        features: [
            "جميع ميزات الخطة المجانية",
            "مجموعة مؤشرات SMC الكاملة",
            "تحليل الذكاء الاصطناعي الفوري",
            "سجل صفقات غير محدود",
            "تنبيهات مباشرة للجوال",
            "تحديثات البيانات في الوقت الفعلي"
        ],
        icon: Shield,
        popular: true
    },
    {
        name: "خطة المؤسسات",
        price: "199",
        description: "حلول مخصصة لصناديق التحوط والمتداولين المحترفين.",
        features: [
            "جميع ميزات خطة PRO",
            "دعم فني مخصص 24/7",
            "خوارزميات تداول مخصصة",
            "وصول إلى واجهة برمجة التطبيقات (API)",
            "تحليل محافظ استثمارية متقدم",
            "تدريب شخصي 1-على-1"
        ],
        icon: Crown,
        popular: false
    }
];

export const Pricing = () => {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">خطط تناسب طموحاتك</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        اختر الخطة التي تساعدك على التحكم في مخاطرك وتعظيم أرباحك في الأسواق المالية.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PLANS.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`glass p-8 rounded-3xl border ${plan.popular ? 'border-blue-500/50 relative' : 'border-white/5'} flex flex-col h-full card-hover`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
                                    الأكثر مبيعاً
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${plan.popular ? 'text-blue-500' : 'text-slate-400'}`}>
                                    <plan.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                                    <p className="text-xs text-slate-500">{plan.description}</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                                    <span className="text-slate-500">/شهرياً</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-emerald-500" />
                                        </div>
                                        <span className="text-sm text-slate-400 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                variant={plan.popular ? 'primary' : 'outline'}
                                className="w-full py-6 rounded-2xl font-bold"
                            >
                                اشترك الآن
                            </Button>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-slate-600 text-[10px] mt-12 uppercase tracking-widest font-medium">
                    جميع الخطط تتضمن وصولاً كاملاً لمستودع أكواد Pine Script للإصدارات السابقة.
                </p>
            </div>
        </section>
    );
};
