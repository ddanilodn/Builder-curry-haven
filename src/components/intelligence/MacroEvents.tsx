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
import { Globe, Calendar, AlertTriangle, Play, TrendingUp } from "lucide-react";
import { useIntelligence } from "@/hooks/useIntelligence";

const MacroEvents = () => {
  const { isLoading, runAnalysis } = useIntelligence();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [upcomingEvents] = useState([
    {
      id: "1",
      title: "FOMC Meeting",
      date: new Date(Date.now() + 48 * 3600000), // 48h from now
      type: "monetary" as const,
      impact: "high" as const,
      description: "Federal Reserve policy decision",
      affectedAssets: ["SPX", "DXY", "IBOV"],
      probability: 73,
      expectedMove: "+/- 2.5%",
    },
    {
      id: "2",
      title: "Copom Meeting",
      date: new Date(Date.now() + 72 * 3600000), // 72h from now
      type: "monetary" as const,
      impact: "high" as const,
      description: "Banco Central do Brasil policy decision",
      affectedAssets: ["DI1F26", "USD/BRL", "IBOV"],
      probability: 65,
      expectedMove: "+/- 1.8%",
    },
    {
      id: "3",
      title: "NFP Release",
      date: new Date(Date.now() + 120 * 3600000), // 5 days from now
      type: "economic" as const,
      impact: "medium" as const,
      description: "US Non-Farm Payrolls",
      affectedAssets: ["SPX", "DXY"],
      probability: 45,
      expectedMove: "+/- 1.2%",
    },
    {
      id: "4",
      title: "China PMI",
      date: new Date(Date.now() + 24 * 3600000), // 24h from now
      type: "economic" as const,
      impact: "medium" as const,
      description: "Manufacturing PMI release",
      affectedAssets: ["VALE3", "IBOV"],
      probability: 38,
      expectedMove: "+/- 0.8%",
    },
  ]);

  const handleAnalyze = async () => {
    await runAnalysis("macro");
    setLastUpdate(new Date());
  };

  useEffect(() => {
    // Auto-refresh every 10 minutes
    const interval = setInterval(() => {
      if (!isLoading.macro) {
        handleAnalyze();
      }
    }, 600000);

    return () => clearInterval(interval);
  }, [isLoading.macro]);

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "monetary":
        return "🏦";
      case "fiscal":
        return "💰";
      case "geopolitical":
        return "🌍";
      case "economic":
        return "📊";
      default:
        return "📅";
    }
  };

  const getTimeToEvent = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return `${hours}h`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    }
  };

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-terminal-blue" />
            <CardTitle className="text-terminal-text font-mono text-lg">
              RADAR DE EVENTOS MACRO
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLoading.macro
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
          Monitora eventos macro e geopolíticos com impacto nos mercados
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading.macro}
            className="bg-terminal-blue hover:bg-terminal-blue/80 text-white font-mono text-xs"
            size="sm"
          >
            <Play className="w-3 h-3 mr-1" />
            {isLoading.macro ? "Atualizando..." : "Atualizar Eventos"}
          </Button>
          <div className="flex items-center space-x-2 text-terminal-text-muted font-mono text-xs">
            <Calendar className="w-3 h-3" />
            <span>{upcomingEvents.length} eventos próximos</span>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-3">
          <h4 className="text-terminal-text font-mono text-sm font-semibold">
            EVENTOS PRÓXIMOS COM ALTO IMPACTO
          </h4>
          {upcomingEvents
            .filter(
              (event) => event.impact === "high" || event.probability > 60,
            )
            .map((event, index) => (
              <div
                key={event.id}
                className="bg-terminal-bg border border-terminal-border rounded p-3 hover:border-terminal-blue transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getTypeIcon(event.type)}</span>
                    <h5 className="text-terminal-text font-mono text-sm font-semibold">
                      {event.title}
                    </h5>
                    <Badge className={getImpactColor(event.impact)}>
                      {event.impact.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-terminal-surface text-terminal-text border-terminal-border font-mono text-xs">
                      {getTimeToEvent(event.date)}
                    </Badge>
                    {event.probability > 70 && (
                      <AlertTriangle className="w-4 h-4 text-terminal-orange" />
                    )}
                  </div>
                </div>

                <div className="text-terminal-text-muted font-mono text-xs mb-2">
                  {event.description}
                </div>

                <div className="grid grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-terminal-text-muted">Data/Hora:</span>
                    <br />
                    <span className="text-terminal-text">
                      {event.date.toLocaleDateString()}{" "}
                      {event.date.toLocaleTimeString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-terminal-text-muted">
                      Prob. Impacto:
                    </span>
                    <br />
                    <span className="text-terminal-text">
                      {event.probability}%
                    </span>
                  </div>
                  <div>
                    <span className="text-terminal-text-muted">
                      Movimento Est.:
                    </span>
                    <br />
                    <span className="text-terminal-text">
                      {event.expectedMove}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <span className="text-terminal-text-muted font-mono text-xs">
                    Ativos Afetados:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {event.affectedAssets.map((asset, assetIndex) => (
                      <Badge
                        key={assetIndex}
                        className="bg-terminal-blue/20 text-terminal-blue border-terminal-blue font-mono text-xs"
                        variant="outline"
                      >
                        {asset}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* All Events Timeline */}
        <div className="space-y-3">
          <h4 className="text-terminal-text font-mono text-sm font-semibold">
            CRONOGRAMA COMPLETO
          </h4>
          <div className="space-y-2">
            {upcomingEvents
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((event, index) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between bg-terminal-bg border border-terminal-border rounded p-2"
                >
                  <div className="flex items-center space-x-2">
                    <span>{getTypeIcon(event.type)}</span>
                    <span className="text-terminal-text font-mono text-xs">
                      {event.title}
                    </span>
                    <Badge
                      className={`${getImpactColor(event.impact)} font-mono text-xs`}
                      size="sm"
                    >
                      {event.impact}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-terminal-text-muted font-mono text-xs">
                      {getTimeToEvent(event.date)}
                    </span>
                    {event.probability > 60 && (
                      <TrendingUp className="w-3 h-3 text-terminal-green" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading.macro && (
          <div className="flex items-center justify-center py-4 space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-terminal-text font-mono text-sm">
              Atualizando eventos macro...
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MacroEvents;
