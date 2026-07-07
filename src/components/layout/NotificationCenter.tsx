import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldAlert, Info, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatTime } from '@/lib/utils';

interface Notification {
    id: string;
    type: 'critical' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
}

const mockNotifications: Notification[] = [
    {
        id: 'notif-1',
        type: 'critical',
        title: 'Camera Connection Lost',
        message: 'CAM-004 in Industrial Sector went offline unexpectedly.',
        timestamp: new Date(Date.now() - 120000),
        read: false,
    },
    {
        id: 'notif-2',
        type: 'warning',
        title: 'High Crowd Density',
        message: 'Capacity exceeded at Transit Sector B (120%).',
        timestamp: new Date(Date.now() - 860000),
        read: false,
    },
    {
        id: 'notif-3',
        type: 'info',
        title: 'System Update Completed',
        message: 'AI tracking models updated to v4.2.1.',
        timestamp: new Date(Date.now() - 3600000),
        read: true,
    },
];

interface NotificationCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
    const unreadCount = mockNotifications.filter(n => !n.read).length;

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'critical': return <ShieldAlert className="w-4 h-4 text-destructive" />;
            case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
            case 'info': return <Info className="w-4 h-4 text-blue-400" />;
            case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute top-16 right-4 lg:right-6 w-80 sm:w-96 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 shadow-2xl rounded-xl z-50 overflow-hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-zinc-800/50 bg-zinc-900/50">
                            <div className="flex items-center gap-2">
                                <Bell className="w-4 h-4 text-zinc-400" />
                                <h3 className="text-sm font-semibold text-zinc-100">Notifications</h3>
                                {unreadCount > 0 && (
                                    <Badge variant="destructive" className="ml-2 text-[10px] h-5 px-1.5">
                                        {unreadCount} New
                                    </Badge>
                                )}
                            </div>
                            <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto max-h-[400px] custom-scrollbar p-2">
                            <div className="flex flex-col gap-1">
                                {mockNotifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={`p-3 rounded-lg border flex items-start gap-3 transition-colors ${notif.read ? 'bg-transparent border-transparent hover:bg-zinc-900/50' : 'bg-zinc-900/40 border-zinc-800/50 hover:bg-zinc-900/80'
                                            }`}
                                    >
                                        <div className="mt-0.5">{getIcon(notif.type)}</div>
                                        <div className="flex-1 flex flex-col gap-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <span className={`text-sm font-medium ${notif.read ? 'text-zinc-300' : 'text-zinc-100'}`}>
                                                    {notif.title}
                                                </span>
                                                <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                                                    {formatTime(notif.timestamp)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-zinc-400 leading-relaxed">
                                                {notif.message}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-3 border-t border-zinc-800/50 bg-zinc-900/30 text-center">
                            <button className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors">
                                MARK ALL AS READ
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default NotificationCenter;