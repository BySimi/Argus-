import { Camera, Alert, SystemHealth, RiskMetric } from '@/types';

export const mockCameras: Camera[] = [
  {
    id: 'CAM-001',
    name: 'Main Transit Hub - Alpha',
    location: [40.7128, -74.0060],
    status: 'active',
    zone: 'Transit Sector A',
    resolution: '4K',
    fps: 60,
    lastPing: new Date().toISOString(),
    streamUrl: 'https://images.unsplash.com/photo-1557992260-ec58e38d363c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'CAM-002',
    name: 'Financial District Plaza',
    location: [40.7112, -74.0055],
    status: 'active',
    zone: 'Commercial Sector',
    resolution: '1080p',
    fps: 30,
    lastPing: new Date().toISOString(),
    streamUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'CAM-003',
    name: 'Subway Entrance South',
    location: [40.7135, -74.0045],
    status: 'degraded',
    zone: 'Transit Sector B',
    resolution: '1080p',
    fps: 15,
    lastPing: new Date(Date.now() - 5000).toISOString(),
    streamUrl: 'https://images.unsplash.com/photo-1601059286024-61032e83b2f3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'CAM-004',
    name: 'Alleyway 42 - Restricted',
    location: [40.7145, -74.0070],
    status: 'offline',
    zone: 'Industrial Sector',
    resolution: '720p',
    fps: 0,
    lastPing: new Date(Date.now() - 3600000).toISOString(),
    streamUrl: '',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-9921',
    cameraId: 'CAM-001',
    timestamp: new Date(Date.now() - 120000).toISOString(),
    type: 'Unattended Baggage',
    severity: 'high',
    description: 'Black duffel bag left unattended for > 5 minutes near central pillar.',
    confidence: 0.94,
    resolved: false,
    coordinates: [40.71285, -74.00595],
  },
  {
    id: 'ALT-9922',
    cameraId: 'CAM-002',
    timestamp: new Date(Date.now() - 450000).toISOString(),
    type: 'Crowd Density Exceeded',
    severity: 'medium',
    description: 'Pedestrian density exceeded safe threshold (4.2 persons/sqm).',
    confidence: 0.88,
    resolved: false,
    coordinates: [40.71125, -74.00545],
  },
  {
    id: 'ALT-9923',
    cameraId: 'CAM-004',
    timestamp: new Date(Date.now() - 860000).toISOString(),
    type: 'Connection Lost',
    severity: 'critical',
    description: 'Signal lost. Last known frame indicates potential tampering.',
    confidence: 0.99,
    resolved: false,
    coordinates: [40.7145, -74.0070],
  }
];

export const mockSystemHealth: SystemHealth = {
  cpuUsage: 42,
  memoryUsage: 68,
  networkBandwidth: 845,
  activeCameras: 142,
  totalCameras: 145,
  uptime: 1440,
  aiLatency: 45,
};

export const mockRiskMetrics: RiskMetric[] = [
  { zone: 'Transit Sector A', score: 24, trend: 'stable' },
  { zone: 'Transit Sector B', score: 45, trend: 'up' },
  { zone: 'Commercial Sector', score: 12, trend: 'down' },
  { zone: 'Industrial Sector', score: 88, trend: 'up' },
];