import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitCommit, Camera, Map, Fingerprint, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const mockJourney = [
    { id: 'ev-1', time: '14:15', location: 'Transit Hub Entrance', type: 'entry', risk: 10, confidence: 99 },
    { id: 'ev-2', time: '14:22', location: 'Restricted Corridor B', type: 'violation', risk: 75, confidence: 94 },
    { id: 'ev-3', time: '14:25', location: 'Blind Spot Area Alpha', type: 'lost', risk: 85, confidence: 60 },
    { id: 'ev-4', time: '14:28', location: 'Financial District Plaza', type: 'reacquired', risk: 95, confidence: 91 },
];

const PersonJourney: React.FC = () => {
    return (
        <Card className="col-span-1 lg:col-span-2 h-full min-h-[400px] flex flex-col border-blue-900/30">
            <CardHeader className="pb-4 border-b border-zinc-800/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <Fingerprint className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Target Journey Map</CardTitle>
                            <p className="text-xs text-zinc-400 font-mono mt-0.5">SUBJ-84 TRACKING TIMELINE</p>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-6">
                <div className="relative h-full flex flex-col justify-center">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800/50 -translate-y-1/2" />

                    <div className="flex justify-between items-center relative z-10">
                        {mockJourney.map((step, i) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex flex-col items-center w-1/4 group"
                            >
                                <div className="mb-4 text-center">
                                    <div className="text-[10px] font-mono text-zinc-500 mb-1">{step.time}</div>
                                    <div className="text-xs font-medium text-zinc-300 leading-tight max-w-[120px]">
                                        {step.location}
                                    </div>
                                </div>

                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-zinc-950 transition-colors ${step.type === 'violation' || step.risk > 80 ? 'border-destructive text-destructive shadow-[0_0_15px_rgba(220,38,38,0.3)]' :
                                        step.type === 'lost' ? 'border-amber-500 text-amber-500 border-dashed' :
                                            'border-blue-500 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                                    }`}>
                                    {step.type === 'violation' || step.risk > 80 ? <ShieldAlert className="w-3.5 h-3.5" /> :
                                        step.type === 'lost' ? <Map className="w-3.5 h-3.5" /> :
                                            <Camera className="w-3.5 h-3.5" />}
                                </div>

                                <div className="mt-4 flex flex-col items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${step.risk > 80 ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                        }`}>
                                        RISK: {step.risk}%
                                    </span>
                                    <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                                        <GitCommit className="w-3 h-3" />
                                        CONF: {step.confidence}%
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PersonJourney;