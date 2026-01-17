import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { analyzeStartupData } from './services/geminiService';
import { AgentLog, NexusAnalysis, RiskLevel } from './types';
import { RiskTornado } from './components/RiskTornado';
import { AgentTerminal } from './components/AgentTerminal';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import { Play, RotateCw, Shield, Target, TrendingUp, AlertTriangle, Cpu, Brain, Lock, Users, Upload, FileText, X } from 'lucide-react';

// Mock Data for Initial State (Pre-analysis)
const MOCK_ANALYSIS: NexusAnalysis = {
  investmentThesis: "Pending Analysis...",
  bearCase: "Pending Analysis...",
  founderMetrics: {
    resilienceScore: 0,
    technicalMoatScore: 0,
    recruitingAbility: 0,
    cognitiveFlexibility: 0,
    highAgencySignal: []
  },
  marketTopology: {
    ghostCompetitors: [],
    categoryMaturity: "Blue Ocean",
    regulatoryCliff: "Unknown",
    totalAddressableMarket: "Unknown"
  },
  financials: {
    burnMultiple: 0,
    ruleOf40: 0,
    valuationStatus: "Par",
    runwayMonths: 0,
    ltvCacRatio: 0
  },
  simulations: [],
  riskTornado: [],
  truthSeekerQuestions: [],
  confidenceIntervals: {
    founderResilience: 0,
    techMoatDurability: 0,
    exitProbability: 0
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<NexusAnalysis>(MOCK_ANALYSIS);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Helper to add logs
  const addLog = (agent: "ALPHA" | "BETA" | "GAMMA" | "DELTA", action: string, status: "pending" | "complete" | "error" = "pending") => {
    const newLog: AgentLog = {
      id: Math.random().toString(36).substring(7),
      agent,
      action,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status
    };
    setLogs(prev => [...prev, newLog]);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Remove data URL prefix
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAnalyze = async () => {
    if (!process.env.API_KEY) {
      setApiKeyMissing(true);
      return;
    }
    
    if (!inputText.trim() && !selectedFile) return;

    setIsAnalyzing(true);
    setLogs([]); // Clear previous logs
    
    // Simulate Agent Workflow
    addLog('ALPHA', 'Initiating Antigravity Browser scrape...', 'pending');
    
    try {
        const fileData = selectedFile ? {
            mimeType: selectedFile.type,
            data: await fileToBase64(selectedFile)
        } : undefined;

        // Step 1: Alpha (Simulated Delay)
        await new Promise(r => setTimeout(r, 800));
        addLog('ALPHA', 'Signal extraction complete. Sentiment artifact created.', 'complete');
        
        addLog('BETA', 'Initializing Digital Twin. Ingesting psychographics...', 'pending');
        
        // Actual Gemini Call
        const result = await analyzeStartupData(inputText, fileData);
        
        addLog('BETA', 'Digital Twin constructed. State locked.', 'complete');
        addLog('GAMMA', 'Running 10,000 Monte Carlo iterations...', 'pending');
        
        // Simulating calc time
        await new Promise(r => setTimeout(r, 1200));
        addLog('GAMMA', 'Stress tests complete. 3 Black Swan scenarios modeled.', 'complete');
        
        addLog('DELTA', 'Generating Risk Tornado & Financial Audit...', 'pending');
        await new Promise(r => setTimeout(r, 600));
        
        setAnalysis(result);
        addLog('DELTA', 'Audit complete. Risk Artifacts generated.', 'complete');

    } catch (error) {
        console.error(error);
        addLog('ALPHA', 'CRITICAL ERROR during intelligence gathering.', 'error');
    } finally {
        setIsAnalyzing(false);
    }
  };

  // Drag and Drop Handlers
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
    }
  };

  // Check for API Key on mount
  useEffect(() => {
    if (!process.env.API_KEY) {
        setApiKeyMissing(true);
    }
  }, []);

  // Prepare Radar Data
  const radarData = [
    { subject: 'Resilience', A: analysis.founderMetrics.resilienceScore, fullMark: 100 },
    { subject: 'Tech Moat', A: analysis.founderMetrics.technicalMoatScore, fullMark: 100 },
    { subject: 'Recruiting', A: analysis.founderMetrics.recruitingAbility, fullMark: 100 },
    { subject: 'Flexibility', A: analysis.founderMetrics.cognitiveFlexibility, fullMark: 100 },
  ];

  return (
    <div className="flex bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
        
        {/* Header / Input Section */}
        <header className="mb-8">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Command Center</h2>
                    <p className="text-slate-400">Enter startup data (Pitch Deck text, LinkedIn Bio, or GitHub Readme)</p>
                </div>
                {apiKeyMissing && (
                   <div className="px-4 py-2 bg-rose-500/10 border border-rose-500 text-rose-500 rounded text-sm font-bold animate-pulse">
                     MISSING API KEY IN ENV
                   </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-64">
                <div 
                    className={`lg:col-span-2 relative h-64 lg:h-full border-2 border-dashed rounded-lg transition-all duration-200 ${
                        isDragging 
                        ? 'border-cyan-500 bg-cyan-900/10' 
                        : 'border-slate-800 bg-slate-900'
                    }`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    {/* File Attachment Pill */}
                    {selectedFile && (
                        <div className="absolute top-3 left-3 right-3 z-10 flex items-center bg-slate-800 rounded p-2 border border-slate-700 animate-fade-in-up">
                            <FileText className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                            <span className="text-xs text-slate-200 truncate flex-1 font-mono">{selectedFile.name}</span>
                            <button 
                                onClick={() => setSelectedFile(null)} 
                                className="text-slate-500 hover:text-white transition-colors p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    <textarea
                        className={`w-full h-full bg-transparent p-4 text-sm font-mono focus:outline-none resize-none transition-all ${selectedFile ? 'pt-16' : ''}`}
                        placeholder={selectedFile ? "Add specific questions or context about the file..." : "Drag & drop pitch deck (PDF) here, or type raw data..."}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={isAnalyzing}
                    />

                    {/* Manual Upload Trigger */}
                    <div className="absolute bottom-4 left-4 z-20">
                        <input 
                            type="file" 
                            id="file-upload" 
                            className="hidden" 
                            onChange={onFileSelect} 
                            accept=".pdf,image/*,text/*"
                            disabled={isAnalyzing} 
                        />
                        <label 
                            htmlFor="file-upload" 
                            className={`cursor-pointer flex items-center space-x-2 text-xs font-bold transition-colors ${isAnalyzing ? 'text-slate-600' : 'text-slate-500 hover:text-cyan-400'}`}
                        >
                            <Upload className="w-4 h-4" />
                            <span>ATTACH FILE</span>
                        </label>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || apiKeyMissing || (!inputText.trim() && !selectedFile)}
                        className={`absolute bottom-4 right-4 px-6 py-2 rounded-md font-bold text-sm shadow-lg flex items-center space-x-2 transition-all z-20 ${
                            isAnalyzing || (!inputText.trim() && !selectedFile)
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                            : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:shadow-cyan-500/20'
                        }`}
                    >
                        {isAnalyzing ? <RotateCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        <span>{isAnalyzing ? 'PROCESSING...' : 'INITIATE SEQUENCE'}</span>
                    </button>
                </div>
                <div className="lg:col-span-1 h-48 lg:h-full">
                    <AgentTerminal logs={logs} />
                </div>
            </div>
        </header>

        {/* Dashboard Content */}
        {analysis.investmentThesis !== "Pending Analysis..." && (
            <div className="space-y-6 animate-fade-in-up">
                
                {/* Top Row: Thesis & Bear Case */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/50 border border-emerald-500/30 p-6 rounded-lg relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                        <h3 className="text-emerald-400 font-bold mb-3 flex items-center">
                            <Target className="w-4 h-4 mr-2" /> INVESTMENT THESIS
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed">{analysis.investmentThesis}</p>
                    </div>
                    <div className="bg-slate-900/50 border border-rose-500/30 p-6 rounded-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                        <h3 className="text-rose-400 font-bold mb-3 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2" /> BEAR CASE
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed">{analysis.bearCase}</p>
                    </div>
                </div>

                {/* Middle Row: Agent Modules */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    
                    {/* Agent Alpha: Founder */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-white flex items-center"><Users className="w-4 h-4 mr-2 text-cyan-500"/> FOUNDER PSYCHOGRAPHICS</h4>
                        </div>
                        <div className="h-64 -ml-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#334155" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                                    <Radar name="Founder" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-auto">
                            <h5 className="text-xs font-bold text-slate-500 mb-2">HIGH AGENCY SIGNALS</h5>
                            <ul className="space-y-1">
                                {analysis.founderMetrics.highAgencySignal.map((sig, i) => (
                                    <li key={i} className="text-xs text-cyan-300 flex items-start">
                                        <span className="mr-2 text-cyan-600">▹</span> {sig}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Agent Delta: Risk Tornado */}
                    <div className="xl:col-span-2">
                        <RiskTornado data={analysis.riskTornado} />
                    </div>
                </div>

                {/* Bottom Row: Simulations & Financials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Financial Benchmark */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
                         <h4 className="font-bold text-white mb-4 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-emerald-500"/> FINANCIAL HEALTH</h4>
                         <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                                <span className="text-sm text-slate-400">Burn Multiple</span>
                                <span className={`font-mono font-bold ${analysis.financials.burnMultiple > 2 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                    {analysis.financials.burnMultiple.toFixed(2)}x
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                                <span className="text-sm text-slate-400">Rule of 40</span>
                                <span className={`font-mono font-bold ${analysis.financials.ruleOf40 < 40 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                    {analysis.financials.ruleOf40}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                                <span className="text-sm text-slate-400">Valuation</span>
                                <span className="font-mono font-bold text-cyan-400">{analysis.financials.valuationStatus}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">Est. Runway</span>
                                <span className="font-mono font-bold text-white">{analysis.financials.runwayMonths} Months</span>
                            </div>
                         </div>
                    </div>

                     {/* Simulations */}
                     <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 md:col-span-2">
                        <h4 className="font-bold text-white mb-4 flex items-center"><Cpu className="w-4 h-4 mr-2 text-amber-500"/> MONTE CARLO SCENARIOS (n=10,000)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {analysis.simulations.map((sim, idx) => (
                                <div key={idx} className="bg-slate-950 p-4 rounded border border-slate-800 relative group hover:border-slate-600 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase">{sim.name}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded ${
                                            sim.outcome === 'Survive' ? 'bg-emerald-500/20 text-emerald-500' : 
                                            sim.outcome === 'Collapse' ? 'bg-rose-500/20 text-rose-500' : 'bg-amber-500/20 text-amber-500'
                                        }`}>
                                            {sim.outcome}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-mono font-bold text-white mb-1">{sim.survivalRate}%</div>
                                    <div className="text-[10px] text-slate-500">Survival Probability</div>
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                     </div>
                </div>

                {/* Truth Seeker Questions */}
                <div className="bg-amber-950/20 border border-amber-900/50 p-6 rounded-lg">
                    <h3 className="text-amber-500 font-bold mb-4 flex items-center">
                        <Brain className="w-4 h-4 mr-2" /> THE "TRUTH-SEEKER" INTERROGATION
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {analysis.truthSeekerQuestions.map((q, i) => (
                            <div key={i} className="flex items-start">
                                <span className="text-amber-700 font-mono mr-3 text-lg">0{i+1}</span>
                                <p className="text-amber-100/80 text-sm italic">"{q}"</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Footer/Confidence */}
                <div className="flex justify-between items-center text-xs text-slate-600 font-mono mt-8 border-t border-slate-800 pt-4">
                     <div className="flex space-x-4">
                        <span>CONFIDENCE_INTERVAL: {(analysis.confidenceIntervals.exitProbability).toFixed(1)}%</span>
                        <span>MODEL_VERSION: NEXUS-9.4.2</span>
                     </div>
                     <div className="flex items-center">
                        <Lock className="w-3 h-3 mr-1" /> ENCRYPTED :: TIER-1 CLEARANCE
                     </div>
                </div>

            </div>
        )}
      </main>
    </div>
  );
};

export default App;