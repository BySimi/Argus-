import React from 'react';
import { mockAlerts } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AlertFeed: React.FC = () => {
    return (
        <Card className="col-span-1 h-[400px] flex flex-col">
            <CardHeader className="pb-3 border-b border-zinc-800/50">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        Live Alert Feed
                    </CardTitle>
                    <Badge variant="destructive" className="font-mono">
                        {mockAlerts.length} Active
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0 custom-scrollbar">
                <div className="flex flex-col">
                    <AnimatePresence>
                        {mockAlerts.map((alert, index) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors group cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant={alert.severity === 'critical' ? 'destructive' : alert.severity === 'high' ? 'warning' : 'secondary'}
                                            className="uppercase text-[10px]"
                                        >
                                            {alert.severity}
                                        </Badge>
                                        <span className="text-xs font-mono text-zinc-500">{alert.id}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-zinc-500 font-mono">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </div>
                                </div>

                                <h4 className="text-sm font-medium text-zinc-200 mb-1">
                                    {alert.type}
                                </h4>
                                <p className="text-xs text-zinc-400 mb-3 line-clamp-2">
                                    {alert.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center text-xs text-zinc-500 font-mono">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {alert.cameraId}
                                    </div>
                                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-[10px] uppercase tracking-wider text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Resolve
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
};

export default AlertFeed;