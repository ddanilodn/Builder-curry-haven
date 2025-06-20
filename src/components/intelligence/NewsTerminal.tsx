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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Newspaper,
  Clock,
  TrendingUp,
  AlertTriangle,
  Play,
  ExternalLink,
  Filter,
} from "lucide-react";
import { useIntelligence } from "@/hooks/useIntelligence";

const NewsTerminal = () => {
  const { news, isLoading, runAnalysis } = useIntelligence();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">(
    "all",
  );

  const handleAnalyze = async () => {
    await runAnalysis("news");
    setLastUpdate(new Date());
  };

  useEffect(() => {
    // Auto-refresh every 2 minutes
    const interval = setInterval(() => {
      if (!isLoading.news) {
        handleAnalyze();
      }
    }, 120000);

    return () => clearInterval(interval);
  }, [isLoading.news]);

  const filteredNews =
    filter === "all" ? news : news.filter((item) => item.impact === filter);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-terminal-green";
      case "negative":
        return "text-terminal-red";
      default:
        return "text-terminal-orange";
    }
  };

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-terminal-green/20 border-terminal-green";
      case "negative":
        return "bg-terminal-red/20 border-terminal-red";
      default:
        return "bg-terminal-orange/20 border-terminal-orange";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-terminal-red text-white";
      case "medium":
        return "bg-terminal-orange text-white";
      default:
        return "bg-terminal-gray text-white";
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h atrás`;
    if (minutes > 0) return `${minutes}m atrás`;
    return "Agora";
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "📈";
      case "negative":
        return "📉";
      default:
        return "⚖️";
    }
  };

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-terminal-blue" />
            <CardTitle className="text-terminal-text font-mono text-lg">
              TERMINAL DE NOTÍCIAS
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLoading.news
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
          Feed em tempo real de notícias com impacto econômico e geopolítico
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleAnalyze}
              disabled={isLoading.news}
              className="bg-terminal-blue hover:bg-terminal-blue/80 text-white font-mono text-xs"
              size="sm"
            >
              <Play className="w-3 h-3 mr-1" />
              {isLoading.news ? "Atualizando..." : "Atualizar Feed"}
            </Button>
            <div className="flex items-center space-x-1">
              <Filter className="w-3 h-3 text-terminal-text-muted" />
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as "all" | "high" | "medium" | "low")
                }
                className="bg-terminal-surface border border-terminal-border text-terminal-text font-mono text-xs rounded px-2 py-1"
              >
                <option value="all">Todas</option>
                <option value="high">Alto Impacto</option>
                <option value="medium">Médio Impacto</option>
                <option value="low">Baixo Impacto</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-terminal-text-muted font-mono text-xs">
            <Clock className="w-3 h-3" />
            <span>{filteredNews.length} notícias</span>
          </div>
        </div>

        {/* News Feed */}
        <ScrollArea className="h-96">
          {filteredNews.length > 0 && (
            <div className="space-y-3 pr-4">
              {filteredNews
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map((item, index) => (
                  <div
                    key={item.id}
                    className={`border rounded p-3 hover:border-terminal-blue transition-colors ${getSentimentBg(item.sentiment)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getImpactColor(item.impact)}>
                          {item.impact.toUpperCase()}
                        </Badge>
                        <Badge
                          className="bg-terminal-surface text-terminal-text border-terminal-border font-mono text-xs"
                          variant="outline"
                        >
                          {item.source}
                        </Badge>
                        <span className="text-lg">
                          {getSentimentIcon(item.sentiment)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-terminal-text-muted font-mono text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{getTimeAgo(item.timestamp)}</span>
                      </div>
                    </div>

                    <h5 className="text-terminal-text font-mono text-sm font-semibold mb-1">
                      {item.title}
                    </h5>

                    <p className="text-terminal-text-muted font-mono text-xs leading-relaxed mb-2">
                      {item.summary}
                    </p>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.keywords.slice(0, 3).map((keyword, keyIndex) => (
                        <Badge
                          key={keyIndex}
                          className="bg-terminal-blue/20 text-terminal-blue border-terminal-blue font-mono text-xs"
                          variant="outline"
                          size="sm"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>

                    {/* Affected Symbols */}
                    {item.affectedSymbols.length > 0 && (
                      <div className="mb-2">
                        <span className="text-terminal-text-muted font-mono text-xs">
                          Ativos afetados:{" "}
                        </span>
                        <span className="text-terminal-text font-mono text-xs">
                          {item.affectedSymbols.join(", ")}
                        </span>
                      </div>
                    )}

                    {/* Confidence and Sentiment */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-terminal-text-muted font-mono text-xs">
                            Confiança:
                          </span>
                          <span
                            className={`font-mono text-xs ${
                              item.confidence > 0.8
                                ? "text-terminal-green"
                                : item.confidence > 0.6
                                  ? "text-terminal-blue"
                                  : "text-terminal-orange"
                            }`}
                          >
                            {(item.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-terminal-text-muted font-mono text-xs">
                            Sentimento:
                          </span>
                          <span
                            className={`font-mono text-xs ${getSentimentColor(item.sentiment)}`}
                          >
                            {item.sentiment.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-terminal-text-muted cursor-pointer hover:text-terminal-blue" />
                    </div>

                    {/* High impact alert */}
                    {item.impact === "high" && item.confidence > 0.8 && (
                      <div className="mt-2 p-2 bg-terminal-red/10 border border-terminal-red rounded">
                        <div className="flex items-center space-x-1">
                          <AlertTriangle className="w-3 h-3 text-terminal-red" />
                          <span className="text-terminal-red font-mono text-xs">
                            ALTA RELEVÂNCIA: Impacto significativo esperado
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </ScrollArea>

        {/* News Summary */}
        {news.length > 0 && (
          <div className="bg-terminal-bg border border-terminal-border rounded p-3">
            <h4 className="text-terminal-text font-mono text-sm font-semibold mb-2">
              RESUMO DO FEED
            </h4>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-terminal-text font-mono text-lg">
                  {news.filter((n) => n.impact === "high").length}
                </div>
                <div className="text-terminal-text-muted font-mono text-xs">
                  Alto Impacto
                </div>
              </div>
              <div>
                <div className="text-terminal-green font-mono text-lg">
                  {news.filter((n) => n.sentiment === "positive").length}
                </div>
                <div className="text-terminal-text-muted font-mono text-xs">
                  Positivas
                </div>
              </div>
              <div>
                <div className="text-terminal-red font-mono text-lg">
                  {news.filter((n) => n.sentiment === "negative").length}
                </div>
                <div className="text-terminal-text-muted font-mono text-xs">
                  Negativas
                </div>
              </div>
              <div>
                <div className="text-terminal-blue font-mono text-lg">
                  {(
                    news.reduce((sum, n) => sum + n.confidence, 0) / news.length
                  ).toFixed(1)}
                </div>
                <div className="text-terminal-text-muted font-mono text-xs">
                  Conf. Média
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading.news && (
          <div className="flex items-center justify-center py-8 space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-terminal-text font-mono text-sm">
              Atualizando feed de notícias...
            </span>
          </div>
        )}

        {/* Empty State */}
        {news.length === 0 && !isLoading.news && (
          <div className="text-center py-8">
            <Newspaper className="w-12 h-12 text-terminal-gray mx-auto mb-4" />
            <div className="text-terminal-text-muted font-mono text-sm">
              Execute atualização para carregar notícias recentes
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsTerminal;
