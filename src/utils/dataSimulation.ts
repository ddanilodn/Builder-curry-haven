import {
  MarketIndicator,
  OptionsData,
  VolumeAlert,
  CorrelationData,
  MacroEvent,
  NewsItem,
  DocumentAnalysis,
  StrategyRecommendation,
  TacticalAlert,
} from "@/types/market";
import {
  IntelligenceSignal,
  VolumeAnalysis,
  DocumentSentiment,
  NarrativeAnalysis,
  MicrostructureData,
  AIAnalysisOutput,
  ThesisData,
  VolatilityProfile,
} from "@/types/intelligence";

/**
 * Generate realistic market indicators with some variation
 */
export function generateMarketIndicators(): MarketIndicator[] {
  const baseIndicators = [
    {
      name: "DI Futuro",
      symbol: "DI1F26",
      value: "11.745%",
      change: "+0.12%",
      trend: "up" as const,
    },
    {
      name: "Dólar",
      symbol: "USD/BRL",
      value: "5.4230",
      change: "-0.08%",
      trend: "down" as const,
    },
    {
      name: "VIX",
      symbol: "CBOE",
      value: "18.45",
      change: "+2.34%",
      trend: "up" as const,
    },
    {
      name: "IBOV",
      symbol: "IBOVESPA",
      value: "134,887",
      change: "+0.67%",
      trend: "up" as const,
    },
    {
      name: "S&P 500",
      symbol: "SPX",
      value: "4,756.50",
      change: "+0.23%",
      trend: "up" as const,
    },
    {
      name: "Brent",
      symbol: "BRENT",
      value: "$74.32",
      change: "-1.12%",
      trend: "down" as const,
    },
    {
      name: "Bitcoin",
      symbol: "BTC/USD",
      value: "$43,245",
      change: "+3.45%",
      trend: "up" as const,
    },
    {
      name: "Ouro",
      symbol: "GOLD",
      value: "$2,023.45",
      change: "+0.89%",
      trend: "up" as const,
    },
  ];

  return baseIndicators.map((indicator) => ({
    ...indicator,
    timestamp: new Date(),
  }));
}

/**
 * Generate tactical alerts with varying priorities
 */
export function generateTacticalAlerts(): TacticalAlert[] {
  const alerts = [
    {
      id: "1",
      type: "macro",
      title: "Evento Macro Iminente",
      description: "FOMC em 48h - Volatilidade implícita subindo +15%",
      priority: "high" as const,
      source: "Fed Calendar",
      actionRequired: true,
      relatedSymbols: ["SPX", "DXY", "IBOV"],
    },
    {
      id: "2",
      type: "volume",
      title: "Volume Anômalo Detectado",
      description: "PETR4 Call 28.75 19/07 - Volume +340% acima da média",
      priority: "high" as const,
      source: "Options Scanner",
      actionRequired: true,
      relatedSymbols: ["PETR4"],
    },
    {
      id: "3",
      type: "correlation",
      title: "Quebra de Correlação",
      description: "USDBRL vs DI - Desvio de 2.3 sigmas",
      priority: "medium" as const,
      source: "Correlation Monitor",
      actionRequired: false,
      relatedSymbols: ["USD/BRL", "DI1F26"],
    },
    {
      id: "4",
      type: "narrative",
      title: "Sentimento Divergente",
      description:
        "VALE3 vs Minério de Ferro - Narrativa pública vs fundamentos",
      priority: "medium" as const,
      source: "Sentiment Analysis",
      actionRequired: false,
      relatedSymbols: ["VALE3"],
    },
    {
      id: "5",
      type: "volatility",
      title: "Compressão de Volatilidade",
      description: "VIX no 15º percentil histórico - Setup para expansão",
      priority: "low" as const,
      source: "Vol Monitor",
      actionRequired: false,
      relatedSymbols: ["VIX", "SPX"],
    },
  ];

  return alerts.map((alert) => ({
    ...alert,
    timestamp: new Date(Date.now() - Math.random() * 3600000), // Random time in last hour
  }));
}

/**
 * Generate volume analysis data
 */
export function generateVolumeAnalysis(): VolumeAnalysis {
  return {
    optionsActivity: [
      {
        symbol: "PETR4",
        unusualActivity: true,
        volumeRatio: 3.4,
        putCallRatio: 0.75,
        largeBlocks: true,
      },
      {
        symbol: "VALE3",
        unusualActivity: false,
        volumeRatio: 1.2,
        putCallRatio: 1.1,
        largeBlocks: false,
      },
      {
        symbol: "ITUB4",
        unusualActivity: true,
        volumeRatio: 2.8,
        putCallRatio: 1.45,
        largeBlocks: true,
      },
    ],
    institutionalFlow: {
      direction: "bearish",
      confidence: 73,
      volume: 45000000,
    },
    darkPoolActivity: {
      detected: true,
      estimatedSize: 2500000,
      direction: "accumulation",
    },
  };
}

/**
 * Generate document sentiment analysis
 */
export function generateDocumentAnalysis(): DocumentSentiment[] {
  return [
    {
      source: "Ata COPOM",
      sentiment: -0.3,
      keyTerms: [
        "cenário prospectivo",
        "cautela",
        "volatilidade externa",
        "incertezas",
      ],
      riskIndicators: ["inflação persistente", "câmbio volátil"],
      confidenceLevel: 0.87,
      emotionalTone: "defensive",
    },
    {
      source: "Petrobrás Earnings Call",
      sentiment: 0.2,
      keyTerms: [
        "cash flow robusto",
        "disciplina capital",
        "dividendos",
        "produção",
      ],
      riskIndicators: ["volatilidade do petróleo", "políticas governamentais"],
      confidenceLevel: 0.92,
      emotionalTone: "neutral",
    },
    {
      source: "Fed Minutes",
      sentiment: -0.45,
      keyTerms: [
        "data dependent",
        "restrictive policy",
        "inflation concerns",
        "employment",
      ],
      riskIndicators: ["persistent inflation", "financial stability"],
      confidenceLevel: 0.89,
      emotionalTone: "defensive",
    },
  ];
}

/**
 * Generate narrative analysis data
 */
export function generateNarrativeAnalysis(): NarrativeAnalysis {
  return {
    socialSentiment: [
      {
        platform: "Twitter",
        mentions: 12500,
        sentiment: -0.2,
        trending: true,
      },
      {
        platform: "Reddit",
        mentions: 3400,
        sentiment: -0.35,
        trending: false,
      },
      {
        platform: "LinkedIn",
        mentions: 890,
        sentiment: 0.1,
        trending: false,
      },
    ],
    mediaAnalysis: {
      headlineCount: 47,
      averageSentiment: -0.15,
      emergingNarratives: [
        "Recessão global iminente",
        "Petróleo descolado de fundamentals",
        "Fed pivot em 2024",
      ],
    },
    searchTrends: [
      { term: "recessão", change: 45, volume: 15600 },
      { term: "inflação", change: -12, volume: 8900 },
      { term: "juros altos", change: 23, volume: 5400 },
    ],
  };
}

/**
 * Generate microstructure analysis
 */
export function generateMicrostructureData(): MicrostructureData {
  return {
    orderFlow: {
      direction: "selling",
      pressure: 0.67,
      size: "institutional",
    },
    deltaFlow: {
      gamma: -2400000,
      vanna: 890000,
      charm: -450000,
      direction: "negative",
    },
    hiddenLiquidity: {
      detected: true,
      estimatedSize: 15000000,
      type: "iceberg",
    },
  };
}

/**
 * Generate correlation data
 */
export function generateCorrelationData(): CorrelationData[] {
  return [
    {
      asset1: "PETR4",
      asset2: "Brent Oil",
      currentCorrelation: 0.12,
      historicalCorrelation: 0.84,
      deviation: -3.2,
      timeframe: "30d",
      significance: 0.99,
    },
    {
      asset1: "USD/BRL",
      asset2: "DI Futuro",
      currentCorrelation: 0.67,
      historicalCorrelation: 0.92,
      deviation: -2.8,
      timeframe: "30d",
      significance: 0.95,
    },
    {
      asset1: "IBOV",
      asset2: "S&P 500",
      currentCorrelation: 0.45,
      historicalCorrelation: 0.76,
      deviation: -2.1,
      timeframe: "30d",
      significance: 0.87,
    },
    {
      asset1: "VALE3",
      asset2: "Iron Ore",
      currentCorrelation: 0.23,
      historicalCorrelation: 0.88,
      deviation: -4.1,
      timeframe: "30d",
      significance: 0.99,
    },
  ];
}

/**
 * Generate volatility profile
 */
export function generateVolatilityProfile(): VolatilityProfile {
  return {
    underlying: "PETR4",
    termStructure: [
      { term: "1W", vol: 28.5, percentile: 25 },
      { term: "1M", vol: 24.2, percentile: 15 },
      { term: "3M", vol: 21.8, percentile: 12 },
      { term: "6M", vol: 25.1, percentile: 35 },
      { term: "1Y", vol: 31.4, percentile: 67 },
    ],
    skew: [
      { strike: 26, vol: 32.1, delta: -0.75 },
      { strike: 27, vol: 28.5, delta: -0.45 },
      { strike: 28, vol: 24.2, delta: -0.12 },
      { strike: 29, vol: 25.8, delta: 0.23 },
      { strike: 30, vol: 29.3, delta: 0.45 },
    ],
    surface: [
      {
        expiry: new Date("2024-07-19"),
        strikes: [26, 27, 28, 29, 30],
        vols: [32.1, 28.5, 24.2, 25.8, 29.3],
      },
    ],
    regime: "low",
  };
}

/**
 * Generate strategy recommendations
 */
export function generateStrategyRecommendations(): StrategyRecommendation[] {
  return [
    {
      id: "1",
      type: "straddle",
      underlying: "PETR4",
      description: "Long Straddle 28.75 - Volatilidade comprimida",
      reasoning:
        "IV no 15º percentil + evento macro próximo + volume anômalo detectado",
      confidence: 87,
      riskReward: 3.2,
      maxLoss: -2450,
      maxGain: Number.POSITIVE_INFINITY,
      breakevens: [26.25, 31.25],
      legs: [
        {
          action: "buy",
          type: "call",
          strike: 28.75,
          expiry: new Date("2024-07-19"),
          quantity: 1,
          price: 1.25,
        },
        {
          action: "buy",
          type: "put",
          strike: 28.75,
          expiry: new Date("2024-07-19"),
          quantity: 1,
          price: 1.2,
        },
      ],
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "iron_condor",
      underlying: "IBOV",
      description: "Iron Condor 134000-136000 - Range definido",
      reasoning:
        "Confluência de suportes/resistências + baixa volatilidade esperada",
      confidence: 73,
      riskReward: 2.1,
      maxLoss: -1800,
      maxGain: 1200,
      breakevens: [134300, 135700],
      legs: [
        {
          action: "sell",
          type: "put",
          strike: 134000,
          expiry: new Date("2024-07-26"),
          quantity: 1,
          price: 600,
        },
        {
          action: "buy",
          type: "put",
          strike: 133000,
          expiry: new Date("2024-07-26"),
          quantity: 1,
          price: 200,
        },
        {
          action: "sell",
          type: "call",
          strike: 136000,
          expiry: new Date("2024-07-26"),
          quantity: 1,
          price: 650,
        },
        {
          action: "buy",
          type: "call",
          strike: 137000,
          expiry: new Date("2024-07-26"),
          quantity: 1,
          price: 250,
        },
      ],
      timestamp: new Date(),
    },
  ];
}

/**
 * Generate news items
 */
export function generateNewsItems(): NewsItem[] {
  return [
    {
      id: "1",
      title: "Fed Sinaliza Possível Pausa na Alta de Juros",
      summary:
        "Membros do Federal Reserve indicam que podem pausar o ciclo de aperto monetário na próxima reunião.",
      timestamp: new Date(Date.now() - 1800000), // 30 min ago
      source: "Reuters",
      sentiment: "positive",
      impact: "high",
      keywords: ["Fed", "juros", "política monetária"],
      affectedSymbols: ["SPX", "DXY", "IBOV"],
      confidence: 0.89,
    },
    {
      id: "2",
      title: "Petróleo Cai com Aumento de Estoques nos EUA",
      summary:
        "Preços do petróleo recuam após relatório do DoE mostrar aumento inesperado nos estoques.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      source: "Bloomberg",
      sentiment: "negative",
      impact: "medium",
      keywords: ["petróleo", "estoques", "energia"],
      affectedSymbols: ["BRENT", "PETR4"],
      confidence: 0.92,
    },
    {
      id: "3",
      title: "Copom Mantém Selic em 11,75% com Viés Estável",
      summary:
        "Banco Central mantém taxa básica de juros e sinaliza cenário de estabilidade para próximas reuniões.",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      source: "Valor Econômico",
      sentiment: "neutral",
      impact: "high",
      keywords: ["Copom", "Selic", "juros"],
      affectedSymbols: ["DI1F26", "IBOV", "USD/BRL"],
      confidence: 0.95,
    },
  ];
}

/**
 * Generate AI analysis output
 */
export function generateAIAnalysis(): AIAnalysisOutput {
  return {
    summary:
      "Mercado apresenta sinais mistos com volatilidade comprimida e posicionamento defensivo institucional. Correlações históricas quebradas indicam regime de incerteza.",
    keyInsights: [
      "VIX no 15º percentil histórico sugere complacência excessiva",
      "Volume anômalo em PETR4 calls indica expectativa de movimento",
      "Quebra de correlação USDBRL/DI sinaliza stress cambial",
      "Fed pivot probability aumentando baseado em forward guidance",
    ],
    riskFactors: [
      "Volatilidade comprimida pode explodir rapidamente",
      "Posicionamento crowded em algumas posições",
      "Risco geopolítico não precificado",
      "Liquidez reduzida em alguns mercados",
    ],
    opportunities: [
      "Long volatilidade via straddles baratos",
      "Pair trades em correlações quebradas",
      "Proteção via puts OTM",
      "Calendar spreads em estrutura de vol invertida",
    ],
    recommendations: [
      "Manter 15-20% da carteira em proteção",
      "Evitar vendas descobertas de volatilidade",
      "Monitorar ruptura de suportes técnicos",
      "Preparar para cenários de stress",
    ],
    confidence: 78,
    reasoning:
      "Análise baseada em confluência de sinais técnicos, posicionamento institucional e eventos macro. Incerteza elevada justifica postura defensiva.",
    nextSteps: [
      "Monitora volume de opções pré-FOMC",
      "Acompanha dados de emprego americano",
      "Observa ruptura de correlações históricas",
      "Avalia impacto de earnings season",
    ],
  };
}

/**
 * Generate thesis data
 */
export function generateThesesData(): ThesisData[] {
  return [
    {
      id: "1",
      title: "Convergência Fed Pivot",
      description:
        "Sinais crescentes de que Fed pode pausar ciclo de alta, criando rally de risco",
      confidence: 87,
      frequency: 12,
      lastDetected: new Date(Date.now() - 1200000), // 20 min ago
      historicalAccuracy: 73,
      relatedSignals: [],
      status: "active",
    },
    {
      id: "2",
      title: "Petróleo Descolado",
      description:
        "Preço do petróleo divorciado de fundamentals, criando oportunidade em energy stocks",
      confidence: 73,
      frequency: 8,
      lastDetected: new Date(Date.now() - 900000), // 15 min ago
      historicalAccuracy: 68,
      relatedSignals: [],
      status: "active",
    },
    {
      id: "3",
      title: "Vol Term Structure",
      description:
        "Estrutura temporal de volatilidade invertida sugere mean reversion",
      confidence: 91,
      frequency: 15,
      lastDetected: new Date(Date.now() - 480000), // 8 min ago
      historicalAccuracy: 84,
      relatedSignals: [],
      status: "active",
    },
  ];
}

/**
 * Generate volume alerts
 */
export function generateVolumeAlerts(): VolumeAlert[] {
  return [
    {
      symbol: "PETR4",
      type: "call",
      strike: 28.75,
      expiry: new Date("2024-07-19"),
      currentVolume: 45000,
      averageVolume: 12000,
      volumeRatio: 3.75,
      impliedMove: 8.5,
      confidence: 89,
      timestamp: new Date(),
    },
    {
      symbol: "VALE3",
      type: "put",
      strike: 68,
      expiry: new Date("2024-08-16"),
      currentVolume: 28000,
      averageVolume: 8500,
      volumeRatio: 3.29,
      impliedMove: 6.2,
      confidence: 76,
      timestamp: new Date(),
    },
  ];
}

/**
 * Simulate real-time data updates
 */
export function simulateDataUpdate<T>(
  data: T,
  updateProbability: number = 0.3,
): T {
  if (Math.random() > updateProbability) return data;

  // Create shallow copy and modify timestamps
  const updated = { ...data };

  if (updated && typeof updated === "object" && "timestamp" in updated) {
    (updated as any).timestamp = new Date();
  }

  return updated;
}
