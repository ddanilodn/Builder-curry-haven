import { TrendingUp, TrendingDown } from "lucide-react";

const SidePanel = () => {
  const theses = [
    {
      id: 1,
      title: "Convergência Fed Pivot",
      confidence: 87,
      frequency: 12,
      lastDetected: "14:20",
    },
    {
      id: 2,
      title: "Petróleo Descolado",
      confidence: 73,
      frequency: 8,
      lastDetected: "14:15",
    },
    {
      id: 3,
      title: "Vol Term Structure",
      confidence: 91,
      frequency: 15,
      lastDetected: "14:08",
    },
  ];

  const correlations = [
    {
      pair: "PETR4 x Brent",
      normal: 0.84,
      current: 0.12,
      deviation: -3.2,
    },
    {
      pair: "USDBRL x DI",
      normal: 0.92,
      current: 0.67,
      deviation: -2.8,
    },
    {
      pair: "IBOV x S&P500",
      normal: 0.76,
      current: 0.45,
      deviation: -2.1,
    },
  ];

  const volSurface = [
    { strike: 26, vol: 28.5, color: "bg-terminal-green" },
    { strike: 27, vol: 24.2, color: "bg-terminal-blue" },
    { strike: 28, vol: 21.8, color: "bg-terminal-blue" },
    { strike: 29, vol: 25.1, color: "bg-terminal-orange" },
    { strike: 30, vol: 31.4, color: "bg-terminal-red" },
  ];

  return (
    <div className="space-y-6">
      {/* Teses Recorrentes */}
      <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4">
        <h3 className="text-terminal-text font-mono text-sm font-semibold mb-4">
          TESES RECORRENTES IA
        </h3>
        <div className="space-y-3">
          {theses.map((thesis) => (
            <div
              key={thesis.id}
              className="bg-terminal-bg border border-terminal-border rounded p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-terminal-text font-mono text-xs font-semibold">
                  {thesis.title}
                </span>
                <span className="text-terminal-text-muted font-mono text-xs">
                  {thesis.lastDetected}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-terminal-text-muted font-mono text-xs">
                    Confiança:
                  </span>
                  <span className="text-terminal-green font-mono text-xs">
                    {thesis.confidence}%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-terminal-text-muted font-mono text-xs">
                    Freq:
                  </span>
                  <span className="text-terminal-blue font-mono text-xs">
                    {thesis.frequency}x
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Correlações Quebradas */}
      <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4">
        <h3 className="text-terminal-text font-mono text-sm font-semibold mb-4">
          CORRELAÇÕES QUEBRADAS
        </h3>
        <div className="space-y-3">
          {correlations.map((corr, index) => (
            <div
              key={index}
              className="bg-terminal-bg border border-terminal-border rounded p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-terminal-text font-mono text-xs font-semibold">
                  {corr.pair}
                </span>
                <div className="flex items-center space-x-1">
                  {corr.deviation < -2 ? (
                    <TrendingDown className="w-3 h-3 text-terminal-red" />
                  ) : (
                    <TrendingUp className="w-3 h-3 text-terminal-green" />
                  )}
                  <span className="text-terminal-red font-mono text-xs">
                    {corr.deviation}σ
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-terminal-text-muted">
                  Normal: {corr.normal}
                </span>
                <span className="text-terminal-orange">
                  Atual: {corr.current}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mapa de Volatilidade */}
      <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4">
        <h3 className="text-terminal-text font-mono text-sm font-semibold mb-4">
          SUPERFÍCIE DE VOLATILIDADE
        </h3>
        <div className="bg-terminal-bg border border-terminal-border rounded p-3">
          <div className="text-terminal-text-muted font-mono text-xs mb-3">
            PETR4 - Vencimento 19/07
          </div>
          <div className="space-y-2">
            {volSurface.map((point, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-terminal-text font-mono text-xs">
                  Strike {point.strike}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-terminal-border rounded overflow-hidden">
                    <div
                      className={`h-full ${point.color}`}
                      style={{ width: `${(point.vol / 35) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-terminal-text font-mono text-xs w-12">
                    {point.vol}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
