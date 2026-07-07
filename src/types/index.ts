export type CameraStatus = 'active' | 'offline' | 'degraded';

export interface Camera {
    id: string;
    name: string;
    location: [number, number]; // lat, lng
    status: CameraStatus;
    zone: string;
    resolution: string;
    fps: number;
    lastPing: string;
    streamUrl: string; // mock image/gif url
}

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface Alert {
    id: string;
    cameraId: string;
    timestamp: string;
    type: string;
    severity: AlertSeverity;
    description: string;
    confidence: number;
    resolved: boolean;
    coordinates: [number, number];
}

export interface PersonTrack {
    id: string;
    personId: string;
    cameraId: string;
    timestamp: string;
    thumbnail: string;
    action: string;
    riskScore: number;
}

export interface SystemHealth {
    cpuUsage: number;
    memoryUsage: number;
    networkBandwidth: number; // Mbps
    activeCameras: number;
    totalCameras: number;
    uptime: number; // hours
    aiLatency: number; // ms
}

export interface RiskMetric {
    zone: string;
    score: number; // 0-100
    trend: 'up' | 'down' | 'stable';
}
