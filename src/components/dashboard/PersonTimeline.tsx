import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Clock, MapPin, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrackEvent {
    id: string;
    time: string;
    location: string;
    action: string;
    riskScore: number;
}

const mockTimeline: TrackEvent[] = [
    { id: '1', time: '14:22:05', location: 'CAM-001 (Main Transit Hub)', action: 'Subject identified entering restricted zone', riskScore: 85 },
    { id: '2', time: '14:25:12', location: 'CAM-002 (Financial Plaza)', action: 'Subject dropped unidentified package', riskScore: 94 },
    { id: '3', time: '14:28:45', location: 'Blind Spot Area Alpha', action: 'AI Path Prediction active - Subject lost', riskScore: 96 },
];

const PersonTimeline: React.FC = () => {
    return (
        <Card className="col-span-1 h-[500px] flex flex-col relative overflow-hidden border-blue-900/30">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none" />

            <CardHeader className="pb-3 border-b border-zinc-800/50">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <User className="w-5 h-5 text-blue-400" />
                        Active Tracking: SUBJ-84
                    </CardTitle>
                    <Badge variant="destructive" className="animate-pulse-alert bg-red-500/20 text-red-400 border-red-500/30">
                        HIGH RISK
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="relative border-l border-zinc-800 ml-3 space-y-8">
                    {mockTimeline.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-6"
                        >
                            <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                                        <Clock className="w-3 h-3" />
                                        {event.time}
                                    </span>
                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${event.riskScore > 90 ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                        }`}>
                                        RISK: {event.riskScore}
                                    </span>
                                </div>

                                <p className="text-sm text-zinc-200 font-medium">{event.action}</p>

                                <div className="flex items-center text-xs text-zinc-500 font-mono mt-1 bg-zinc-900/50 w-fit px-2 py-1 rounded">
                                    <MapPin className="w-3 h-3 mr-1.5 text-blue-400" />
                                    {event.location}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Current Live Status Node */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        className="relative pl-6 pt-4"
                    >
                        <div className="absolute -left-[5px] top-5 w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]" />
                        <div className="absolute -left-[9px] top-[16px] w-[17px] h-[17px] rounded-full border border-red-500/50 animate-ping" />

                        <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/5 flex items-center gap-3">
                            <Activity className="w-4 h-4 text-red-400 animate-pulse" />
                            <span className="text-xs font-mono text-red-400">SEARCHING ADJACENT CAMERAS...</span>
                        </div>
                    </motion.div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PersonTimeline;