import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-10 text-center border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
                <p className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                    Made with <Heart size={16} className="text-red-500 fill-red-500" /> by Gayathri
                </p>
                <p className="text-sm text-slate-500">
                    © {new Date().getFullYear()} All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
