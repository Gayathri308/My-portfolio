import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { PROFILE } from '../constants';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="section-padding bg-slate-50/50 dark:bg-slate-900/10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-black mb-3">Let's Connect</h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 md:gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-black mb-4">Contact Details</h3>
                        {[
                            { icon: Mail, label: 'Email Me', value: PROFILE.email, color: 'text-primary-500' },
                            { icon: Phone, label: 'Call Me', value: PROFILE.phone, color: 'text-green-500' },
                            { icon: MapPin, label: 'Location', value: PROFILE.location, color: 'text-red-500' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 glass-card rounded-xl border border-transparent hover:border-primary-500/20 transition-all">
                                <div className={`w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${item.color}`}>
                                    <item.icon size={16} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black uppercase text-slate-500 tracking-wider leading-none mb-1">{item.label}</p>
                                    <p className="text-xs font-bold leading-none">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-6 md:p-8 rounded-3xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[9px] font-black uppercase mb-1 text-slate-500 ml-1">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none text-xs"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-black uppercase mb-1 text-slate-500 ml-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none text-xs"
                                        placeholder="hello@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[9px] font-black uppercase mb-1 text-slate-500 ml-1">Message</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none text-xs resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status !== 'idle'}
                                className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all ${status === 'success' ? 'bg-green-500 text-white' : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
                                    }`}
                            >
                                {status === 'idle' && <>Send Message <Send size={14} /></>}
                                {status === 'sending' && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                                {status === 'success' && <>Sent! <CheckCircle size={14} /></>}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
