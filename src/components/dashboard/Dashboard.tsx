import MarketIndicators from "./MarketIndicators";
import TacticalAlerts from "./TacticalAlerts";
import IntelligenceModule from "./IntelligenceModule";
import SidePanel from "./SidePanel";

const Dashboard = () => {
  const intelligenceModules = [
    {
      title: "Radar de Volume em Opções",
      type: "volume",
    },
    {
      title: "Análise de Documentos e Linguagem",
      type: "documents",
    },
    {
      title: "Radar de Eventos Macroeconômicos",
      type: "macro",
    },
    {
      title: "Análise de Narrativa Pública",
      type: "narrative",
    },
    {
      title: "Dissonância de Ativos Correlatos",
      type: "correlation",
    },
    {
      title: "Microestrutura: Delta + Rolagem",
      type: "microstructure",
    },
    {
      title: "Curva de Volatilidade e VIX",
      type: "volatility",
    },
    {
      title: "Geração de Teses Operacionais",
      type: "thesis",
    },
    {
      title: "Radar de Compressão de Vol",
      type: "compression",
    },
  ];

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
              <div className="text-terminal-text-muted font-mono text-xs">
                Sistema Online
              </div>
              <div className="w-3 h-3 bg-terminal-green rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Top Indicators */}
            <MarketIndicators />

            {/* Tactical Alerts */}
            <TacticalAlerts />

            {/* Intelligence Modules Grid */}
            <div>
              <h2 className="text-terminal-text font-mono text-lg font-semibold mb-4">
                MÓDULOS DE INTELIGÊNCIA
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {intelligenceModules.map((module, index) => (
                  <IntelligenceModule
                    key={index}
                    title={module.title}
                    type={module.type}
                    isAnalyzing={index < 2} // First two modules are "analyzing"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="xl:col-span-1">
            <SidePanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
