import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSystemHealth, mockAlerts } from '@/data/mockData';
import { Activity, Camera, AlertTriangle, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCards: React.FC = () => {
    const criticalAlerts = mockAlerts.filter(a => a.severity === 'critical').length;

    const stats = [
        {
            title: "Active Cameras",
            value: `${mockSystemHealth.activeCameras} / ${mockSystemHealth.totalCameras}`,
            description: "3 offline, 1 degraded",
            icon: Camera,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20"
        },
        {
            title: "Active Alerts",
            value: mockAlerts.length.toString(),
            description: `${criticalAlerts} Critical Priority`,
            icon: AlertTriangle,
            color: "text-destructive",
            bgColor: "bg-destructive/10",
            borderColor: "border-destructive/20",
            alert: true
        },
        {
            title: "AI Processing Latency",
            value: `${mockSystemHealth.aiLatency}ms`,
            description: "Real-time stream analysis",
            icon: Activity,
            color: "text-emerald-400",
            bgColor: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20"
        },
        {
            title: "Core Infrastructure",
            value: `${mockSystemHealth.cpuUsage}%`,
            description: `${mockSystemHealth.networkBandwidth} Mbps Bandwidth`,
            icon: Cpu,
            color: "text-purple-400",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/20"
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
            {stats.map((stat, index) => (
                <motion.div key={index} variants={item}>
                    <Card className={`relative overflow-hidden ${stat.alert ? 'border-destructive/50 shadow-[0_0_15px_rgba(220,38,38,0.15)]' : ''}`}>
                        {stat.alert && (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full blur-2xl -mr-16 -mt-16 animate-pulse" />
                        )}
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-400">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-md ${stat.bgColor} ${stat.borderColor} border`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold tracking-tight font-mono ${stat.alert ? 'text-destructive' : 'text-zinc-100'}`}>
                                {stat.value}
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default StatCards;