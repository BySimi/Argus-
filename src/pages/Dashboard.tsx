import React from 'react';
import StatCards from '@/components/dashboard/StatCards';
import LiveCameraGrid from '@/components/dashboard/LiveCameraGrid';
import AlertFeed from '@/components/dashboard/AlertFeed';
import BlindSpotMap from '@/components/dashboard/BlindSpotMap';
import PersonTimeline from '@/components/dashboard/PersonTimeline';
import RiskGauge from '@/components/dashboard/RiskGauge';
import CameraHealth from '@/components/dashboard/CameraHealth';
import CurrentIncidentPanel from '@/components/dashboard/CurrentIncidentPanel';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500 pb-8">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Global Command Center</h1>
                    <p className="text-zinc-400 text-sm mt-1">Real-time surveillance matrix and predictive AI analytics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                        SYSTEM OPTIMAL
                    </div>
                </div>
            </div>

            {/* Top Stats Row */}
            <StatCards />

            {/* Main Tactical Grid, Alerts & Incident Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <LiveCameraGrid />
                <div className="col-span-1 flex flex-col gap-6">
                    <CurrentIncidentPanel />
                </div>
            </div>

            {/* Map & Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                    <BlindSpotMap />
                </div>
                <div className="lg:col-span-1">
                    <AlertFeed />
                </div>
                <div className="lg:col-span-1">
                    <PersonTimeline />
                </div>
            </div>

            {/* Health & Risk Metrics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <CameraHealth />
                <RiskGauge />
            </div>
        </div>
    );
};

export default Dashboard;