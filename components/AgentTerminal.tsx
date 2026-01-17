import React, { useEffect, useRef } from 'react';
import { AgentLog } from '../types';
import { Terminal } from 'lucide-react';

interface AgentTerminalProps {
  logs: AgentLog[];
}

export const AgentTerminal: React.FC<AgentTerminalProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getAgentColor = (agent: string) => {
    switch (agent) {
      case 'ALPHA': return 'text-cyan-400';
      case 'BETA': return 'text-purple-400';
      case 'GAMMA': return 'text-amber-400';
      case 'DELTA': return 'text-rose-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col h-full">
      <div className="bg-slate-900 px-3 py-2 border-b border-slate-800 flex items-center space-x-2">
        <Terminal className="w-3 h-3 text-slate-500" />
        <span className="text-xs font-mono text-slate-400">NEXUS_AGENT_ORCHESTRATOR_LOGS</span>
      </div>
      <div ref={scrollRef} className="p-3 overflow-y-auto flex-1 min-h-0 font-mono text-xs space-y-1.5">
        {logs.length === 0 && (
            <div className="text-slate-600 italic">Waiting for input signal...</div>
        )}
        {logs.map((log) => (
          <div key={log.id} className="flex space-x-2">
            <span className="text-slate-600">[{log.timestamp}]</span>
            <span className={`font-bold ${getAgentColor(log.agent)}`}>{log.agent}</span>
            <span className="text-slate-300">{log.action}</span>
            {log.status === 'complete' && <span className="text-emerald-500">✓</span>}
            {log.status === 'error' && <span className="text-rose-500">✗</span>}
          </div>
        ))}
      </div>
    </div>
  );
};