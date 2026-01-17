import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { TornadoDataPoint } from '../types';

interface RiskTornadoProps {
  data: TornadoDataPoint[];
}

export const RiskTornado: React.FC<RiskTornadoProps> = ({ data }) => {
  // Transform data for Recharts to handle the "Tornado" effect
  // We need to calculate the start and end points for the bars relative to the base runway.
  // However, a simpler visual for Tornado is a divergence chart.
  // Let's format: name, negativeVal (left), positiveVal (right).
  
  const formattedData = data.map(d => ({
    name: d.variable,
    negative: d.impactNegative, // Should be negative number
    positive: d.impactPositive, // Should be positive number
    base: d.baseRunway,
    fullLabel: d.label
  }));

  // Custom tooltip to explain the runway impact
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded shadow-xl text-xs">
          <p className="font-bold text-slate-200 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-rose-400">
              Risk Scenario: {dataPoint.negative} Months (Total: {dataPoint.base + dataPoint.negative}m)
            </p>
            <p className="text-emerald-400">
              Upside Scenario: +{dataPoint.positive} Months (Total: {dataPoint.base + dataPoint.positive}m)
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full bg-slate-900 rounded-lg border border-slate-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center">
            <span className="w-2 h-6 bg-rose-500 mr-3 rounded-sm"></span>
            RISK TORNADO: SENSITIVITY ANALYSIS
          </h3>
          <p className="text-slate-400 text-sm mt-1">Impact on Runway (Months) | Baseline: {data[0]?.baseRunway || 0} Months</p>
        </div>
        <div className="px-3 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400">
          AGENT DELTA: ACTIVE
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            stackOffset="sign"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={150} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              interval={0}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: '#1e293b', opacity: 0.4}} />
            <ReferenceLine x={0} stroke="#475569" />
            <Bar dataKey="negative" fill="#f43f5e" stackId="stack">
                <LabelList dataKey="negative" position="left" fill="#f43f5e" fontSize={10} formatter={(val: number) => `${val}m`} />
            </Bar>
            <Bar dataKey="positive" fill="#10b981" stackId="stack">
                <LabelList dataKey="positive" position="right" fill="#10b981" fontSize={10} formatter={(val: number) => `+${val}m`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {formattedData.map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-2 rounded border border-slate-800 text-xs">
                <div className="font-semibold text-slate-300 mb-1">{item.name}</div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>BEAR: {item.base + item.negative}m</span>
                    <span>BULL: {item.base + item.positive}m</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};