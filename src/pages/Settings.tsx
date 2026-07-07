import React from 'react';

const Settings: React.FC = () => {
    return (
        <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Platform Settings</h1>
                    <p className="text-zinc-400 text-sm mt-1">Configuration and user management.</p>
                </div>
            </div>

            <div className="flex-1 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 flex items-center justify-center">
                <p className="text-zinc-500 font-mono text-sm">Settings Panel (Pending Implementation)</p>
            </div>
        </div>
    );
};

export default Settings;