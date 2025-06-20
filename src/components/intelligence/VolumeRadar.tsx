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
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  Play,
} from "lucide-react";
import { useIntelligence } from "@/hooks/useIntelligence";

const VolumeRadar = () => {
  const { volumeAnalysis, isLoading, runAnalysis } = useIntelligence();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleAnalyze = async () => {
    await runAnalysis("volume");
    setLastUpdate(new Date());
  };

  useEffect(() => {
    // Auto-refresh every 2 minutes
    const interval = setInterval(() => {
      if (!isLoading.volume) {
        handleAnalyze();
      }
    }, 120000);

    return () => clearInterval(interval);
  }, [isLoading.volume]);

  const getActivityLevel = (ratio: number) => {
    if (ratio > 3) return { level: "EXTREMO", color: "bg-terminal-red" };
    if (ratio > 2) return { level: "ALTO", color: "bg-terminal-orange" };
    if (ratio > 1.5) return { level: "MODERADO", color: "bg-terminal-blue" };
    return { level: "NORMAL", color: "bg-terminal-gray" };
  };

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-terminal-blue" />
            <CardTitle className="text-terminal-text font-mono text-lg">
              RADAR DE VOLUME EM OPÇÕES
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLoading.volume
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
          Detecta movimentos anômalos de volume indicando entrada institucional
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading.volume}
            className="bg-terminal-blue hover:bg-terminal-blue/80 text-white font-mono text-xs"
            size="sm"
          >
            <Play className="w-3 h-3 mr-1" />
            {isLoading.volume ? "Analisando..." : "Executar Varredura"}
          </Button>
        </div>

        {/* Options Activity */}
        {volumeAnalysis && (
          <>
            <div className="space-y-3">
              <h4 className="text-terminal-text font-mono text-sm font-semibold">
                ATIVIDADE ANÔMALA DETECTADA
              </h4>
              {volumeAnalysis.optionsActivity
                .filter((activity) => activity.unusualActivity)
                .map((activity, index) => {
                  const activityLevel = getActivityLevel(activity.volumeRatio);
                  return (
                    <div
                      key={index}
                      className="bg-terminal-bg border border-terminal-border rounded p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-terminal-text font-mono text-sm font-semibold">
                            {activity.symbol}
                          </span>
                          <Badge
                            className={`${activityLevel.color} text-white font-mono text-xs`}
                          >
                            {activityLevel.level}
                          </Badge>
                        </div>
                        {activity.largeBlocks && (
                          <AlertTriangle className="w-4 h-4 text-terminal-orange" />
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-terminal-text-muted">
                            Volume Ratio:
                          </span>
                          <br />
                          <span className="text-terminal-text">
                            {activity.volumeRatio.toFixed(1)}x
                          </span>
                        </div>
                        <div>
                          <span className="text-terminal-text-muted">
                            Put/Call:
                          </span>
                          <br />
                          <span className="text-terminal-text">
                            {activity.putCallRatio.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-terminal-text-muted">
                            Blocos Grandes:
                          </span>
                          <br />
                          <span
                            className={
                              activity.largeBlocks
                                ? "text-terminal-orange"
                                : "text-terminal-gray"
                            }
                          >
                            {activity.largeBlocks ? "SIM" : "NÃO"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Institutional Flow */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-3">
              <h4 className="text-terminal-text font-mono text-sm font-semibold mb-3">
                FLUXO INSTITUCIONAL
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {volumeAnalysis.institutionalFlow.direction === "bullish" ? (
                    <TrendingUp className="w-4 h-4 text-terminal-green" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-terminal-red" />
                  )}
                  <span className="text-terminal-text font-mono text-sm">
                    {volumeAnalysis.institutionalFlow.direction.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-terminal-text-muted font-mono text-xs">
                    Confiança
                  </div>
                  <div className="text-terminal-text font-mono text-sm">
                    {volumeAnalysis.institutionalFlow.confidence}%
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-terminal-text-muted font-mono text-xs">
                  Volume Total
                </div>
                <div className="text-terminal-text font-mono text-sm">
                  {(volumeAnalysis.institutionalFlow.volume / 1000000).toFixed(
                    1,
                  )}
                  M
                </div>
              </div>
            </div>

            {/* Dark Pool Activity */}
            {volumeAnalysis.darkPoolActivity.detected && (
              <div className="bg-terminal-bg border border-terminal-orange rounded p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-terminal-orange" />
                  <h4 className="text-terminal-text font-mono text-sm font-semibold">
                    ATIVIDADE DARK POOL DETECTADA
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-terminal-text-muted">
                      Tamanho Estimado:
                    </span>
                    <br />
                    <span className="text-terminal-orange">
                      {(
                        volumeAnalysis.darkPoolActivity.estimatedSize / 1000000
                      ).toFixed(1)}
                      M
                    </span>
                  </div>
                  <div>
                    <span className="text-terminal-text-muted">Direção:</span>
                    <br />
                    <span className="text-terminal-orange">
                      {volumeAnalysis.darkPoolActivity.direction.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {!volumeAnalysis && !isLoading.volume && (
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 text-terminal-gray mx-auto mb-4" />
            <div className="text-terminal-text-muted font-mono text-sm">
              Execute uma varredura para detectar atividade anômala
            </div>
          </div>
        )}

        {isLoading.volume && (
          <div className="flex items-center justify-center py-8 space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-terminal-text font-mono text-sm">
              Analisando volume...
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VolumeRadar;
