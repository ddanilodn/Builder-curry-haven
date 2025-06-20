import { useState, useEffect, useCallback } from "@/react";
import {
  IntelligenceSignal,
  IntelligenceType,
  VolumeAnalysis,
  DocumentSentiment,
  NarrativeAnalysis,
  MicrostructureData,
  AIAnalysisOutput,
  ThesisData,
  VolatilityProfile,
} from "@/types/intelligence";
import {
  CorrelationData,
  StrategyRecommendation,
  NewsItem,
} from "@/types/market";
import {
  generateVolumeAnalysis,
  generateDocumentAnalysis,
  generateNarrativeAnalysis,
  generateMicrostructureData,
  generateCorrelationData,
  generateVolatilityProfile,
  generateStrategyRecommendations,
  generateNewsItems,
  generateAIAnalysis,
  generateThesesData,
} from "@/utils/dataSimulation";

export interface UseIntelligenceReturn {
  volumeAnalysis: VolumeAnalysis | null;
  documentSentiment: DocumentSentiment[];
  narrativeAnalysis: NarrativeAnalysis | null;
  microstructureData: MicrostructureData | null;
  correlationData: CorrelationData[];
  volatilityProfile: VolatilityProfile | null;
  strategies: StrategyRecommendation[];
  news: NewsItem[];
  aiAnalysis: AIAnalysisOutput | null;
  theses: ThesisData[];
  isLoading: { [key in IntelligenceType]: boolean };
  runAnalysis: (type: IntelligenceType) => Promise<void>;
  refreshAll: () => void;
}

export function useIntelligence(): UseIntelligenceReturn {
  const [volumeAnalysis, setVolumeAnalysis] = useState<VolumeAnalysis | null>(
    null,
  );
  const [documentSentiment, setDocumentSentiment] = useState<
    DocumentSentiment[]
  >([]);
  const [narrativeAnalysis, setNarrativeAnalysis] =
    useState<NarrativeAnalysis | null>(null);
  const [microstructureData, setMicrostructureData] =
    useState<MicrostructureData | null>(null);
  const [correlationData, setCorrelationData] = useState<CorrelationData[]>([]);
  const [volatilityProfile, setVolatilityProfile] =
    useState<VolatilityProfile | null>(null);
  const [strategies, setStrategies] = useState<StrategyRecommendation[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisOutput | null>(null);
  const [theses, setTheses] = useState<ThesisData[]>([]);

  const [isLoading, setIsLoading] = useState<{
    [key in IntelligenceType]: boolean;
  }>({
    volume: false,
    documents: false,
    macro: false,
    narrative: false,
    correlation: false,
    microstructure: false,
    volatility: false,
    thesis: false,
    compression: false,
    news: false,
    ai_analysis: false,
  });

  const setModuleLoading = useCallback(
    (type: IntelligenceType, loading: boolean) => {
      setIsLoading((prev) => ({
        ...prev,
        [type]: loading,
      }));
    },
    [],
  );

  const runAnalysis = useCallback(
    async (type: IntelligenceType): Promise<void> => {
      setModuleLoading(type, true);

      // Simulate analysis time
      const analysisTime = 1500 + Math.random() * 2000; // 1.5-3.5s

      return new Promise((resolve) => {
        setTimeout(() => {
          switch (type) {
            case "volume":
              setVolumeAnalysis(generateVolumeAnalysis());
              break;
            case "documents":
              setDocumentSentiment(generateDocumentAnalysis());
              break;
            case "narrative":
              setNarrativeAnalysis(generateNarrativeAnalysis());
              break;
            case "microstructure":
              setMicrostructureData(generateMicrostructureData());
              break;
            case "correlation":
              setCorrelationData(generateCorrelationData());
              break;
            case "volatility":
              setVolatilityProfile(generateVolatilityProfile());
              break;
            case "thesis":
              setStrategies(generateStrategyRecommendations());
              break;
            case "news":
              setNews(generateNewsItems());
              break;
            case "ai_analysis":
              setAiAnalysis(generateAIAnalysis());
              break;
            default:
              break;
          }

          setModuleLoading(type, false);
          resolve();
        }, analysisTime);
      });
    },
    [setModuleLoading],
  );

  const refreshAll = useCallback(() => {
    setVolumeAnalysis(generateVolumeAnalysis());
    setDocumentSentiment(generateDocumentAnalysis());
    setNarrativeAnalysis(generateNarrativeAnalysis());
    setMicrostructureData(generateMicrostructureData());
    setCorrelationData(generateCorrelationData());
    setVolatilityProfile(generateVolatilityProfile());
    setStrategies(generateStrategyRecommendations());
    setNews(generateNewsItems());
    setAiAnalysis(generateAIAnalysis());
    setTheses(generateThesesData());
  }, []);

  // Initial data load
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return {
    volumeAnalysis,
    documentSentiment,
    narrativeAnalysis,
    microstructureData,
    correlationData,
    volatilityProfile,
    strategies,
    news,
    aiAnalysis,
    theses,
    isLoading,
    runAnalysis,
    refreshAll,
  };
}
