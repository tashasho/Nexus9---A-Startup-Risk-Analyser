import React from 'react';
import { LayoutDashboard, Users, Activity, Zap, ShieldAlert, Terminal } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'sourcing', label: 'Agent Alpha (Sourcing)', icon: Users },
    { id: 'twin', label: 'Agent Beta (Digital Twin)', icon: Activity },
    { id: 'sim', label: 'Agent Gamma (Simulator)', icon: Zap },
    { id: 'audit', label: 'Agent Delta (Auditor)', icon: ShieldAlert },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center">
          <Terminal className="text-slate-950 w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-wider">NEXUS-9</h1>
          <p className="text-xs text-cyan-400 font-mono">INTELLIGENCE ENGINE</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 border-l-2 border-cyan-400'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-950 rounded p-3 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-mono">SYSTEM STATUS</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>UPTIME</span>
              <span>99.9%</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>LATENCY</span>
              <span>24ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};