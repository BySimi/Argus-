import React, { useState, useEffect } from 'react';
import { Menu, Bell, Search, MapPin, Maximize, Minimize } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatTime } from '@/lib/utils';
import NotificationCenter from './NotificationCenter';

const Navbar: React.FC = () => {
  const { toggleSidebar } = useAppStore();
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 bg-zinc-950/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden text-zinc-400 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="hidden md:flex relative w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-1.5 border border-zinc-800 rounded-md leading-5 bg-zinc-900/50 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-zinc-900 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all sm:text-sm font-mono"
            placeholder="Search cameras, alerts, persons..."
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block border border-zinc-700 rounded px-1.5 text-[10px] font-mono text-zinc-500 bg-zinc-800/50">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <div className="hidden lg:flex items-center gap-2 text-zinc-400 px-3 py-1.5 rounded-md bg-zinc-900/40 border border-zinc-800/50">
          <MapPin className="w-4 h-4 text-zinc-500" />
          <span className="text-xs font-mono">Sector 7, Alpha District</span>
        </div>

        <div className="hidden sm:flex items-center justify-center px-4 py-1.5 rounded-md bg-black border border-zinc-800/80 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
          <span className="text-sm font-mono text-blue-400 tracking-wider">
            {formatTime(time)}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-destructive rounded-full border border-zinc-950 animate-pulse-alert" />
          </Button>
          <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        </div>

        <div className="h-8 w-px bg-zinc-800/50 mx-1 hidden sm:block" />

        <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-blue-500/50 transition-all">
          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Commander" />
          <AvatarFallback className="bg-blue-950 text-blue-400 text-xs font-medium">CMD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Navbar;