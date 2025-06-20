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
import { FileText, Brain, AlertCircle, Play, CheckCircle } from "lucide-react";
import { useIntelligence } from "@/hooks/useIntelligence";

const DocumentAnalysis = () => {
  const { documentSentiment, isLoading, runAnalysis } = useIntelligence();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleAnalyze = async () => {
    await runAnalysis("documents");
    setLastUpdate(new Date());
  };

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      if (!isLoading.documents) {
        handleAnalyze();
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [isLoading.documents]);

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.2) return "text-terminal-green";
    if (sentiment < -0.2) return "text-terminal-red";
    return "text-terminal-orange";
  };

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment > 0.3) return "MUITO POSITIVO";
    if (sentiment > 0.1) return "POSITIVO";
    if (sentiment > -0.1) return "NEUTRO";
    if (sentiment > -0.3) return "NEGATIVO";
    return "MUITO NEGATIVO";
  };

  const getEmotionalToneIcon = (tone: string) => {
    switch (tone) {
      case "aggressive":
        return "🔥";
      case "defensive":
        return "🛡️";
      case "optimistic":
        return "📈";
      case "pessimistic":
        return "📉";
      default:
        return "⚖️";
    }
  };

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-terminal-blue" />
            <CardTitle className="text-terminal-text font-mono text-lg">
              ANÁLISE DE DOCUMENTOS E LINGUAGEM
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLoading.documents
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
          Processa balanços, atas e comunicados detectando sinais ocultos
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading.documents}
            className="bg-terminal-blue hover:bg-terminal-blue/80 text-white font-mono text-xs"
            size="sm"
          >
            <Play className="w-3 h-3 mr-1" />
            {isLoading.documents ? "Processando..." : "Analisar Documentos"}
          </Button>
          <div className="flex items-center space-x-2 text-terminal-text-muted font-mono text-xs">
            <Brain className="w-3 h-3" />
            <span>IA Linguística Ativa</span>
          </div>
        </div>

        {/* Document Analysis Results */}
        {documentSentiment.length > 0 && (
          <div className="space-y-4">
            {documentSentiment.map((doc, index) => (
              <div
                key={index}
                className="bg-terminal-bg border border-terminal-border rounded p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-terminal-text font-mono text-sm font-semibold">
                      {doc.source}
                    </h4>
                    <Badge
                      className={`bg-terminal-surface ${getSentimentColor(doc.sentiment)} border-current font-mono text-xs`}
                      variant="outline"
                    >
                      {getSentimentLabel(doc.sentiment)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-terminal-text-muted font-mono text-xs">
                      {getEmotionalToneIcon(doc.emotionalTone)}
                    </span>
                    <span className="text-terminal-text-muted font-mono text-xs">
                      {doc.emotionalTone.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Sentiment Score */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Score de Sentimento
                    </span>
                    <span className="text-terminal-text font-mono text-xs">
                      {doc.sentiment.toFixed(2)}
                    </span>
                  </div>
                  <Progress value={(doc.sentiment + 1) * 50} className="h-2" />
                </div>

                {/* Confidence Level */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-terminal-text-muted font-mono text-xs">
                      Nível de Confiança
                    </span>
                    <span className="text-terminal-text font-mono text-xs">
                      {(doc.confidenceLevel * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={doc.confidenceLevel * 100} className="h-2" />
                </div>

                {/* Key Terms */}
                <div className="mb-3">
                  <h5 className="text-terminal-text-muted font-mono text-xs mb-2">
                    TERMOS-CHAVE IDENTIFICADOS:
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {doc.keyTerms.map((term, termIndex) => (
                      <Badge
                        key={termIndex}
                        className="bg-terminal-blue/20 text-terminal-blue border-terminal-blue font-mono text-xs"
                        variant="outline"
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Risk Indicators */}
                {doc.riskIndicators.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-1 mb-2">
                      <AlertCircle className="w-3 h-3 text-terminal-red" />
                      <h5 className="text-terminal-red font-mono text-xs">
                        INDICADORES DE RISCO:
                      </h5>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {doc.riskIndicators.map((risk, riskIndex) => (
                        <Badge
                          key={riskIndex}
                          className="bg-terminal-red/20 text-terminal-red border-terminal-red font-mono text-xs"
                          variant="outline"
                        >
                          {risk}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading.documents && (
          <div className="flex items-center justify-center py-8 space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-terminal-text font-mono text-sm">
              Processando documentos...
            </span>
          </div>
        )}

        {/* Empty State */}
        {documentSentiment.length === 0 && !isLoading.documents && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-terminal-gray mx-auto mb-4" />
            <div className="text-terminal-text-muted font-mono text-sm">
              Execute análise para processar documentos recentes
            </div>
          </div>
        )}

        {/* Analysis Status */}
        {documentSentiment.length > 0 && !isLoading.documents && (
          <div className="bg-terminal-bg border border-terminal-green rounded p-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-terminal-green" />
              <span className="text-terminal-green font-mono text-sm">
                Análise concluída - {documentSentiment.length} documentos
                processados
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentAnalysis;
