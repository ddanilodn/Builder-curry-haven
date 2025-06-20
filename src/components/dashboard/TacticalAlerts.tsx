import { AlertTriangle, Activity, Zap } from "lucide-react";

const TacticalAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: "macro",
      title: "Evento macro iminente",
      description: "FOMC em 48h - Volatilidade implícita subindo",
      priority: "high",
      time: "14:23",
      icon: AlertTriangle,
    },
    {
      id: 2,
      type: "narrative",
      title: "Narrativa dissonante",
      description: "Petróleo vs PETR4 - Correlação quebrada",
      priority: "medium",
      time: "14:15",
      icon: Activity,
    },
    {
      id: 3,
      type: "correlation",
      title: "Quebra de correlação detectada",
      description: "USDBRL vs DI - Desvio de 2.3 sigmas",
      priority: "high",
      time: "14:08",
      icon: Zap,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-terminal-red text-terminal-red";
      case "medium":
        return "border-terminal-orange text-terminal-orange";
      default:
        return "border-terminal-gray text-terminal-gray";
    }
  };

  return (
    <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-terminal-text font-mono text-lg font-semibold">
          ALERTAS TÁTICOS
        </h2>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-terminal-red rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-terminal-orange rounded-full animate-pulse delay-75"></div>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const IconComponent = alert.icon;
          return (
            <div
              key={alert.id}
              className={`bg-terminal-bg border rounded p-3 hover:bg-terminal-surface transition-colors ${getPriorityColor(alert.priority)}`}
            >
              <div className="flex items-start space-x-3">
                <IconComponent className="w-4 h-4 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-terminal-text font-mono text-sm font-semibold">
                      {alert.title}
                    </h3>
                    <span className="text-terminal-text-muted font-mono text-xs">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-terminal-text-muted font-mono text-xs mt-1">
                    {alert.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TacticalAlerts;
