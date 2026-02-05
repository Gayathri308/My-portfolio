import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { EXPERIENCE } from '../constants';

const Experience = () => {
    return (
        <section id="experience" className="section-padding">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-black mb-3">Journey</h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="space-y-6">
                    {EXPERIENCE.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex gap-4 relative"
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white shrink-0 z-10 shadow-md">
                                    <Briefcase size={14} />
                                </div>
                                {i < EXPERIENCE.length - 1 && (
                                    <div className="w-0.5 h-full bg-slate-100 dark:bg-slate-800 -mt-1" />
                                )}
                            </div>
                            <div className="glass-card p-5 rounded-2xl w-full mb-3">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-1.5 mb-3">
                                    <div>
                                        <h3 className="text-base font-black leading-tight">{exp.role}</h3>
                                        <p className="text-primary-600 dark:text-primary-400 font-bold text-xs">{exp.company}</p>
                                    </div>
                                    <span className="flex items-center gap-1 text-[9px] font-black uppercase text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                                        <Calendar size={10} /> {exp.duration}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
                                    "{exp.description}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
