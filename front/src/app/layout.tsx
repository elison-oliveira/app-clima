import { Outlet, NavLink, useLocation } from "react-router";
import { Home, Map, TriangleAlert, Settings } from "lucide-react";
import { clsx } from "clsx";
import React from 'react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/radar", icon: Map, label: "Radar" },
    { to: "/alerts", icon: TriangleAlert, label: "Alerts" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-orange-500 selection:text-white pb-20">
      <div className="max-w-md mx-auto min-h-screen relative flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
          <div>
            <h1 className="text-xl font-black tracking-tighter text-blue-500">
              OBJ <span className="text-orange-500">SMART</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Downtown Site A
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
            <span className="font-bold text-xs text-slate-300">JD</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-6">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 pb-safe">
          <div className="max-w-md mx-auto flex justify-around items-center h-16">
            {navItems.map(({ to, icon: Icon, label }) => {
              const isActive = location.pathname === to;
              return (
                <NavLink
                  key={to}
                  to={to}
                  className={clsx(
                    "flex flex-col items-center justify-center w-full h-full transition-colors duration-200",
                    isActive
                      ? "text-blue-500"
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  <Icon
                    size={24}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={clsx("mb-1", isActive && "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]")}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wide">
                    {label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
