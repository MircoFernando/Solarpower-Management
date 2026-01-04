'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion'; 
import { Facebook, Instagram, Linkedin, Youtube, Sun } from 'lucide-react';

const footerLinks = [
    {
        label: 'Solutions',
        links: [
            { title: 'Residential Solar', href: '#' },
            { title: 'Commercial PPA', href: '#' },
            { title: 'Battery Storage', href: '#' },
            { title: 'EV Charging', href: '#' },
        ],
    },
    {
        label: 'Company',
        links: [
            { title: 'About Enovex', href: '#' },
            { title: 'Sustainability', href: '#' },
            { title: 'Careers', href: '#' },
            { title: 'Contact Us', href: '#' },
        ],
    },
    {
        label: 'Resources',
        links: [
            { title: 'Support Center', href: '#' },
            { title: 'System Status', href: '#' },
            { title: 'Solar Calculator', href: '#' },
            { title: 'Customer Stories', href: '#' },
        ],
    },
    {
        label: 'Connect',
        links: [
            { title: 'Facebook', href: '#', icon: Facebook },
            { title: 'Instagram', href: '#', icon: Instagram },
            { title: 'Youtube', href: '#', icon: Youtube },
            { title: 'LinkedIn', href: '#', icon: Linkedin },
        ],
    },
];

export function Footer() {
    return (
        <footer className="relative w-full max-w-7xl mx-auto rounded-t-3xl border-t border-white/10 bg-black/80 backdrop-blur-xl px-6 py-12 lg:py-20 overflow-hidden shadow-2xl">
            
            {/* Top Shine Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.6)]" />

            <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-8 relative z-10">
                
                {/* Brand Column */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-white">
                        <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-900/20">
                            <Sun className="size-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-wide">ENOVEX</span>
                    </div>
                    <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                        Empowering the world with sustainable energy solutions. We turn sunlight into savings and a cleaner future for everyone.
                    </p>
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} Enovex Solar Inc. <br /> All rights reserved.
                    </p>
                </div>

                {/* Links Grid - Grid fix to ensure visibility */}
                <div className="mt-4 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
                    {footerLinks.map((section, index) => (
                        <AnimatedContainer key={section.label} delay={index * 0.1}>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold text-white tracking-wider uppercase border-l-2 border-blue-500 pl-3">
                                    {section.label}
                                </h3>
                                <ul className="space-y-3 text-sm">
                                    {section.links.map((link) => (
                                        <li key={link.title}>
                                            <a
                                                href={link.href}
                                                className="group inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
                                            >
                                                {link.icon && (
                                                    <link.icon className="size-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                                                )}
                                                {link.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>
        </footer>
    );
};

function AnimatedContainer({ className, delay = 0, children }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} // Triggers slightly earlier
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};