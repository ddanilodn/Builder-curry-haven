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
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Play,
  Activity,
  Target,
} from "lucide-react";
import { useIntelligence } from "@/hooks/useIntelligence";

const VolatilityAnalysis = () => {
  const { volatilityProfile, isLoading, runAnalysis } = useIntelligence();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleAnalyze = async () => {
    await runAnalysis("volatility");
    setLastUpdate(new Date());
  };

  useEffect(() => {
    // Auto-refresh every 3 minutes
    const interval = setInterval(() => {
      if (!isLoading.volatility) {
        handleAnalyze();
      }
    }, 180000);

    return () => clearInterval(interval);
  }, [isLoading.volatility]);

  const getPercentileColor = (percentile: number) => {
    if (percentile < 20) return "text-terminal-green"; // Low vol - opportunity
    if (percentile < 40) return "text-terminal-blue";
    if (percentile < 70) return "text-terminal-orange";
    return "text-terminal-red"; // High vol - caution
  };

  const getPercentileBg = (percentile: number) => {
    if (percentile < 20) return "bg-terminal-green/20 border-terminal-green";
    if (percentile < 40) return "bg-terminal-blue/20 border-terminal-blue";
    if (percentile < 70) return "bg-terminal-orange/20 border-terminal-orange";
    return "bg-terminal-red/20 border-terminal-red";
  };

  const getRegimeIcon = (regime: string) => {
    switch (regime) {
      case "low":
        return "🟢";
      case "normal":
        return "🟡";
      case "high":
        return "🟠";
      case "extreme":
        return "🔴";
      default:
        return "⚪";
    }
  };

  const getRegimeColor = (regime: string) => {
    switch (regime) {
      case "low":
        return "text-terminal-green";
      case "normal":
        return "text-terminal-blue";
      case "high":
        return "text-terminal-orange";
      case "extreme":
        return "text-terminal-red";
      default:
        return "text-terminal-gray";
    }
  };

  const getSkewDirection = (skew: any[]) => {
    const putSkew = skew.filter((s) => s.delta < 0);
    const callSkew = skew.filter((s) => s.delta > 0);
    const avgPutVol =
      putSkew.reduce((sum, s) => sum + s.vol, 0) / putSkew.length;
    const avgCallVol =
      callSkew.reduce((sum, s) => sum + s.vol, 0) / callSkew.length;
    return avgPutVol > avgCallVol ? "PUT SKEW" : "CALL SKEW";
  };

  const isInverted = (termStructure: any[]) => {
    const shortTerm = termStructure.find((t) => t.term === "1M")?.vol || 0;
    const longTerm = termStructure.find((t) => t.term === "6M")?.vol || 0;
    return shortTerm > longTerm;
  };

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-terminal-blue" />
            <CardTitle className="text-terminal-text font-mono text-lg">
              CURVA DE VOLATILIDADE E VIX
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLoading.volatility
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
          Analisa estrutura de volatilidade e detecta compressão/expansão
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading.volatility}
            className="bg-terminal-blue hover:bg-terminal-blue/80 text-white font-mono text-xs"
            size="sm"
          >
            <Play className="w-3 h-3 mr-1" />
            {isLoading.volatility ? "Calculando..." : "Analisar Volatilidade"}
          </Button>
          <div className="flex items-center space-x-2 text-terminal-text-muted font-mono text-xs">
            <Activity className="w-3 h-3" />
            <span>Monitoramento de Vol Surface</span>
          </div>
        </div>

        {/* Volatility Analysis Results */}
        {volatilityProfile && (
          <div className="space-y-4">
            {/* Regime Overview */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-terminal-text font-mono text-sm font-semibold">
                  REGIME DE VOLATILIDADE - {volatilityProfile.underlying}
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">
                    {getRegimeIcon(volatilityProfile.regime)}
                  </span>
                  <Badge
                    className={`${getRegimeColor(volatilityProfile.regime)} border-current font-mono text-xs`}
                    variant="outline"
                  >
                    {volatilityProfile.regime.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Alert for regime */}
              {volatilityProfile.regime === "low" && (
                <div className="p-2 bg-terminal-green/10 border border-terminal-green rounded mb-3">
                  <div className="flex items-center space-x-1">
                    <Target className="w-3 h-3 text-terminal-green" />
                    <span className="text-terminal-green font-mono text-xs">
                      OPORTUNIDADE: Volatilidade comprimida - setup para long
                      vol
                    </span>
                  </div>
                </div>
              )}

              {volatilityProfile.regime === "extreme" && (
                <div className="p-2 bg-terminal-red/10 border border-terminal-red rounded mb-3">
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3 text-terminal-red" />
                    <span className="text-terminal-red font-mono text-xs">
                      CUIDADO: Volatilidade extrema - evitar long vol
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Term Structure */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-terminal-text font-mono text-sm font-semibold">
                  ESTRUTURA TEMPORAL
                </h4>
                {isInverted(volatilityProfile.termStructure) && (
                  <Badge className="bg-terminal-orange text-white font-mono text-xs">
                    INVERTIDA
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                {volatilityProfile.termStructure.map((term, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-terminal-text font-mono text-sm">
                        {term.term}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-terminal-text font-mono text-sm">
                          {term.vol.toFixed(1)}%
                        </span>
                        <Badge
                          className={`${getPercentileColor(term.percentile)} border-current font-mono text-xs`}
                          variant="outline"
                        >
                          {term.percentile}p
                        </Badge>
                      </div>
                    </div>
                    <Progress value={term.percentile} className="h-2" />
                  </div>
                ))}
              </div>

              {/* Term Structure Insights */}
              <div className="mt-3 p-2 bg-terminal-blue/10 border border-terminal-blue rounded">
                <div className="text-terminal-blue font-mono text-xs">
                  {isInverted(volatilityProfile.termStructure)
                    ? "📉 Estrutura invertida sugere stress de curto prazo"
                    : "📈 Estrutura normal - maior incerteza no longo prazo"}
                </div>
              </div>
            </div>

            {/* Volatility Skew */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-terminal-text font-mono text-sm font-semibold">
                  SKEW DE VOLATILIDADE
                </h4>
                <Badge className="bg-terminal-blue text-white font-mono text-xs">
                  {getSkewDirection(volatilityProfile.skew)}
                </Badge>
              </div>

              <div className="space-y-2">
                {volatilityProfile.skew.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-terminal-surface border border-terminal-border rounded p-2"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-terminal-text font-mono text-xs">
                        Strike {point.strike}
                      </span>
                      <span
                        className={`font-mono text-xs ${
                          point.delta < 0
                            ? "text-terminal-red"
                            : "text-terminal-green"
                        }`}
                      >
                        Δ{point.delta.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-terminal-border rounded overflow-hidden">
                        <div
                          className="h-full bg-terminal-blue"
                          style={{ width: `${(point.vol / 40) * 100}%` }}
                        />
                      </div>
                      <span className="text-terminal-text font-mono text-xs w-12">
                        {point.vol.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Opportunities */}
            <div className="space-y-3">
              <h4 className="text-terminal-text font-mono text-sm font-semibold">
                OPORTUNIDADES IDENTIFICADAS
              </h4>

              {/* Low Vol Opportunity */}
              {volatilityProfile.termStructure.some(
                (t) => t.percentile < 25,
              ) && (
                <div className={`p-3 rounded border ${getPercentileBg(20)}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-terminal-green" />
                    <span className="text-terminal-green font-mono text-sm font-semibold">
                      LONG VOLATILIDADE
                    </span>
                  </div>
                  <div className="text-terminal-text font-mono text-xs">
                    Volatilidade no percentil baixo - considerar
                    straddles/strangles
                  </div>
                </div>
              )}

              {/* Inverted Structure */}
              {isInverted(volatilityProfile.termStructure) && (
                <div className="p-3 bg-terminal-orange/20 border border-terminal-orange rounded">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-4 h-4 text-terminal-orange" />
                    <span className="text-terminal-orange font-mono text-sm font-semibold">
                      CALENDAR SPREAD
                    </span>
                  </div>
                  <div className="text-terminal-text font-mono text-xs">
                    Estrutura invertida - sell front month / buy back month
                  </div>
                </div>
              )}

              {/* High Skew */}
              {volatilityProfile.skew.some((s) => s.vol > 30) && (
                <div className="p-3 bg-terminal-blue/20 border border-terminal-blue rounded">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-terminal-blue" />
                    <span className="text-terminal-blue font-mono text-sm font-semibold">
                      SKEW TRADE
                    </span>
                  </div>
                  <div className="text-terminal-text font-mono text-xs">
                    Alto skew detectado - considerar ratio spreads ou
                    butterflies
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading.volatility && (
          <div className="flex items-center justify-center py-8 space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-terminal-text font-mono text-sm">
              Calculando superfície de volatilidade...
            </span>
          </div>
        )}

        {/* Empty State */}
        {!volatilityProfile && !isLoading.volatility && (
          <div className="text-center py-8">
            <DollarSign className="w-12 h-12 text-terminal-gray mx-auto mb-4" />
            <div className="text-terminal-text-muted font-mono text-sm">
              Execute análise para mapear estrutura de volatilidade
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VolatilityAnalysis;
