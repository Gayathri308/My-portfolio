import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { PROFILE } from '../constants';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
        const SENDER_EMAIL = import.meta.env.VITE_BREVO_SENDER_EMAIL;
        const SENDER_NAME = import.meta.env.VITE_BREVO_SENDER_NAME;
        const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

        if (!BREVO_API_KEY) {
            console.error('Brevo API key is missing');
            setStatus('error');
            return;
        }

        try {
            // Function to convert line breaks to <br /> for HTML emails
            const formattedMessage = formData.message.replace(/\n/g, '<br />');

            // 1. Send Email to Admin (Portfolio Owner)
            const adminResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': BREVO_API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sender: { name: formData.name, email: SENDER_EMAIL },
                    to: [{ email: ADMIN_EMAIL, name: 'Portfolio Admin' }],
                    subject: `🚨 New Portfolio Inquiry from ${formData.name}`,
                    htmlContent: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
                                body { margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', Arial, sans-serif; }
                                .wrapper { width: 100%; table-layout: fixed; background-color: #f8fafc; padding-bottom: 40px; padding-top: 40px; }
                                .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; color: #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
                                .header { background: linear-gradient(135deg, #ef4444 0%, #f59e0b 100%); padding: 40px; text-align: center; color: white; }
                                .content { padding: 40px; line-height: 1.6; }
                                .footer { background-color: #f1f5f9; padding: 30px; text-align: center; font-size: 12px; color: #64748b; }
                                .summary-card { background-color: #f8fafc; border-left: 4px solid #ef4444; padding: 20px; border-radius: 8px; margin: 25px 0; }
                                .details { font-size: 14px; margin-bottom: 20px; }
                                .details strong { color: #0f172a; }
                            </style>
                        </head>
                        <body>
                            <div class="wrapper">
                                <table class="main">
                                    <tr>
                                        <td class="header">
                                            <h1 style="margin: 0; font-size: 28px; letter-spacing: -1px;">GM.</h1>
                                            <p style="margin: 10px 0 0; opacity: 0.9; font-weight: 500;">New Admin Notification</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content">
                                            <h2 style="margin-top: 0; color: #0f172a;">New Message Received</h2>
                                            <div class="details">
                                                <p><strong>Sender:</strong> ${formData.name}</p>
                                                <p><strong>Email:</strong> ${formData.email}</p>
                                            </div>
                                            
                                            <div class="summary-card">
                                                <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: bold;">Message Content</p>
                                                <p style="margin: 10px 0 0; color: #334155;">${formattedMessage}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="footer">
                                            <p style="margin: 0;">Portfolio Admin Management System</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </body>
                        </html>
                    `,
                    replyTo: { email: formData.email, name: formData.name }
                })
            });

            const userResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': BREVO_API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
                    to: [{ email: formData.email, name: formData.name }],
                    subject: `Message Received! Let's build something great - ${SENDER_NAME}`,
                    htmlContent: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
                                body { margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', Arial, sans-serif; }
                                .wrapper { width: 100%; table-layout: fixed; background-color: #f8fafc; padding-bottom: 40px; padding-top: 40px; }
                                .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; color: #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
                                .header { background: linear-gradient(135deg, #4f46e5 0%, #a855f7 100%); padding: 40px; text-align: center; color: white; }
                                .content { padding: 40px; line-height: 1.6; }
                                .footer { background-color: #f1f5f9; padding: 30px; text-align: center; font-size: 12px; color: #64748b; }
                                .button { display: inline-block; padding: 14px 28px; background-color: #4f46e5; color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: bold; margin-top: 20px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.4); }
                                .summary-card { background-color: #f8fafc; border-left: 4px solid #4f46e5; padding: 20px; border-radius: 8px; margin: 25px 0; }
                                .social-link { margin: 0 10px; text-decoration: none; color: #4f46e5; font-weight: bold; }
                            </style>
                        </head>
                        <body>
                            <div class="wrapper">
                                <table class="main">
                                    <tr>
                                        <td class="header">
                                            <h1 style="margin: 0; font-size: 28px; letter-spacing: -1px;">GM.</h1>
                                            <p style="margin: 10px 0 0; opacity: 0.9; font-weight: 500;">Connection Request Received</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content">
                                            <h2 style="margin-top: 0; color: #0f172a;">Hi ${formData.name}, 👋</h2>
                                            <p>Thanks for reaching out! I've received your message and I'm excited to connect with you. I usually respond within 24 hours.</p>
                                            
                                            <div class="summary-card">
                                                <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: bold;">Your Message Summary</p>
                                                <p style="margin: 10px 0 0; font-style: italic; color: #334155;">${formattedMessage}</p>
                                            </div>

                                            <p>In the meantime, feel free to check out my latest work on GitHub or connect with me on LinkedIn.</p>
                                            
                                            <a href="https://github.com/Gayathri308" class="button">Visit My Portfolio</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="footer">
                                            <div style="margin-bottom: 20px;">
                                                <a href="https://github.com/Gayathri308" class="social-link">GitHub</a>
                                                <a href="https://www.linkedin.com/in/gayathri-m-429416283" class="social-link">LinkedIn</a>
                                            </div>
                                            <p style="margin: 0;">&copy; ${new Date().getFullYear()} ${SENDER_NAME}. All rights reserved.</p>
                                            <p style="margin: 5px 0 0;">Salem, Tamil Nadu, India</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </body>
                        </html>
                    `
                })
            });

            if (adminResponse.ok && userResponse.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Email Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
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
                                    placeholder="Tell me what is that I can help you with..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status !== 'idle'}
                                className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all ${status === 'success' ? 'bg-green-500 text-white' :
                                    status === 'error' ? 'bg-red-500 text-white' :
                                        'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
                                    }`}
                            >
                                {status === 'idle' && <>Send Message <Send size={14} /></>}
                                {status === 'sending' && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                                {status === 'success' && <>Sent Successfully! <CheckCircle size={14} /></>}
                                {status === 'error' && <>Failed to Send. Try Again</>}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
