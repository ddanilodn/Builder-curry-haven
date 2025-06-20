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
  Activity,
  Eye,
  AlertTriangle,
  Play,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useIntelligence } from "@/hooks/useIntelligence";

const MicrostructureAnalysis = () => {
  const { microstructureData, isLoading, runAnalysis } = useIntelligence();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleAnalyze = async () => {
    await runAnalysis("microstructure");
    setLastUpdate(new Date());
  };

  useEffect(() => {
    // Auto-refresh every 90 seconds
    const interval = setInterval(() => {
      if (!isLoading.microstructure) {
        handleAnalyze();
      }
    }, 90000);

    return () => clearInterval(interval);
  }, [isLoading.microstructure]);

  const getFlowColor = (direction: string) => {
    return direction === "buying" ? "text-terminal-green" : "text-terminal-red";
  };

  const getFlowIcon = (direction: string) => {
    return direction === "buying" ? (
      <TrendingUp className="w-4 h-4 text-terminal-green" />
    ) : (
      <TrendingDown className="w-4 h-4 text-terminal-red" />
    );
  };

  const getSizeColor = (size: string) => {
    switch (size) {
      case "institutional":
        return "bg-terminal-red text-white";
      case "retail":
        return "bg-terminal-blue text-white";
      default:
        return "bg-terminal-orange text-white";
    }
  };

  const getHiddenLiquidityIcon = (type: string) => {
    switch (type) {
      case "iceberg":
        return "🧊";
      case "stealth":
        return "👻";
      case "sweeping":
        return "🌊";
      default:
        return "💧";
    }
  };

  const formatLargeNumber = (num: number): string => {
    if (Math.abs(num) >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (Math.abs(num) >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-terminal-blue" />
            <CardTitle className="text-terminal-text font-mono text-lg">
              MICROESTRUTURA: DELTA + ROLAGEM
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLoading.microstructure
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
          Analisa fluxo institucional oculto e proteção sintética disfarçada
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading.microstructure}
            className="bg-terminal-blue hover:bg-terminal-blue/80 text-white font-mono text-xs"
            size="sm"
          >
            <Play className="w-3 h-3 mr-1" />
            {isLoading.microstructure ? "Escaneando..." : "Escanear Fluxo"}
          </Button>
          <div className="flex items-center space-x-2 text-terminal-text-muted font-mono text-xs">
            <Eye className="w-3 h-3" />
            <span>Detecção de Liquidez Oculta</span>
          </div>
        </div>

        {/* Microstructure Analysis Results */}
        {microstructureData && (
          <div className="space-y-4">
            {/* Order Flow Analysis */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <h4 className="text-terminal-text font-mono text-sm font-semibold mb-3">
                ANÁLISE DE FLUXO DE ORDENS
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {getFlowIcon(microstructureData.orderFlow.direction)}
                  </div>
                  <div className="text-terminal-text-muted font-mono text-xs">
                    Direção
                  </div>
                  <div
                    className={`font-mono text-sm font-semibold ${getFlowColor(microstructureData.orderFlow.direction)}`}
                  >
                    {microstructureData.orderFlow.direction.toUpperCase()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-2">
                    <div className="w-12 h-12 mx-auto bg-terminal-blue/20 rounded-full flex items-center justify-center">
                      <span className="text-terminal-blue font-mono text-sm">
                        {(microstructureData.orderFlow.pressure * 100).toFixed(
                          0,
                        )}
                        %
                      </span>
                    </div>
                  </div>
                  <div className="text-terminal-text-muted font-mono text-xs">
                    Pressão
                  </div>
                  <Progress
                    value={microstructureData.orderFlow.pressure * 100}
                    className="h-2 mt-1"
                  />
                </div>
                <div className="text-center">
                  <div className="mb-2">
                    <Badge
                      className={`${getSizeColor(microstructureData.orderFlow.size)} font-mono text-xs`}
                    >
                      {microstructureData.orderFlow.size.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-terminal-text-muted font-mono text-xs">
                    Tamanho Típico
                  </div>
                </div>
              </div>
            </div>

            {/* Delta Flow Analysis */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <h4 className="text-terminal-text font-mono text-sm font-semibold mb-3">
                FLUXO DE DELTA E GREEKS
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Gamma Flow:
                    </span>
                    <span
                      className={`font-mono text-sm ${
                        microstructureData.deltaFlow.gamma > 0
                          ? "text-terminal-green"
                          : "text-terminal-red"
                      }`}
                    >
                      {formatLargeNumber(microstructureData.deltaFlow.gamma)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Vanna:
                    </span>
                    <span
                      className={`font-mono text-sm ${
                        microstructureData.deltaFlow.vanna > 0
                          ? "text-terminal-green"
                          : "text-terminal-red"
                      }`}
                    >
                      {formatLargeNumber(microstructureData.deltaFlow.vanna)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Charm:
                    </span>
                    <span
                      className={`font-mono text-sm ${
                        microstructureData.deltaFlow.charm > 0
                          ? "text-terminal-green"
                          : "text-terminal-red"
                      }`}
                    >
                      {formatLargeNumber(microstructureData.deltaFlow.charm)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Direção Geral:
                    </span>
                    <span
                      className={`font-mono text-sm ${
                        microstructureData.deltaFlow.direction === "positive"
                          ? "text-terminal-green"
                          : "text-terminal-red"
                      }`}
                    >
                      {microstructureData.deltaFlow.direction.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Visual representation of delta flow */}
              <div className="mt-3 p-3 bg-terminal-surface border border-terminal-border rounded">
                <div className="text-terminal-text-muted font-mono text-xs mb-2">
                  IMPACTO NO HEDGE:
                </div>
                <div className="flex items-center space-x-2">
                  {microstructureData.deltaFlow.direction === "negative" ? (
                    <AlertTriangle className="w-4 h-4 text-terminal-red" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-terminal-green" />
                  )}
                  <span className="text-terminal-text font-mono text-xs">
                    {microstructureData.deltaFlow.direction === "negative"
                      ? "Market makers provavelmente vendendo spot para hedge"
                      : "Market makers provavelmente comprando spot para hedge"}
                  </span>
                </div>
              </div>
            </div>

            {/* Hidden Liquidity Detection */}
            {microstructureData.hiddenLiquidity.detected && (
              <div className="bg-terminal-bg border border-terminal-orange rounded p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Eye className="w-4 h-4 text-terminal-orange" />
                  <h4 className="text-terminal-orange font-mono text-sm font-semibold">
                    LIQUIDEZ OCULTA DETECTADA
                  </h4>
                  <span className="text-lg">
                    {getHiddenLiquidityIcon(
                      microstructureData.hiddenLiquidity.type,
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Tipo de Estratégia:
                    </span>
                    <br />
                    <Badge className="bg-terminal-orange text-white font-mono text-xs">
                      {microstructureData.hiddenLiquidity.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Tamanho Estimado:
                    </span>
                    <br />
                    <span className="text-terminal-orange font-mono text-sm">
                      {formatLargeNumber(
                        microstructureData.hiddenLiquidity.estimatedSize,
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-terminal-orange/10 border border-terminal-orange rounded">
                  <div className="text-terminal-orange font-mono text-xs">
                    ⚠️ ATENÇÃO: Grande player operando de forma discreta.
                    Possível movimento significativo em preparação.
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Summary */}
            <div className="bg-terminal-bg border border-terminal-blue rounded p-4">
              <h4 className="text-terminal-blue font-mono text-sm font-semibold mb-2">
                INTERPRETAÇÃO TÁTICA
              </h4>
              <div className="space-y-2 text-xs font-mono">
                {microstructureData.orderFlow.pressure > 0.7 && (
                  <div className="text-terminal-orange">
                    🔥 Pressão de {microstructureData.orderFlow.direction}{" "}
                    significativa detectada
                  </div>
                )}
                {microstructureData.deltaFlow.gamma < -2000000 && (
                  <div className="text-terminal-red">
                    ⚠️ Gamma negativo alto - possível supressão de volatilidade
                  </div>
                )}
                {microstructureData.hiddenLiquidity.detected && (
                  <div className="text-terminal-orange">
                    👁️ Atividade institucional oculta - monitorar rupturas
                  </div>
                )}
                <div className="text-terminal-blue">
                  💡 Sugestão:{" "}
                  {microstructureData.orderFlow.direction === "selling"
                    ? "Considerar proteção via puts ou redução de exposição"
                    : "Posicionamento defensivo pode estar excessivo"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading.microstructure && (
          <div className="flex items-center justify-center py-8 space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-terminal-text font-mono text-sm">
              Escaneando microestrutura...
            </span>
          </div>
        )}

        {/* Empty State */}
        {!microstructureData && !isLoading.microstructure && (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-terminal-gray mx-auto mb-4" />
            <div className="text-terminal-text-muted font-mono text-sm">
              Execute escaneamento para detectar fluxos institucionais ocultos
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MicrostructureAnalysis;
