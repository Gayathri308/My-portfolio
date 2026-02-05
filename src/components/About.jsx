import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { EDUCATION, CERTIFICATIONS } from '../constants';

const About = () => {
    return (
        <section id="about" className="section-padding bg-slate-50/50 dark:bg-slate-900/10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-black mb-3">About Me</h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2.5 mb-5">
                            <GraduationCap className="text-primary-500" size={20} />
                            <h3 className="text-lg font-bold">Education</h3>
                        </div>
                        <div className="space-y-4">
                            {EDUCATION.map((edu, i) => (
                                <div key={i} className="glass-card p-5 rounded-xl relative overflow-hidden group border-l-2 border-l-primary-500">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-1.5 mb-3">
                                        <div>
                                            <h4 className="text-base font-bold group-hover:text-primary-500 transition-colors leading-snug">{edu.degree}</h4>
                                            <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">{edu.institution}</p>
                                        </div>
                                        <span className="flex items-center gap-1 text-[9px] font-bold text-primary-600 dark:text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                            <Calendar size={10} /> {edu.duration}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {edu.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Certifications and Languages */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div>
                            <div className="flex items-center gap-2.5 mb-5">
                                <BookOpen className="text-purple-500" size={20} />
                                <h3 className="text-lg font-bold">Certifications</h3>
                            </div>
                            <div className="grid gap-3">
                                {CERTIFICATIONS.map((cert, i) => (
                                    <div key={i} className="glass-card p-3.5 rounded-xl flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                                                <BookOpen size={14} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs">{cert.name}</h4>
                                                <p className="text-[9px] text-slate-500 font-medium">{cert.issuer} • {cert.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="text-lg">🗣️</span>
                                <h3 className="text-lg font-bold">Languages</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {["English", "Tamil"].map((lang, i) => (
                                    <span key={i} className="px-4 py-1.5 glass-card rounded-lg font-bold text-xs text-primary-600 dark:text-primary-400">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
