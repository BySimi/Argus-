import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Global Command Center</h1>
                    <p className="text-zinc-400 text-sm mt-1">Real-time surveillance and predictive analytics.</p>
                </div>
            </div>

            <div className="flex-1 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 flex items-center justify-center">
                <p className="text-zinc-500 font-mono text-sm">Dashboard Grid Component (Pending Implementation)</p>
            </div>
        </div>
    );
};

export default Dashboard;