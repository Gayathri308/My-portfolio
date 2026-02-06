import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Github, Linkedin, Twitter, ArrowRight, Download } from 'lucide-react';
import { PROFILE } from '../constants';

const Hero = () => {
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12">
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 -left-20 w-64 h-64 bg-primary-500/10 dark:bg-primary-900/10 rounded-full filter blur-[80px]"
            />
            <motion.div
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 dark:bg-purple-900/10 rounded-full filter blur-[80px]"
            />

            <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center relative z-10 text-center lg:text-left">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-600 dark:text-primary-400 text-[10px] font-bold mb-4 inline-block uppercase tracking-wider"
                    >
                        Available for Internships 🚀
                    </motion.span>
                    <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                        Hi, I'm <br />
                        <span className="bg-gradient-to-r from-primary-600 via-purple-500 to-primary-400 bg-clip-text text-transparent">
                            {PROFILE.name}
                        </span>
                    </h1>
                    <div className="text-base md:text-lg font-bold text-slate-600 dark:text-slate-400 mb-6 h-6">
                        <Typewriter
                            words={['Full Stack Developer', 'Web Enthusiast', 'Problem Solver', 'CS Student']}
                            loop={true}
                            cursor
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1500}
                        />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                        {PROFILE.summary}
                    </p>

                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                        <motion.a
                            href="#projects"
                            onClick={(e) => handleScroll(e, 'projects')}
                            whileHover={{ scale: 1.02 }}
                            className="btn-primary flex items-center gap-2"
                        >
                            Projects <ArrowRight size={14} />
                        </motion.a>
                        <motion.a
                            href="/resume.pdf"
                            whileHover={{ scale: 1.02 }}
                            className="btn-secondary flex items-center gap-2"
                        >
                            Resume <Download size={14} />
                        </motion.a>
                    </div>

                    <div className="flex gap-5 justify-center lg:justify-start">
                        {[
                            { icon: Github, href: PROFILE.github },
                            { icon: Linkedin, href: PROFILE.linkedin },
                            { icon: Twitter, href: "#" },
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ y: -3, color: '#0ea5e9' }}
                                className="text-slate-400 hover:text-primary-500 transition-all"
                            >
                                <social.icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative hidden lg:block"
                >
                    <div className="w-full aspect-square max-w-[350px] ml-auto relative group">
                        <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-2xl group-hover:opacity-30 transition-opacity" />
                        <div className="relative z-10 w-full h-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl">
                            <img
                                src="/profile.jpeg"
                                alt={PROFILE.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute -bottom-4 -left-4 p-3 glass-card rounded-xl shadow-lg z-20">
                            <p className="font-bold text-xs text-primary-600">Hiring Now</p>
                            <p className="text-[9px] opacity-60 uppercase font-black">Open for Roles</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
