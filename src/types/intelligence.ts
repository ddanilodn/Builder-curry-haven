// Intelligence Module Types
export interface IntelligenceSignal {
  id: string;
  type: IntelligenceType;
  strength: number; // 0-100
  confidence: number; // 0-100
  description: string;
  data: any;
  timestamp: Date;
  actionable: boolean;
}

export type IntelligenceType =
  | "volume"
  | "documents"
  | "macro"
  | "narrative"
  | "correlation"
  | "microstructure"
  | "volatility"
  | "thesis"
  | "compression"
  | "news"
  | "ai_analysis";

export interface VolumeAnalysis {
  optionsActivity: {
    symbol: string;
    unusualActivity: boolean;
    volumeRatio: number;
    putCallRatio: number;
    largeBlocks: boolean;
  }[];
  institutionalFlow: {
    direction: "bullish" | "bearish" | "neutral";
    confidence: number;
    volume: number;
  };
  darkPoolActivity: {
    detected: boolean;
    estimatedSize: number;
    direction: "accumulation" | "distribution";
  };
}

export interface DocumentSentiment {
  source: string;
  sentiment: number; // -1 to 1
  keyTerms: string[];
  riskIndicators: string[];
  confidenceLevel: number;
  emotionalTone:
    | "aggressive"
    | "defensive"
    | "neutral"
    | "optimistic"
    | "pessimistic";
}

export interface NarrativeAnalysis {
  socialSentiment: {
    platform: string;
    mentions: number;
    sentiment: number;
    trending: boolean;
  }[];
  mediaAnalysis: {
    headlineCount: number;
    averageSentiment: number;
    emergingNarratives: string[];
  };
  searchTrends: {
    term: string;
    change: number;
    volume: number;
  }[];
}

export interface MicrostructureData {
  orderFlow: {
    direction: "buying" | "selling";
    pressure: number;
    size: "retail" | "institutional" | "mixed";
  };
  deltaFlow: {
    gamma: number;
    vanna: number;
    charm: number;
    direction: "positive" | "negative";
  };
  hiddenLiquidity: {
    detected: boolean;
    estimatedSize: number;
    type: "iceberg" | "stealth" | "sweeping";
  };
}

export interface AIAnalysisOutput {
  summary: string;
  keyInsights: string[];
  riskFactors: string[];
  opportunities: string[];
  recommendations: string[];
  confidence: number;
  reasoning: string;
  nextSteps: string[];
}

export interface IntelligenceModuleState {
  isActive: boolean;
  isAnalyzing: boolean;
  lastUpdate: Date;
  signals: IntelligenceSignal[];
  health: "healthy" | "warning" | "error";
  performance: {
    accuracy: number;
    responseTime: number;
    signalCount: number;
  };
}

export interface ThesisData {
  id: string;
  title: string;
  description: string;
  confidence: number;
  frequency: number;
  lastDetected: Date;
  historicalAccuracy: number;
  relatedSignals: IntelligenceSignal[];
  status: "active" | "monitoring" | "expired";
}

export interface VolatilityProfile {
  underlying: string;
  termStructure: {
    term: string;
    vol: number;
    percentile: number;
  }[];
  skew: {
    strike: number;
    vol: number;
    delta: number;
  }[];
  surface: {
    expiry: Date;
    strikes: number[];
    vols: number[];
  }[];
  regime: "low" | "normal" | "high" | "extreme";
}
