"use client";
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { X, Plus, Target, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AddTradeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [formData, setFormData] = useState({
        pair: 'EURUSD',
        status: 'WIN',
        rr: 2.0,
        pl: 100,
        notes: ''
    });

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl text-right"
                >
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400">
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-bold text-white tracking-tight">إضافة صفقة جديدة</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">النفسية / الحالة</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-white outline-none focus:border-blue-500/50"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="WIN">ربح (Win)</option>
                                        <option value="LOSS">خسارة (Loss)</option>
                                        <option value="BE">نقطة الدخول (BE)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">زوج العملات</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-white outline-none focus:border-blue-500/50"
                                        value={formData.pair}
                                        onChange={(e) => setFormData({ ...formData, pair: e.target.value.toUpperCase() })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">الربح/الخسارة ($)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-white outline-none focus:border-emerald-500/50"
                                        value={formData.pl}
                                        onChange={(e) => setFormData({ ...formData, pl: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">عائد المخاطرة (R:R)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-white outline-none focus:border-blue-500/50"
                                        value={formData.rr}
                                        onChange={(e) => setFormData({ ...formData, rr: parseFloat(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">ملاحظات الصفقة</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-white outline-none focus:border-blue-500/50 h-32 resize-none"
                                    placeholder="لماذا دخلت هذه الصفقة؟"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            <Button
                                className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                                onClick={() => {
                                    alert('سيتم ربط هذا الزر بقاعدة البيانات قريباً!');
                                    onClose();
                                }}
                            >
                                <Plus size={20} />
                                حفظ الصفقة في السجل
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
