"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    LineChart,
    Target,
    BrainCircuit,
    PieChart,
    Layers,
    Smartphone
} from 'lucide-react';

const FEATURE_LIST = [
    {
        title: "أدوات SMC",
        description: "اكتشف هيكل السوق، كتل الأوامر، وفجوات القيمة العادلة بدقة متناهية.",
        icon: LineChart,
        color: "text-blue-500"
    },
    {
        title: "تحيز السوق بالذكاء الاصطناعي",
        description: "يقوم محركنا العصبي بمسح أكثر من 50 متغيراً لتوليد تحيز اتجاهي يومي.",
        icon: BrainCircuit,
        color: "text-emerald-500"
    },
    {
        title: "حاسبة حجم الصفقة",
        description: "أدر مخاطرك كصناديق التحوط. احسب الأحجام عبر أكثر من 200 أصل فوراً.",
        icon: PieChart,
        color: "text-purple-500"
    },
    {
        title: "تتبع السيولة",
        description: "تصور تجمعات أوامر الوقف ومجمعات السيولة المؤسسية في الوقت الفعلي.",
        icon: Target,
        color: "text-red-500"
    },
    {
        title: "مختبر الاستراتيجيات",
        description: "اختبر فرضياتك مقابل 10 سنوات من البيانات ذات الجودة المؤسسية.",
        icon: Layers,
        color: "text-orange-500"
    },
    {
        title: "محرك الأطر الزمنية المتعددة",
        description: "لا تتداول أبداً عكس الاتجاه مرة أخرى. اعرض 4 أطر زمنية في لوحة واحدة.",
        icon: Smartphone,
        color: "text-cyan-500"
    }
];

export const Features = () => {
    return (
        <section id="features" className="py-24 bg-slate-950/50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">احتراف الأسواق</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        أدوات احترافية للمتداولين الذين يتعاملون مع التداول كعمل تجاري.
                        بيانات دقيقة، نتائج حقيقية.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURE_LIST.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="glass p-8 rounded-2xl border border-white/5 card-hover text-right"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 mr-0 ml-auto ${feature.color}`}>
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

