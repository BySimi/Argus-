import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Critical Risk', value: 78, color: '#ef4444' }, // 78% risk
    { name: 'Safe', value: 22, color: '#27272a' },
];

const RiskGauge: React.FC = () => {
    return (
        <Card className="col-span-1 h-[300px] flex flex-col relative overflow-hidden">
            <CardHeader className="pb-0 border-none">
                <CardTitle className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
                    <Activity className="w-4 h-4" />
                    System Threat Level
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col items-center justify-center relative p-0">
                <div className="absolute inset-0 flex items-center justify-center flex-col mt-8">
                    <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", delay: 0.5 }}
                        className="text-5xl font-black text-white font-mono tracking-tighter"
                    >
                        78<span className="text-2xl text-red-500">%</span>
                    </motion.span>
                    <span className="text-xs font-mono text-red-400 mt-1 uppercase tracking-widest animate-pulse">
                        Elevated
                    </span>
                </div>

                <div className="w-full h-full -mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="70%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius="70%"
                                outerRadius="90%"
                                dataKey="value"
                                stroke="none"
                                cornerRadius={5}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#f4f4f5', borderRadius: '8px' }}
                                itemStyle={{ color: '#ef4444' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default RiskGauge;