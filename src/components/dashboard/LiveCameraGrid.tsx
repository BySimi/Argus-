import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCameras } from '@/data/mockData';
import { Video, Maximize2, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const LiveCameraGrid: React.FC = () => {
    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 h-full min-h-[400px] flex flex-col">
            <CardHeader className="pb-3 border-b border-zinc-800/50 flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Video className="w-5 h-5 text-blue-400" />
                    Tactical Grid View
                </CardTitle>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-zinc-900/50 text-emerald-400 border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                        Live Feed
                    </Badge>
                    <button className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                    {mockCameras.slice(0, 4).map((camera, index) => (
                        <motion.div
                            key={camera.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 aspect-video flex flex-col"
                        >
                            {camera.status !== 'offline' ? (
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ backgroundImage: `url(${camera.streamUrl})` }}
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
                                    <Activity className="w-8 h-8 text-zinc-700 mb-2" />
                                    <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Signal Lost</span>
                                </div>
                            )}

                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />

                            <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-mono font-bold text-white shadow-black drop-shadow-md">
                                            {camera.id}
                                        </span>
                                        <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor] ${camera.status === 'active' ? 'bg-emerald-500 text-emerald-500' :
                                                camera.status === 'degraded' ? 'bg-amber-500 text-amber-500' : 'bg-red-500 text-red-500'
                                            }`} />
                                    </div>
                                    <div className="text-[10px] text-zinc-300 font-medium">
                                        {camera.name}
                                    </div>
                                </div>
                                <Badge variant="outline" className="bg-black/50 backdrop-blur-sm text-[9px] px-1.5 py-0 border-zinc-700 font-mono">
                                    {camera.resolution} • {camera.fps}fps
                                </Badge>
                            </div>

                            {camera.id === 'CAM-001' && (
                                <div className="absolute top-1/4 left-1/3 w-24 h-32 border border-blue-500/50 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-blue-400" />
                                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-blue-400" />
                                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-blue-400" />
                                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-blue-400" />
                                    <span className="absolute -top-5 left-0 text-[9px] font-mono text-blue-400 bg-black/50 px-1 rounded">ID: SUBJ-84</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default LiveCameraGrid;