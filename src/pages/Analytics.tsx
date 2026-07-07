import React from 'react';
import PersonJourney from '@/components/analytics/PersonJourney';
import ExpectedArrival from '@/components/analytics/ExpectedArrival';
import RecentActivity from '@/components/analytics/RecentActivity';
import { Network, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Analytics: React.FC = () => {
    return (
        <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500 pb-8">
            {/* Analytics Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">AI Predictive Analytics</h1>
                    <p className="text-zinc-400 text-sm mt-1">Deep behavioral analysis and trajectory forecasting models.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400 gap-1.5 px-3 py-1.5">
                        <Network className="w-3.5 h-3.5" />
                        Neural Net Active
                    </Badge>
                    <Badge variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-300 gap-1.5 px-3 py-1.5">
                        <Database className="w-3.5 h-3.5" />
                        Sync: Optimal
                    </Badge>
                </div>
            </div>

            {/* Target Analysis Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <PersonJourney />
                <ExpectedArrival />
            </div>

            {/* System Activity Row */}
            <div className="grid grid-cols-1 gap-6">
                <RecentActivity />
            </div>
        </div>
    );
};

export default Analytics;