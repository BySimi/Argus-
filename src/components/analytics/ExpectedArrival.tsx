import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Timer, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const ExpectedArrival: React.FC = () => {
    return (
        <Card className="col-span-1 h-full min-h-[400px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-50" />

            <CardHeader className="pb-4 border-b border-zinc-800/50">
                <CardTitle className="flex items-center gap-2 text-lg text-amber-500">
                    <Target className="w-5 h-5" />
                    Trajectory Prediction
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-6 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center mb-8">
                    <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-800" />
                        <motion.circle
                            cx="64" cy="64" r="60"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray="377"
                            initial={{ strokeDashoffset: 377 }}
                            animate={{ strokeDashoffset: 377 * 0.15 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-bold font-mono text-white">85<span className="text-lg text-amber-500">%</span></span>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Confidence</span>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <div className="bg-zinc-950/60 border border-zinc-800/50 rounded-lg p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
                            <Compass className="w-3 h-3 text-amber-500" />
                            Predicted Destination
                        </span>
                        <span className="text-sm font-medium text-zinc-200">Sector 4 - Exit Terminus</span>
                    </div>

                    <div className="bg-zinc-950/60 border border-zinc-800/50 rounded-lg p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
                            <Timer className="w-3 h-3 text-amber-500" />
                            Estimated Time of Arrival
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold font-mono text-white">03:42</span>
                            <span className="text-xs text-zinc-500 font-mono">mins</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                            <motion.div
                                className="h-full bg-amber-500"
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 222, ease: "linear" }}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ExpectedArrival;