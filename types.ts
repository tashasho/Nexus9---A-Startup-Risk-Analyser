// Data Models for Nexus-9 Engine

export enum RiskLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical"
}

export interface FounderMetrics {
  resilienceScore: number;
  technicalMoatScore: number;
  recruitingAbility: number;
  cognitiveFlexibility: number;
  highAgencySignal: string[];
}

export interface MarketTopology {
  ghostCompetitors: string[];
  categoryMaturity: "Blue Ocean" | "Red Ocean" | "Market Expansion";
  regulatoryCliff: string;
  totalAddressableMarket: string;
}

export interface Financials {
  burnMultiple: number;
  ruleOf40: number;
  valuationStatus: "Premium" | "Par" | "Discount";
  runwayMonths: number;
  ltvCacRatio: number;
}

export interface SimulationScenario {
  name: string;
  survivalRate: number;
  description: string;
  outcome: "Survive" | "Collapse" | "Pivot";
}

export interface TornadoDataPoint {
  variable: string;
  baseRunway: number;
  impactPositive: number; // e.g., +2 months
  impactNegative: number; // e.g., -4 months
  label: string;
}

export interface NexusAnalysis {
  investmentThesis: string;
  bearCase: string;
  founderMetrics: FounderMetrics;
  marketTopology: MarketTopology;
  financials: Financials;
  simulations: SimulationScenario[];
  riskTornado: TornadoDataPoint[];
  truthSeekerQuestions: string[];
  confidenceIntervals: {
    founderResilience: number;
    techMoatDurability: number;
    exitProbability: number;
  };
}

export interface AgentLog {
  id: string;
  agent: "ALPHA" | "BETA" | "GAMMA" | "DELTA";
  action: string;
  timestamp: string;
  status: "pending" | "complete" | "error";
}