import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { useInView } from 'react-intersection-observer';

const SkillBar = ({ name, level }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <div className="mb-3.5" ref={ref}>
            <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] tracking-tight">{name}</span>
                <span className="text-primary-500 font-black text-[10px]">{level}%</span>
            </div>
            <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary-500 rounded-full"
                />
            </div>
        </div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="section-padding">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-black mb-3">Technical Stack</h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {SKILLS.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-5 md:p-6 rounded-2xl"
                        >
                            <h3 className="text-sm font-black mb-5 text-primary-500 uppercase tracking-widest">{category.category}</h3>
                            <div className="space-y-3.5">
                                {category.items.map((skill, i) => (
                                    <SkillBar key={i} {...skill} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
