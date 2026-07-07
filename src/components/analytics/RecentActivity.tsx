import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, ShieldCheck, ShieldAlert, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatTime } from '@/lib/utils';
import { motion } from 'framer-motion';

const activityLog = [
  { id: 1, type: 'system', msg: 'Node AI model synchronized globally.', time: new Date(Date.now() - 300000), icon: Cpu },
  { id: 2, type: 'alert', msg: 'Unattended object identified in Transit Sector A.', time: new Date(Date.now() - 1200000), icon: ShieldAlert },
  { id: 3, type: 'secure', msg: 'Routine security sweep completed. No anomalies.', time: new Date(Date.now() - 1800000), icon: ShieldCheck },
  { id: 4, type: 'system', msg: 'Camera CAM-042 firmware updated successfully.', time: new Date(Date.now() - 3600000), icon: Cpu },
  { id: 5, type: 'alert', msg: 'Crowd density warning triggered (Sector C).', time: new Date(Date.now() - 5400000), icon: ShieldAlert },
];

const RecentActivity: React.FC = () => {
  return (
    <Card className="col-span-1 lg:col-span-3 h-full min-h-[300px] flex flex-col">
      <CardHeader className="pb-4 border-b border-zinc-800/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="w-5 h-5 text-emerald-400" />
            System Activity Log
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs text-zinc-400 bg-zinc-900/50">
            Last 24 Hours
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] uppercase font-mono text-zinc-500 bg-zinc-900/30 sticky top-0 z-10 border-b border-zinc-800/50">
            <tr>
              <th className="px-6 py-3 font-medium">Timestamp</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Event Description</th>
              <th className="px-6 py-3 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {activityLog.map((log, index) => {
              const Icon = log.icon;
              return (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-zinc-900/40 transition-colors group"
                >
                  <td className="px-6 py-4 font-mono text-xs text-zinc-400 whitespace-nowrap">
                    {formatTime(log.time)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-md ${
                        log.type === 'alert' ? 'bg-destructive/10 text-destructive' : 
                        log.type === 'secure' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs uppercase font-mono text-zinc-300">{log.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">
                    {log.msg}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Badge variant="outline" className="bg-zinc-950/50 text-[10px] font-mono border-zinc-700 text-zinc-400">
                      LOGGED
                    </Badge>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;