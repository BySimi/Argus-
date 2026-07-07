import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard';
import Analytics from '@/pages/Analytics';
import CameraNetwork from '@/pages/CameraNetwork';
import Settings from '@/pages/Settings';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="network" element={<CameraNetwork />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}

export default App;
