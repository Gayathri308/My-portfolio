import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];

    const filteredProjects = filter === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === filter);

    return (
        <section id="projects" className="section-padding bg-slate-50/50 dark:bg-slate-900/10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl md:text-3xl font-black mb-3">Selected Work</h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-1.5 rounded-lg font-bold transition-all text-[10px] uppercase tracking-wider ${filter === cat
                                ? 'bg-primary-600 text-white shadow-md'
                                : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div layout className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group"
                            >
                                <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <a href={project.github} className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg text-white flex items-center justify-center hover:bg-primary-500">
                                            <Github size={16} />
                                        </a>
                                        <a href={project.live} className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg text-white flex items-center justify-center hover:bg-primary-500">
                                            <ArrowUpRight size={16} />
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-[9px] font-bold rounded uppercase tracking-wider border border-primary-500/10">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-black group-hover:text-primary-500 transition-colors mb-1.5">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
