import { TrendingUp, TrendingDown } from "lucide-react";

const MarketIndicators = () => {
  const indicators = [
    {
      name: "DI Futuro",
      symbol: "DI1F26",
      value: "11.745%",
      change: "+0.12%",
      trend: "up",
    },
    {
      name: "Dólar",
      symbol: "USD/BRL",
      value: "5.4230",
      change: "-0.08%",
      trend: "down",
    },
    {
      name: "VIX",
      symbol: "CBOE",
      value: "18.45",
      change: "+2.34%",
      trend: "up",
    },
    {
      name: "IBOV",
      symbol: "IBOVESPA",
      value: "134,887",
      change: "+0.67%",
      trend: "up",
    },
  ];

  return (
    <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-terminal-text font-mono text-lg font-semibold">
          INDICADORES GLOBAIS
        </h2>
        <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {indicators.map((indicator, index) => (
          <div
            key={index}
            className="bg-terminal-bg border border-terminal-border rounded p-3 hover:border-terminal-blue transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-terminal-text-muted font-mono text-xs">
                {indicator.name}
              </span>
              {indicator.trend === "up" ? (
                <TrendingUp className="w-3 h-3 text-terminal-green" />
              ) : (
                <TrendingDown className="w-3 h-3 text-terminal-red" />
              )}
            </div>
            <div className="text-terminal-text font-mono text-sm font-semibold">
              {indicator.symbol}
            </div>
            <div className="text-terminal-text font-mono text-lg">
              {indicator.value}
            </div>
            <div
              className={`font-mono text-xs ${
                indicator.trend === "up"
                  ? "text-terminal-green"
                  : "text-terminal-red"
              }`}
            >
              {indicator.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketIndicators;
