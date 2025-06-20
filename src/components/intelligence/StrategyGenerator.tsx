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
  Zap,
  TrendingUp,
  Target,
  Play,
  DollarSign,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useIntelligence } from "@/hooks/useIntelligence";

const StrategyGenerator = () => {
  const { strategies, isLoading, runAnalysis } = useIntelligence();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleAnalyze = async () => {
    await runAnalysis("thesis");
    setLastUpdate(new Date());
  };

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      if (!isLoading.thesis) {
        handleAnalyze();
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [isLoading.thesis]);

  const getStrategyIcon = (type: string) => {
    switch (type) {
      case "straddle":
        return "🔄";
      case "strangle":
        return "🤏";
      case "iron_condor":
        return "🦅";
      case "butterfly":
        return "🦋";
      case "calendar":
        return "📅";
      case "ratio_spread":
        return "⚖️";
      case "protective_put":
        return "🛡️";
      case "covered_call":
        return "☂️";
      default:
        return "📊";
    }
  };

  const getStrategyColor = (type: string) => {
    switch (type) {
      case "straddle":
      case "strangle":
        return "bg-terminal-green text-white";
      case "iron_condor":
      case "butterfly":
        return "bg-terminal-blue text-white";
      case "calendar":
      case "ratio_spread":
        return "bg-terminal-orange text-white";
      case "protective_put":
      case "covered_call":
        return "bg-terminal-gray text-white";
      default:
        return "bg-terminal-surface text-terminal-text border-terminal-border";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-terminal-green";
    if (confidence >= 60) return "text-terminal-blue";
    if (confidence >= 40) return "text-terminal-orange";
    return "text-terminal-red";
  };

  const getRiskRewardColor = (ratio: number) => {
    if (ratio >= 3) return "text-terminal-green";
    if (ratio >= 2) return "text-terminal-blue";
    if (ratio >= 1) return "text-terminal-orange";
    return "text-terminal-red";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPrice = (value: number) => {
    if (value === Number.POSITIVE_INFINITY) return "Ilimitado";
    return formatCurrency(value);
  };

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-terminal-blue" />
            <CardTitle className="text-terminal-text font-mono text-lg">
              GERAÇÃO DE TESES OPERACIONAIS
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLoading.thesis
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
          Gera e otimiza estratégias de opções baseadas em sinais confluentes
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading.thesis}
            className="bg-terminal-blue hover:bg-terminal-blue/80 text-white font-mono text-xs"
            size="sm"
          >
            <Play className="w-3 h-3 mr-1" />
            {isLoading.thesis ? "Gerando..." : "Gerar Estratégias"}
          </Button>
          <div className="flex items-center space-x-2 text-terminal-text-muted font-mono text-xs">
            <Target className="w-3 h-3" />
            <span>{strategies.length} estratégias ativas</span>
          </div>
        </div>

        {/* Strategy Recommendations */}
        {strategies.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-terminal-text font-mono text-sm font-semibold">
              ESTRATÉGIAS RECOMENDADAS
            </h4>

            {strategies.map((strategy, index) => (
              <div
                key={strategy.id}
                className="bg-terminal-bg border border-terminal-border rounded p-4 hover:border-terminal-blue transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {getStrategyIcon(strategy.type)}
                    </span>
                    <h5 className="text-terminal-text font-mono text-sm font-semibold">
                      {strategy.description}
                    </h5>
                    <Badge className={getStrategyColor(strategy.type)}>
                      {strategy.type.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={`border-current font-mono text-xs ${getConfidenceColor(strategy.confidence)}`}
                      variant="outline"
                    >
                      {strategy.confidence}% CONF
                    </Badge>
                    {strategy.confidence >= 80 && (
                      <CheckCircle className="w-4 h-4 text-terminal-green" />
                    )}
                  </div>
                </div>

                {/* Strategy Metrics */}
                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div>
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Risco/Retorno:
                    </span>
                    <br />
                    <span
                      className={`font-mono text-sm ${getRiskRewardColor(strategy.riskReward)}`}
                    >
                      {strategy.riskReward.toFixed(1)}:1
                    </span>
                  </div>
                  <div>
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Max Loss:
                    </span>
                    <br />
                    <span className="text-terminal-red font-mono text-sm">
                      {formatPrice(strategy.maxLoss)}
                    </span>
                  </div>
                  <div>
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Max Gain:
                    </span>
                    <br />
                    <span className="text-terminal-green font-mono text-sm">
                      {formatPrice(strategy.maxGain)}
                    </span>
                  </div>
                  <div>
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Breakevens:
                    </span>
                    <br />
                    <span className="text-terminal-text font-mono text-sm">
                      {strategy.breakevens
                        .map((be) => be.toFixed(2))
                        .join(", ")}
                    </span>
                  </div>
                </div>

                {/* Confidence Level Bar */}
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Nível de Confiança
                    </span>
                    <span className="text-terminal-text font-mono text-xs">
                      {strategy.confidence}%
                    </span>
                  </div>
                  <Progress value={strategy.confidence} className="h-2" />
                </div>

                {/* Reasoning */}
                <div className="mb-3">
                  <h6 className="text-terminal-text-muted font-mono text-xs mb-1">
                    ANÁLISE:
                  </h6>
                  <div className="text-terminal-text font-mono text-xs leading-relaxed">
                    {strategy.reasoning}
                  </div>
                </div>

                {/* Strategy Legs */}
                <div className="bg-terminal-surface border border-terminal-border rounded p-3">
                  <h6 className="text-terminal-text-muted font-mono text-xs mb-2">
                    ESTRUTURA DA OPERAÇÃO:
                  </h6>
                  <div className="space-y-1">
                    {strategy.legs.map((leg, legIndex) => (
                      <div
                        key={legIndex}
                        className="flex items-center justify-between text-xs font-mono"
                      >
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`${
                              leg.action === "buy"
                                ? "bg-terminal-green text-white"
                                : "bg-terminal-red text-white"
                            } font-mono text-xs`}
                            size="sm"
                          >
                            {leg.action.toUpperCase()}
                          </Badge>
                          <span className="text-terminal-text">
                            {leg.quantity}x {leg.type.toUpperCase()}
                          </span>
                          {leg.strike && (
                            <span className="text-terminal-text">
                              K{leg.strike}
                            </span>
                          )}
                          {leg.expiry && (
                            <span className="text-terminal-text-muted">
                              {leg.expiry.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <span className="text-terminal-text">
                          {formatCurrency(leg.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alerts for high confidence strategies */}
                {strategy.confidence >= 85 && (
                  <div className="mt-3 p-2 bg-terminal-green/10 border border-terminal-green rounded">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-terminal-green" />
                      <span className="text-terminal-green font-mono text-xs">
                        ALTA CONFIANÇA: Confluência de múltiplos sinais
                        detectada
                      </span>
                    </div>
                  </div>
                )}

                {strategy.riskReward < 1.5 && (
                  <div className="mt-3 p-2 bg-terminal-orange/10 border border-terminal-orange rounded">
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3 text-terminal-orange" />
                      <span className="text-terminal-orange font-mono text-xs">
                        ATENÇÃO: Relação risco/retorno baixa
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Strategy Statistics */}
        {strategies.length > 0 && (
          <div className="bg-terminal-bg border border-terminal-border rounded p-4">
            <h4 className="text-terminal-text font-mono text-sm font-semibold mb-3">
              ESTATÍSTICAS DAS ESTRATÉGIAS
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-terminal-text font-mono text-lg">
                  {strategies.filter((s) => s.confidence >= 70).length}
                </div>
                <div className="text-terminal-text-muted font-mono text-xs">
                  Alta Confiança
                </div>
              </div>
              <div className="text-center">
                <div className="text-terminal-text font-mono text-lg">
                  {(
                    strategies.reduce((sum, s) => sum + s.riskReward, 0) /
                    strategies.length
                  ).toFixed(1)}
                  :1
                </div>
                <div className="text-terminal-text-muted font-mono text-xs">
                  R/R Médio
                </div>
              </div>
              <div className="text-center">
                <div className="text-terminal-text font-mono text-lg">
                  {(
                    strategies.reduce((sum, s) => sum + s.confidence, 0) /
                    strategies.length
                  ).toFixed(0)}
                  %
                </div>
                <div className="text-terminal-text-muted font-mono text-xs">
                  Confiança Média
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading.thesis && (
          <div className="flex items-center justify-center py-8 space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-terminal-text font-mono text-sm">
              Gerando estratégias...
            </span>
          </div>
        )}

        {/* Empty State */}
        {strategies.length === 0 && !isLoading.thesis && (
          <div className="text-center py-8">
            <Zap className="w-12 h-12 text-terminal-gray mx-auto mb-4" />
            <div className="text-terminal-text-muted font-mono text-sm">
              Execute geração para criar estratégias baseadas em sinais atuais
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StrategyGenerator;
