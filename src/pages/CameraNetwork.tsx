import React from 'react';

const CameraNetwork: React.FC = () => {
    return (
        <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Camera Network</h1>
                    <p className="text-zinc-400 text-sm mt-1">Manage physical hardware and topology.</p>
                </div>
            </div>

            <div className="flex-1 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 flex items-center justify-center">
                <p className="text-zinc-500 font-mono text-sm">Topology Map (Pending Implementation)</p>
            </div>
        </div>
    );
};

export default CameraNetwork;