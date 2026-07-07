import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Activity,
    Video,
    Settings,
    ShieldAlert,
    Server,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const navItems = [
    { name: 'Command Center', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Grid', path: '/network', icon: Video },
    { name: 'Analytics', path: '/analytics', icon: Activity },
    { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar: React.FC = () => {
    const { sidebarOpen, setSidebarOpen } = useAppStore();
    const location = useLocation();

    const SidebarContent = () => (
        <div className="flex h-full flex-col bg-zinc-950/80 backdrop-blur-xl border-r border-border/50">
            <div className="flex h-16 items-center px-6 border-b border-border/50 justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800">
                        <ShieldAlert className="w-5 h-5 text-blue-500" />
                        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
                    </div>
                    <span className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                        ARGUS
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-zinc-400 hover:text-white"
                    onClick={() => setSidebarOpen(false)}
                >
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
                <div className="space-y-1">
                    <p className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Main Navigation
                    </p>
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative",
                                    isActive
                                        ? "text-blue-400 bg-blue-950/20"
                                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active-indicator"
                                        className="absolute left-0 w-1 h-full bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                                <Icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300")} />
                                <span className="font-medium text-sm">{item.name}</span>

                                {item.name === 'Command Center' && (
                                    <Badge variant="destructive" className="ml-auto text-[10px] h-5 px-1.5 flex items-center justify-center rounded">
                                        3
                                    </Badge>
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </div>

            <div className="p-4 mt-auto">
                <Separator className="mb-4 bg-zinc-800/50" />
                <div className="flex flex-col gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <Server className="w-4 h-4" />
                            <span>System Status</span>
                        </div>
                        <span className="relative flex w-2 h-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500"></span>
                        </span>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-zinc-500">CPU</span>
                            <span className="text-emerald-400">24%</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-1">
                            <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '24%' }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono mt-1">
                            <span className="text-zinc-500">Cameras</span>
                            <span className="text-blue-400">142/145</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar container */}
            <motion.aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex-shrink-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <SidebarContent />
            </motion.aside>
        </>
    );
};

export default Sidebar;