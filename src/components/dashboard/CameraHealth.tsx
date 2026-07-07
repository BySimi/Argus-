import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, Wifi, Cpu } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';

const networkData = [
    { time: '14:00', bandwidth: 820, latency: 42 },
    { time: '14:05', bandwidth: 850, latency: 45 },
    { time: '14:10', bandwidth: 810, latency: 39 },
    { time: '14:15', bandwidth: 890, latency: 48 },
    { time: '14:20', bandwidth: 940, latency: 55 },
    { time: '14:25', bandwidth: 845, latency: 45 },
];

const CameraHealth: React.FC = () => {
    return (
        <Card className="col-span-1 lg:col-span-2 h-[300px] flex flex-col">
            <CardHeader className="pb-3 border-b border-zinc-800/50">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
                        <Server className="w-4 h-4" />
                        Network & Camera Health
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-mono text-[10px]">
                            <Wifi className="w-3 h-3 mr-1" />
                            845 Mbps
                        </Badge>
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 font-mono text-[10px]">
                            <Cpu className="w-3 h-3 mr-1" />
                            45ms AI Latency
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-4 pl-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={networkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorBandwidth" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="time" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#f4f4f5', borderRadius: '8px', fontSize: '12px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="bandwidth"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorBandwidth)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default CameraHealth;