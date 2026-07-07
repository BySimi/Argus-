import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

const Layout: React.FC = () => {
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-blue-500/30">
            {/* Dynamic Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-900/5 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykiLz48L3N2Zz4=')] opacity-50" />
            </div>

            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 relative z-10">
                <Navbar />

                <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar p-4 lg:p-6">
                    <div className="mx-auto h-full max-w-[1920px]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;