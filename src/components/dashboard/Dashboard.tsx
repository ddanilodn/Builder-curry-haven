import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Settings, Maximize2 } from "lucide-react";

// Import existing components
import MarketIndicators from "./MarketIndicators";
import TacticalAlerts from "./TacticalAlerts";
import SidePanel from "./SidePanel";

// Import new intelligence modules
import VolumeRadar from "../intelligence/VolumeRadar";
import DocumentAnalysis from "../intelligence/DocumentAnalysis";
import MacroEvents from "../intelligence/MacroEvents";
import NarrativeAnalysis from "../intelligence/NarrativeAnalysis";
import CorrelationAnalysis from "../intelligence/CorrelationAnalysis";
import MicrostructureAnalysis from "../intelligence/MicrostructureAnalysis";
import VolatilityAnalysis from "../intelligence/VolatilityAnalysis";
import StrategyGenerator from "../intelligence/StrategyGenerator";
import NewsTerminal from "../intelligence/NewsTerminal";
import AIAnalysisTerminal from "../intelligence/AIAnalysisTerminal";

// Custom hooks
import { useMarketData } from "@/hooks/useMarketData";
import { useIntelligence } from "@/hooks/useIntelligence";

const Dashboard = () => {
  const { lastUpdate, refreshData } = useMarketData();
  const { refreshAll } = useIntelligence();
  const [activeTab, setActiveTab] = useState("overview");
  const [fullscreenModule, setFullscreenModule] = useState<string | null>(null);

  const handleRefreshAll = () => {
    refreshData();
    refreshAll();
  };

  const intelligenceModules = [
    {
      id: "volume",
      title: "Radar de Volume",
      description: "Detecta atividade anômala em opções",
      component: VolumeRadar,
      icon: "📊",
    },
    {
      id: "documents",
      title: "Análise de Documentos",
      description: "Processa balanços e comunicados",
      component: DocumentAnalysis,
      icon: "📄",
    },
    {
      id: "macro",
      title: "Eventos Macro",
      description: "Monitora eventos macro e geopolíticos",
      component: MacroEvents,
      icon: "🌍",
    },
    {
      id: "narrative",
      title: "Narrativa Pública",
      description: "Análise de sentimento e tendências",
      component: NarrativeAnalysis,
      icon: "💭",
    },
    {
      id: "correlation",
      title: "Correlações",
      description: "Detecta quebras de correlação",
      component: CorrelationAnalysis,
      icon: "🔗",
    },
    {
      id: "microstructure",
      title: "Microestrutura",
      description: "Fluxo delta e liquidez oculta",
      component: MicrostructureAnalysis,
      icon: "🔬",
    },
    {
      id: "volatility",
      title: "Volatilidade",
      description: "Estrutura de vol e VIX",
      component: VolatilityAnalysis,
      icon: "📈",
    },
    {
      id: "strategy",
      title: "Estratégias",
      description: "Geração de teses operacionais",
      component: StrategyGenerator,
      icon: "⚡",
    },
    {
      id: "news",
      title: "Terminal de Notícias",
      description: "Feed de notícias em tempo real",
      component: NewsTerminal,
      icon: "📰",
    },
    {
      id: "ai",
      title: "IA Autônoma",
      description: "Análises integradas da IA",
      component: AIAnalysisTerminal,
      icon: "🧠",
    },
  ];

  if (fullscreenModule) {
    const module = intelligenceModules.find((m) => m.id === fullscreenModule);
    if (module) {
      const Component = module.component;
      return (
        <div className="min-h-screen bg-terminal-bg text-terminal-text p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{module.icon}</span>
              <h1 className="text-terminal-text font-mono text-xl font-bold">
                {module.title}
              </h1>
            </div>
            <Button
              onClick={() => setFullscreenModule(null)}
              variant="outline"
              size="sm"
              className="font-mono text-xs"
            >
              Voltar ao Dashboard
            </Button>
          </div>
          <Component />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      {/* Header */}
      <div className="border-b border-terminal-border bg-terminal-surface">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-terminal-text font-mono text-xl font-bold">
                MOTOR DE DERIVATIVOS COM IA
              </h1>
              <p className="text-terminal-text-muted font-mono text-sm">
                Inteligência Fria e Assimétrica
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleRefreshAll}
                variant="outline"
                size="sm"
                className="font-mono text-xs"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Atualizar Tudo
              </Button>
              <div className="flex items-center space-x-2">
                <div className="text-terminal-text-muted font-mono text-xs">
                  Sistema Online
                </div>
                <div className="w-3 h-3 bg-terminal-green rounded-full animate-pulse"></div>
              </div>
              <div className="text-terminal-text-muted font-mono text-xs">
                {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="font-mono text-xs">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="font-mono text-xs">
              Inteligência
            </TabsTrigger>
            <TabsTrigger value="analysis" className="font-mono text-xs">
              Análise
            </TabsTrigger>
            <TabsTrigger value="strategies" className="font-mono text-xs">
              Estratégias
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3 space-y-6">
                <MarketIndicators />
                <TacticalAlerts />

                {/* Quick Intelligence Overview */}
                <div>
                  <h2 className="text-terminal-text font-mono text-lg font-semibold mb-4">
                    MÓDULOS DE INTELIGÊNCIA - VISÃO RÁPIDA
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {intelligenceModules.slice(0, 6).map((module, index) => (
                      <div
                        key={module.id}
                        className="bg-terminal-surface border border-terminal-border rounded-lg p-4 hover:border-terminal-blue transition-colors cursor-pointer"
                        onClick={() => setActiveTab("intelligence")}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{module.icon}</span>
                            <h3 className="text-terminal-text font-mono text-sm font-semibold">
                              {module.title}
                            </h3>
                          </div>
                          <div className="w-2 h-2 bg-terminal-green rounded-full"></div>
                        </div>
                        <p className="text-terminal-text-muted font-mono text-xs">
                          {module.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="xl:col-span-1">
                <SidePanel />
              </div>
            </div>
          </TabsContent>

          {/* Intelligence Tab */}
          <TabsContent value="intelligence">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-terminal-text font-mono text-lg font-semibold">
                  MÓDULOS DE INTELIGÊNCIA COMPLETOS
                </h2>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-terminal-green text-white font-mono text-xs">
                    {intelligenceModules.length} MÓDULOS ATIVOS
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {intelligenceModules.slice(0, 8).map((module, index) => {
                  const Component = module.component;
                  return (
                    <div key={module.id} className="relative">
                      <div className="absolute top-4 right-4 z-10">
                        <Button
                          onClick={() => setFullscreenModule(module.id)}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <Maximize2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <Component />
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="space-y-6">
                <NewsTerminal />
                <CorrelationAnalysis />
              </div>
              <div className="space-y-6">
                <AIAnalysisTerminal />
                <VolatilityAnalysis />
              </div>
            </div>
          </TabsContent>

          {/* Strategies Tab */}
          <TabsContent value="strategies">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <StrategyGenerator />
              </div>
              <div className="space-y-6">
                <MicrostructureAnalysis />
                <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4">
                  <h3 className="text-terminal-text font-mono text-sm font-semibold mb-3">
                    PERFORMANCE HISTÓRICA
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-terminal-text-muted font-mono text-xs">
                        Estratégias Executadas:
                      </span>
                      <span className="text-terminal-text font-mono text-xs">
                        47
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-terminal-text-muted font-mono text-xs">
                        Taxa de Sucesso:
                      </span>
                      <span className="text-terminal-green font-mono text-xs">
                        73%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-terminal-text-muted font-mono text-xs">
                        Retorno Médio:
                      </span>
                      <span className="text-terminal-green font-mono text-xs">
                        +18.4%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
