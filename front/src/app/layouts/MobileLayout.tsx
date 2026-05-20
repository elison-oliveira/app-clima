import { Outlet, NavLink } from "react-router";
import { Home, Map, Settings, CloudLightning } from "lucide-react";
import React from 'react';

export default function MobileLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white max-w-md mx-auto relative overflow-hidden shadow-2xl shadow-zinc-900/50 border-x border-zinc-800">
      
      {/* Header Area - Optional branding or status bar placeholder */}
      <header className="px-5 py-4 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
        <div className="flex items-center gap-2">
          <CloudLightning className="w-6 h-6 text-orange-500" />
          <h1 className="text-lg font-black tracking-tighter uppercase italic">
            OBJ<span className="text-orange-500">SMART</span>
          </h1>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" title="Live Data" />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 max-w-md mx-auto">
        <ul className="flex justify-around items-center h-20 px-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-zinc-500 hover:text-zinc-300"
                }`
              }
            >
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wide">DASH</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/radar"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-zinc-500 hover:text-zinc-300"
                }`
              }
            >
              <Map className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wide">RADAR</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "text-orange-500 bg-orange-500/10"
                    : "text-zinc-500 hover:text-zinc-300"
                }`
              }
            >
              <Settings className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wide">SET</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
