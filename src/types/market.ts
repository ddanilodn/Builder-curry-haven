// Market Data Types
export interface MarketIndicator {
  name: string;
  symbol: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
  timestamp: Date;
}

export interface OptionsData {
  symbol: string;
  strike: number;
  expiry: Date;
  type: "call" | "put";
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  price: number;
  bid: number;
  ask: number;
}

export interface VolumeAlert {
  symbol: string;
  type: "call" | "put";
  strike: number;
  expiry: Date;
  currentVolume: number;
  averageVolume: number;
  volumeRatio: number;
  impliedMove: number;
  confidence: number;
  timestamp: Date;
}

export interface CorrelationData {
  asset1: string;
  asset2: string;
  currentCorrelation: number;
  historicalCorrelation: number;
  deviation: number;
  timeframe: string;
  significance: number;
}

export interface VolatilitySurface {
  underlying: string;
  expiry: Date;
  strikes: number[];
  impliedVols: number[];
  delta: number[];
  vega: number[];
}

export interface MacroEvent {
  id: string;
  title: string;
  date: Date;
  type: "monetary" | "fiscal" | "geopolitical" | "economic";
  impact: "low" | "medium" | "high";
  description: string;
  affectedAssets: string[];
  historicalImpact?: {
    asset: string;
    averageMove: number;
    direction: "up" | "down" | "mixed";
  }[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  timestamp: Date;
  source: string;
  sentiment: "positive" | "negative" | "neutral";
  impact: "low" | "medium" | "high";
  keywords: string[];
  affectedSymbols: string[];
  confidence: number;
}

export interface DocumentAnalysis {
  document: string;
  type: "earnings" | "filing" | "press_release" | "central_bank";
  sentiment: number; // -1 to 1
  keyPhrases: string[];
  riskFactors: string[];
  opportunities: string[];
  confidence: number;
  timestamp: Date;
}

export interface StrategyRecommendation {
  id: string;
  type:
    | "straddle"
    | "strangle"
    | "iron_condor"
    | "butterfly"
    | "calendar"
    | "ratio_spread"
    | "protective_put"
    | "covered_call";
  underlying: string;
  description: string;
  reasoning: string;
  confidence: number;
  riskReward: number;
  maxLoss: number;
  maxGain: number;
  breakevens: number[];
  legs: StrategyLeg[];
  timestamp: Date;
}

export interface StrategyLeg {
  action: "buy" | "sell";
  type: "call" | "put" | "stock";
  strike?: number;
  expiry?: Date;
  quantity: number;
  price: number;
}

export interface AlertLevel {
  level: "low" | "medium" | "high" | "critical";
  color: string;
  priority: number;
}

export interface TacticalAlert {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  timestamp: Date;
  source: string;
  actionRequired: boolean;
  relatedSymbols: string[];
}
