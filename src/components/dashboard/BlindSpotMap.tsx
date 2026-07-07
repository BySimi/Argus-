import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Map, EyeOff, Navigation, AlertCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polygon, Polyline, Tooltip, Circle } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { mockCameras } from '@/data/mockData';

// Custom Map Marker using Lucide Icons
const createCameraIcon = (status: string, label: string) => {
    const color = status === 'active' ? '#10b981' : status === 'degraded' ? '#f59e0b' : '#ef4444';
    const shadowColor = status === 'active' ? 'rgba(16, 185, 129, 0.4)' : status === 'degraded' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(239, 68, 68, 0.4)';

    const html = renderToStaticMarkup(
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                backgroundColor: '#09090b',
                padding: '6px',
                borderRadius: '50%',
                border: `2px solid ${color}`,
                boxShadow: `0 0 10px ${shadowColor}`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" />
                </svg>
            </div>
            <div style={{
                marginTop: '4px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid #27272a',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '10px',
                color: '#fff',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap'
            }}>
                {label}
            </div>
        </div>
    );

    return L.divIcon({
        html,
        className: 'bg-transparent border-0',
        iconSize: [60, 60],
        iconAnchor: [30, 20],
    });
};

const TargetIcon = L.divIcon({
    html: renderToStaticMarkup(
        <div style={{ position: 'relative' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 0 15px rgba(239, 68, 68, 1)' }} />
            <div style={{ position: 'absolute', top: '-14px', left: '-14px', width: '40px', height: '40px', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '50%', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
        </div>
    ),
    className: 'bg-transparent border-0',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
});

const BlindSpotMap: React.FC = () => {
    // Center map on the first camera's general vicinity
    const center: [number, number] = [40.7128, -74.0060];

    // Realistic mock data for blind spots (Polygons)
    const blindSpots: [number, number][][] = [
        [
            [40.7125, -74.0062],
            [40.7126, -74.0048],
            [40.7118, -74.0046],
            [40.7116, -74.0058],
        ],
        [
            [40.7140, -74.0075],
            [40.7142, -74.0065],
            [40.7135, -74.0062],
            [40.7132, -74.0072],
        ]
    ];

    // Mock predicted path through a blind spot
    const predictedPath: [number, number][] = [
        [40.7128, -74.0060], // Starts at CAM-001
        [40.7125, -74.0058],
        [40.7122, -74.0052], // Moves through blind spot
        [40.7118, -74.0050],
        [40.7112, -74.0055], // Approaches CAM-002
    ];

    const cameraCoverageRadius = 80; // meters

    return (
        <Card className="col-span-1 lg:col-span-2 h-[500px] flex flex-col overflow-hidden relative">
            {/* Inline styles for Leaflet animations */}
            <style>{`
        .leaflet-container {
          background: #09090b !important;
          font-family: 'JetBrains Mono', monospace;
        }
        .animated-path {
          animation: dashoffset 20s linear infinite;
        }
        @keyframes dashoffset {
          to { stroke-dashoffset: -1000; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

            <CardHeader className="pb-3 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md z-[400] relative">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Map className="w-5 h-5 text-indigo-400" />
                        Tactical Blind Spot Map
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-zinc-900/80 border-indigo-500/30 text-indigo-400">
                            <Navigation className="w-3 h-3 mr-1" />
                            AI Path Prediction Active
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 relative">
                <MapContainer
                    center={center}
                    zoom={16}
                    zoomControl={false}
                    className="w-full h-full z-0"
                >
                    {/* Dark Professional Map Tiles */}
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    />

                    {/* Render Cameras and their coverage zones */}
                    {mockCameras.map((camera) => (
                        <React.Fragment key={camera.id}>
                            {/* Coverage Circle */}
                            {camera.status !== 'offline' && (
                                <Circle
                                    center={camera.location}
                                    radius={cameraCoverageRadius}
                                    pathOptions={{
                                        color: camera.status === 'active' ? '#10b981' : '#f59e0b',
                                        fillColor: camera.status === 'active' ? '#10b981' : '#f59e0b',
                                        fillOpacity: 0.05,
                                        weight: 1,
                                        dashArray: '4 4'
                                    }}
                                />
                            )}
                            {/* Camera Marker */}
                            <Marker
                                position={camera.location}
                                icon={createCameraIcon(camera.status, camera.id)}
                            >
                                <Tooltip direction="top" offset={[0, -20]} opacity={1} className="bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-xs">
                                    {camera.name}<br />
                                    Status: {camera.status.toUpperCase()}
                                </Tooltip>
                            </Marker>
                        </React.Fragment>
                    ))}

                    {/* Render Unmonitored Blind Spots */}
                    {blindSpots.map((spot, index) => (
                        <Polygon
                            key={`blind-spot-${index}`}
                            positions={spot}
                            pathOptions={{
                                color: '#ef4444',
                                fillColor: '#ef4444',
                                fillOpacity: 0.15,
                                weight: 2,
                                dashArray: '5 5'
                            }}
                        >
                            <Tooltip sticky className="bg-destructive border border-destructive text-white font-mono text-xs">
                                <AlertCircle className="w-3 h-3 inline mr-1" />
                                Unmonitored Zone (High Risk)
                            </Tooltip>
                        </Polygon>
                    ))}

                    {/* AI Predicted Path for a tracked subject */}
                    <Polyline
                        positions={predictedPath}
                        pathOptions={{
                            color: '#3b82f6',
                            weight: 3,
                            dashArray: '10, 15',
                            className: 'animated-path'
                        }}
                    />

                    {/* Current Subject Location Marker */}
                    <Marker position={predictedPath[2]} icon={TargetIcon}>
                        <Tooltip permanent direction="right" offset={[10, 0]} className="bg-transparent border-0 shadow-none text-red-400 font-mono text-[10px] font-bold">
                            SUBJ-84 TRACKED
                        </Tooltip>
                    </Marker>
                </MapContainer>

                {/* Floating Map Legend */}
                <div className="absolute bottom-4 left-4 z-[400] bg-zinc-950/90 backdrop-blur-md border border-zinc-800/80 rounded-lg p-3 shadow-xl">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">Map Legend</div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500" />
                            Active Coverage
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                            <div className="w-3 h-3 bg-red-500/20 border border-red-500 border-dashed" />
                            Blind Spot
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                            <div className="w-full max-w-[12px] h-[2px] bg-blue-500 border-t border-dashed border-zinc-950" />
                            AI Prediction Path
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BlindSpotMap;