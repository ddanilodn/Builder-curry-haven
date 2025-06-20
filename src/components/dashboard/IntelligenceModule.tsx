import { Button } from "@/components/ui/button";
import {
  Play,
  BarChart3,
  TrendingUp,
  Globe,
  FileText,
  Users,
  DollarSign,
  Activity,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface IntelligenceModuleProps {
  title: string;
  type: string;
  isAnalyzing?: boolean;
  onSimulate?: () => void;
}

const IntelligenceModule = ({
  title,
  type,
  isAnalyzing = false,
  onSimulate,
}: IntelligenceModuleProps) => {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getModuleIcon = (type: string) => {
    switch (type) {
      case "volume":
        return BarChart3;
      case "documents":
        return FileText;
      case "macro":
        return Globe;
      case "narrative":
        return Users;
      case "correlation":
        return TrendingUp;
      case "microstructure":
        return Activity;
      case "volatility":
        return DollarSign;
      case "thesis":
        return Zap;
      case "compression":
        return Activity;
      default:
        return BarChart3;
    }
  };

  const getAnalysisResult = (type: string) => {
    const results = {
      volume:
        "PETR4 Call 28.75 19/07 - Volume anômalo +340% | Sugestão: Long Straddle PETR4 28.75",
      documents:
        "Ata COPOM detectou tom dovish | Sugestão: Short DI Futuro DI1F26 via spread",
      macro:
        "Fed pivot probabilidade 73% | Sugestão: Long Volatilidade via VIX calls",
      narrative:
        "Sentimento PETR4 vs fundamentos divergindo | Sugestão: Pair trade PETR4/VALE3",
      correlation:
        "USDBRL/DI correlação em mínimos históricos | Sugestão: Hedge currency via options",
      microstructure:
        "Delta flow negativo IBOV | Sugestão: Short gamma via put spread",
      volatility:
        "Term structure invertida detectada | Sugestão: Calendar spread vol",
      thesis:
        "Convergência macro + micro confirmada | Sugestão: Iron Condor IBOV",
      compression:
        "Vol implícita 15° percentil | Sugestão: Long vol via straddle barato",
    };
    return (
      results[type as keyof typeof results] || "Análise em processamento..."
    );
  };

  const handleSimulate = () => {
    setLoading(true);
    setAnalysis("");

    setTimeout(() => {
      setAnalysis(getAnalysisResult(type));
      setLoading(false);
    }, 2000);

    onSimulate?.();
  };

  const IconComponent = getModuleIcon(type);

  return (
    <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4 hover:border-terminal-blue transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <IconComponent className="w-5 h-5 text-terminal-blue" />
          <h3 className="text-terminal-text font-mono text-sm font-semibold">
            {title}
          </h3>
        </div>
        <div
          className={`w-2 h-2 rounded-full ${
            isAnalyzing ? "bg-terminal-green animate-pulse" : "bg-terminal-gray"
          }`}
        ></div>
      </div>

      {/* Mini Chart/Visual */}
      <div className="h-20 bg-terminal-bg border border-terminal-border rounded mb-4 flex items-center justify-center">
        <div className="flex space-x-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-terminal-blue opacity-60"
              style={{
                height: `${Math.random() * 60 + 10}px`,
                animation: `pulse ${2 + Math.random() * 2}s infinite`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleSimulate}
        disabled={loading}
        className="w-full mb-3 bg-terminal-blue hover:bg-terminal-blue/80 text-white font-mono text-xs"
        size="sm"
      >
        <Play className="w-3 h-3 mr-1" />
        {loading ? "Analisando..." : "Simular Análise"}
      </Button>

      {(analysis || loading) && (
        <div className="bg-terminal-bg border border-terminal-border rounded p-3">
          <div className="text-terminal-text-muted font-mono text-xs mb-1">
            SAÍDA IA:
          </div>
          <div className="text-terminal-text font-mono text-xs leading-relaxed">
            {loading ? (
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-terminal-blue rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-terminal-blue rounded-full animate-bounce delay-100"></div>
                  <div className="w-1 h-1 bg-terminal-blue rounded-full animate-bounce delay-200"></div>
                </div>
                <span>Processando...</span>
              </div>
            ) : (
              analysis
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntelligenceModule;
