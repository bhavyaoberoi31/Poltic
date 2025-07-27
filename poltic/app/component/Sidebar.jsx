'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Home, 
    Flame, 
    User, 
    Settings, 
    Flag
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const isActive = (path) => pathname === path || pathname.startsWith(path);

    const navigationItems = [
        { href: '/home', icon: Home, label: 'Home' },
        { href: '/breaking', icon: Flame, label: 'Breaking' },
        { href: '/profile/dashboard', icon: User, label: 'Profile' },
        // { href: '/profile/reported', icon: Flag, label: 'Reported' },
        // { href: '/profile/settings', icon: Settings, label: 'Settings' },
    ];

    const sidebarVariants = {
        hidden: { x: -280, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.div 
                className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r border-gray-200"
                initial="hidden"
                animate="visible"
                variants={sidebarVariants}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <motion.div 
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <img src="/assets/logo.png" alt="" className='w-32 h-8' />
                    </motion.div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navigationItems.map((item, index) => (
                        <motion.div
                            key={item.href}
                            variants={itemVariants}
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href={item.href}
                                className={`
                                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative font-medium
                                    ${isActive(item.href) 
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }
                                `}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                                {isActive(item.href) && (
                                    <motion.div
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    />
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </nav>
            </motion.div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
                <motion.div 
                    className="px-4 py-2 safe-area-inset-bottom"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                    <div className="flex items-center justify-around">
                        {navigationItems.slice(0, 5).map((item, index) => (
                            <motion.div
                                key={item.href}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href={item.href}
                                    className={`
                                        flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200 relative
                                        ${isActive(item.href) 
                                            ? 'text-blue-600 bg-blue-50' 
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                        }
                                    `}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-xs font-medium">{item.label}</span>
                                    {isActive(item.href) && (
                                        <motion.div
                                            className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Sidebar;
