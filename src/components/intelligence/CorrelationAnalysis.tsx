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
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Play,
  Target,
  Zap,
} from "lucide-react";
import { useIntelligence } from "@/hooks/useIntelligence";

const CorrelationAnalysis = () => {
  const { correlationData, isLoading, runAnalysis } = useIntelligence();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleAnalyze = async () => {
    await runAnalysis("correlation");
    setLastUpdate(new Date());
  };

  useEffect(() => {
    // Auto-refresh every 2 minutes
    const interval = setInterval(() => {
      if (!isLoading.correlation) {
        handleAnalyze();
      }
    }, 120000);

    return () => clearInterval(interval);
  }, [isLoading.correlation]);

  const getDeviationSeverity = (deviation: number) => {
    const absDeviation = Math.abs(deviation);
    if (absDeviation > 3) return { level: "EXTREMO", color: "bg-terminal-red" };
    if (absDeviation > 2) return { level: "ALTO", color: "bg-terminal-orange" };
    if (absDeviation > 1)
      return { level: "MODERADO", color: "bg-terminal-blue" };
    return { level: "NORMAL", color: "bg-terminal-gray" };
  };

  const getCorrelationColor = (correlation: number) => {
    const abs = Math.abs(correlation);
    if (abs > 0.8) return "text-terminal-green";
    if (abs > 0.5) return "text-terminal-blue";
    if (abs > 0.3) return "text-terminal-orange";
    return "text-terminal-red";
  };

  const getSignificanceIcon = (significance: number) => {
    if (significance > 0.99)
      return <Zap className="w-4 h-4 text-terminal-red" />;
    if (significance > 0.95)
      return <AlertTriangle className="w-4 h-4 text-terminal-orange" />;
    return <Target className="w-4 h-4 text-terminal-blue" />;
  };

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-terminal-blue" />
            <CardTitle className="text-terminal-text font-mono text-lg">
              DISSONÂNCIA DE ATIVOS CORRELATOS
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLoading.correlation
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
          Detecta quebras de correlação histórica entre ativos relacionados
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading.correlation}
            className="bg-terminal-blue hover:bg-terminal-blue/80 text-white font-mono text-xs"
            size="sm"
          >
            <Play className="w-3 h-3 mr-1" />
            {isLoading.correlation ? "Calculando..." : "Analisar Correlações"}
          </Button>
          <div className="flex items-center space-x-2 text-terminal-text-muted font-mono text-xs">
            <Target className="w-3 h-3" />
            <span>
              {correlationData.filter((c) => Math.abs(c.deviation) > 2).length}{" "}
              quebras significativas
            </span>
          </div>
        </div>

        {/* Correlation Analysis Results */}
        {correlationData.length > 0 && (
          <div className="space-y-4">
            {/* Significant Breaks */}
            <div className="space-y-3">
              <h4 className="text-terminal-text font-mono text-sm font-semibold">
                QUEBRAS DE CORRELAÇÃO DETECTADAS
              </h4>
              {correlationData
                .filter((corr) => Math.abs(corr.deviation) > 1.5)
                .sort((a, b) => Math.abs(b.deviation) - Math.abs(a.deviation))
                .map((corr, index) => {
                  const severity = getDeviationSeverity(corr.deviation);
                  return (
                    <div
                      key={index}
                      className="bg-terminal-bg border border-terminal-border rounded p-4 hover:border-terminal-blue transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <h5 className="text-terminal-text font-mono text-sm font-semibold">
                            {corr.asset1} × {corr.asset2}
                          </h5>
                          <Badge
                            className={`${severity.color} text-white font-mono text-xs`}
                          >
                            {severity.level}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          {corr.deviation < 0 ? (
                            <TrendingDown className="w-4 h-4 text-terminal-red" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-terminal-green" />
                          )}
                          <span className="text-terminal-text font-mono text-sm">
                            {corr.deviation.toFixed(1)}σ
                          </span>
                          {getSignificanceIcon(corr.significance)}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <span className="text-terminal-text-muted font-mono text-xs">
                            Correlação Histórica:
                          </span>
                          <br />
                          <span
                            className={`font-mono text-sm ${getCorrelationColor(corr.historicalCorrelation)}`}
                          >
                            {corr.historicalCorrelation.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-terminal-text-muted font-mono text-xs">
                            Correlação Atual:
                          </span>
                          <br />
                          <span
                            className={`font-mono text-sm ${getCorrelationColor(corr.currentCorrelation)}`}
                          >
                            {corr.currentCorrelation.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-terminal-text-muted font-mono text-xs">
                            Significância:
                          </span>
                          <br />
                          <span className="text-terminal-text font-mono text-sm">
                            {(corr.significance * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* Correlation Progress Bars */}
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-terminal-text-muted font-mono text-xs">
                              Histórica
                            </span>
                            <span className="text-terminal-text-muted font-mono text-xs">
                              {corr.historicalCorrelation.toFixed(2)}
                            </span>
                          </div>
                          <Progress
                            value={(corr.historicalCorrelation + 1) * 50}
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-terminal-text-muted font-mono text-xs">
                              Atual ({corr.timeframe})
                            </span>
                            <span className="text-terminal-text-muted font-mono text-xs">
                              {corr.currentCorrelation.toFixed(2)}
                            </span>
                          </div>
                          <Progress
                            value={(corr.currentCorrelation + 1) * 50}
                            className="h-2"
                          />
                        </div>
                      </div>

                      {/* Action Suggestions */}
                      {Math.abs(corr.deviation) > 2.5 && (
                        <div className="mt-3 p-2 bg-terminal-blue/10 border border-terminal-blue rounded">
                          <div className="flex items-center space-x-1 mb-1">
                            <Target className="w-3 h-3 text-terminal-blue" />
                            <span className="text-terminal-blue font-mono text-xs font-semibold">
                              SUGESTÃO TÁTICA:
                            </span>
                          </div>
                          <div className="text-terminal-text font-mono text-xs">
                            {corr.deviation < -2.5
                              ? `Pair trade: Long ${corr.asset1} / Short ${corr.asset2}`
                              : `Convergence play: Monitor reversão da correlação`}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* All Correlations Table */}
            <div className="space-y-3">
              <h4 className="text-terminal-text font-mono text-sm font-semibold">
                MATRIZ DE CORRELAÇÕES
              </h4>
              <div className="bg-terminal-bg border border-terminal-border rounded p-3">
                <div className="space-y-2">
                  {correlationData.map((corr, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-terminal-surface border border-terminal-border rounded p-2"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-terminal-text font-mono text-xs">
                          {corr.asset1} × {corr.asset2}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-terminal-text-muted font-mono text-xs">
                            Hist: {corr.historicalCorrelation.toFixed(2)}
                          </div>
                          <div className="text-terminal-text font-mono text-xs">
                            Atual: {corr.currentCorrelation.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span
                            className={`font-mono text-xs ${
                              Math.abs(corr.deviation) > 2
                                ? "text-terminal-red"
                                : Math.abs(corr.deviation) > 1
                                  ? "text-terminal-orange"
                                  : "text-terminal-gray"
                            }`}
                          >
                            {corr.deviation.toFixed(1)}σ
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading.correlation && (
          <div className="flex items-center justify-center py-8 space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-terminal-text font-mono text-sm">
              Calculando correlações...
            </span>
          </div>
        )}

        {/* Empty State */}
        {correlationData.length === 0 && !isLoading.correlation && (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-terminal-gray mx-auto mb-4" />
            <div className="text-terminal-text-muted font-mono text-sm">
              Execute análise para detectar quebras de correlação
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CorrelationAnalysis;
