import { Bell, Shield, Moon, Smartphone, LogOut, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import React from "react";

export default function Settings() {
  const sections = [
    {
      title: "Account",
      items: [
        { icon: Shield, label: "Safety Certification", value: "Valid" }
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", value: "On" },
        { icon: Moon, label: "Dark Mode", value: "Always On" },
        { icon: Smartphone, label: "Offline Maps", value: "Downloaded" },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Settings</h2>

      {sections.map((section, idx) => (
        <div key={idx}>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
            {section.title}
          </h3>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800">
            {section.items.map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-slate-800 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <item.icon size={20} className="text-slate-400" />
                  <span className="font-medium text-slate-200">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-medium">{item.value}</span>
                  <ChevronRight size={16} className="text-slate-600" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <button className="w-full p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors">
        <LogOut size={20} />
        Log Out
      </button>

      <div className="text-center text-xs text-slate-600 mt-8">
        <p>OBJ SMART v1.2.0 (Build 450)</p>
        <p>Connected to Station: Downtown-A</p>
      </div>
    </div>
  );
}
