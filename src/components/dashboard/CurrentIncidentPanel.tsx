import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, Crosshair, MapPin, Radio, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CurrentIncidentPanel: React.FC = () => {
    return (
        <Card className="col-span-1 h-[400px] flex flex-col border-red-900/30 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />

            <CardHeader className="pb-3 border-b border-zinc-800/50 relative z-10">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg text-red-400">
                        <ShieldAlert className="w-5 h-5" />
                        Active Priority Incident
                    </CardTitle>
                    <Badge variant="destructive" className="animate-pulse-alert uppercase font-mono text-[10px]">
                        Code Red
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-5 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">Signal Lost / Tampering Detected</h3>
                        <p className="text-sm text-zinc-400">CAM-004 connection terminated unexpectedly. Last frame indicates deliberate obstruction.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
                            <span className="text-[10px] text-zinc-500 font-mono uppercase">Location</span>
                            <div className="flex items-center gap-1.5 mt-1 text-sm text-zinc-300 font-mono">
                                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                                Alleyway 42
                            </div>
                        </div>
                        <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
                            <span className="text-[10px] text-zinc-500 font-mono uppercase">Target ID</span>
                            <div className="flex items-center gap-1.5 mt-1 text-sm text-zinc-300 font-mono">
                                <Crosshair className="w-3.5 h-3.5 text-red-400" />
                                SUBJ-84
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-red-200">
                            <Radio className="w-4 h-4 text-red-400" />
                            Dispatch Unit 7 En Route
                        </div>
                        <span className="text-xs font-mono text-red-400">ETA: 02:45</span>
                    </div>
                </motion.div>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
                    <Button variant="outline" className="w-full border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 font-mono text-xs">
                        IGNORE
                    </Button>
                    <Button variant="destructive" className="w-full font-mono text-xs flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5" />
                        ESCALATE
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CurrentIncidentPanel;