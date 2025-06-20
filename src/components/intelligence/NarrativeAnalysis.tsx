import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, Search, Play, MessageSquare } from "lucide-react";
import { useIntelligence } from "@/hooks/useIntelligence";

const NarrativeAnalysis = () => {
  const { narrativeAnalysis, isLoading, runAnalysis } = useIntelligence();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleAnalyze = async () => {
    await runAnalysis("narrative");
    setLastUpdate(new Date());
  };

  useEffect(() => {
    // Auto-refresh every 3 minutes
    const interval = setInterval(() => {
      if (!isLoading.narrative) {
        handleAnalyze();
      }
    }, 180000);

    return () => clearInterval(interval);
  }, [isLoading.narrative]);

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.2) return "text-terminal-green";
    if (sentiment < -0.2) return "text-terminal-red";
    return "text-terminal-orange";
  };

  const getSentimentBg = (sentiment: number) => {
    if (sentiment > 0.2) return "bg-terminal-green/20 border-terminal-green";
    if (sentiment < -0.2) return "bg-terminal-red/20 border-terminal-red";
    return "bg-terminal-orange/20 border-terminal-orange";
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return "🐦";
      case "reddit":
        return "📺";
      case "linkedin":
        return "💼";
      case "youtube":
        return "📹";
      default:
        return "💬";
    }
  };

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-terminal-blue" />
            <CardTitle className="text-terminal-text font-mono text-lg">
              ANÁLISE DE NARRATIVA PÚBLICA
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLoading.narrative
                  ? "bg-terminal-orange animate-pulse"
                  : "bg-terminal-green"
              }`}
            />
            <span className="text-terminal-text-muted font-mono text-xs">
              {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>
        <CardDescription className="text-terminal-text-muted font-mono text-sm">
          Monitora sentimento público e narrativas emergentes em redes sociais
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading.narrative}
            className="bg-terminal-blue hover:bg-terminal-blue/80 text-white font-mono text-xs"
            size="sm"
          >
            <Play className="w-3 h-3 mr-1" />
            {isLoading.narrative ? "Analisando..." : "Analisar Narrativas"}
          </Button>
          <div className="flex items-center space-x-2 text-terminal-text-muted font-mono text-xs">
            <MessageSquare className="w-3 h-3" />
            <span>Social Listening Ativo</span>
          </div>
        </div>

        {/* Narrative Analysis Results */}
        {narrativeAnalysis && (
          <>
            {/* Social Sentiment Overview */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <h4 className="text-terminal-text font-mono text-sm font-semibold mb-3">
                SENTIMENTO POR PLATAFORMA
              </h4>
              <div className="space-y-3">
                {narrativeAnalysis.socialSentiment.map((platform, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {getPlatformIcon(platform.platform)}
                        </span>
                        <span className="text-terminal-text font-mono text-sm">
                          {platform.platform}
                        </span>
                        {platform.trending && (
                          <Badge className="bg-terminal-orange text-white font-mono text-xs">
                            TRENDING
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-terminal-text-muted font-mono text-xs">
                          {platform.mentions.toLocaleString()} menções
                        </span>
                        <span
                          className={`font-mono text-sm ${getSentimentColor(platform.sentiment)}`}
                        >
                          {platform.sentiment > 0 ? "+" : ""}
                          {platform.sentiment.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={(platform.sentiment + 1) * 50}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Media Analysis */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <h4 className="text-terminal-text font-mono text-sm font-semibold mb-3">
                ANÁLISE DE MÍDIA
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-terminal-text-muted font-mono text-xs">
                    Total de Manchetes:
                  </span>
                  <br />
                  <span className="text-terminal-text font-mono text-lg">
                    {narrativeAnalysis.mediaAnalysis.headlineCount}
                  </span>
                </div>
                <div>
                  <span className="text-terminal-text-muted font-mono text-xs">
                    Sentimento Médio:
                  </span>
                  <br />
                  <span
                    className={`font-mono text-lg ${getSentimentColor(narrativeAnalysis.mediaAnalysis.averageSentiment)}`}
                  >
                    {narrativeAnalysis.mediaAnalysis.averageSentiment > 0
                      ? "+"
                      : ""}
                    {narrativeAnalysis.mediaAnalysis.averageSentiment.toFixed(
                      2,
                    )}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="text-terminal-text-muted font-mono text-xs mb-2">
                  NARRATIVAS EMERGENTES:
                </h5>
                <div className="space-y-1">
                  {narrativeAnalysis.mediaAnalysis.emergingNarratives.map(
                    (narrative, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded border font-mono text-xs ${getSentimentBg(narrativeAnalysis.mediaAnalysis.averageSentiment)}`}
                      >
                        📊 {narrative}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Search Trends */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Search className="w-4 h-4 text-terminal-blue" />
                <h4 className="text-terminal-text font-mono text-sm font-semibold">
                  TENDÊNCIAS DE BUSCA
                </h4>
              </div>
              <div className="space-y-2">
                {narrativeAnalysis.searchTrends.map((trend, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-terminal-surface border border-terminal-border rounded p-2"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-terminal-text font-mono text-sm">
                        "{trend.term}"
                      </span>
                      <Badge
                        className={`font-mono text-xs ${
                          trend.change > 0
                            ? "bg-terminal-green text-white"
                            : trend.change < 0
                              ? "bg-terminal-red text-white"
                              : "bg-terminal-gray text-white"
                        }`}
                      >
                        {trend.change > 0 ? "+" : ""}
                        {trend.change}%
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      {trend.change > 0 ? (
                        <TrendingUp className="w-3 h-3 text-terminal-green" />
                      ) : (
                        <TrendingUp className="w-3 h-3 text-terminal-red rotate-180" />
                      )}
                      <span className="text-terminal-text-muted font-mono text-xs">
                        {trend.volume.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Insights */}
            <div className="bg-terminal-bg border border-terminal-blue rounded p-4">
              <h4 className="text-terminal-blue font-mono text-sm font-semibold mb-2">
                INSIGHTS PRINCIPAIS
              </h4>
              <div className="space-y-2 text-xs font-mono">
                {narrativeAnalysis.mediaAnalysis.averageSentiment < -0.3 && (
                  <div className="text-terminal-red">
                    ⚠️ Sentimento geral muito negativo detectado na mídia
                  </div>
                )}
                {narrativeAnalysis.socialSentiment.some((p) => p.trending) && (
                  <div className="text-terminal-orange">
                    🔥 Tópicos em alta nas redes sociais - possível volatilidade
                  </div>
                )}
                {narrativeAnalysis.searchTrends.some((t) => t.change > 40) && (
                  <div className="text-terminal-green">
                    📈 Picos de busca significativos detectados
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Loading State */}
        {isLoading.narrative && (
          <div className="flex items-center justify-center py-8 space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-terminal-text font-mono text-sm">
              Analisando narrativas...
            </span>
          </div>
        )}

        {/* Empty State */}
        {!narrativeAnalysis && !isLoading.narrative && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-terminal-gray mx-auto mb-4" />
            <div className="text-terminal-text-muted font-mono text-sm">
              Execute análise para detectar narrativas emergentes
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NarrativeAnalysis;
