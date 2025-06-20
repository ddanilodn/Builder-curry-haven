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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Lightbulb,
  AlertTriangle,
  Play,
  CheckCircle,
  Target,
  TrendingUp,
} from "lucide-react";
import { useIntelligence } from "@/hooks/useIntelligence";

const AIAnalysisTerminal = () => {
  const { aiAnalysis, isLoading, runAnalysis } = useIntelligence();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [typingEffect, setTypingEffect] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleAnalyze = async () => {
    setIsTyping(true);
    setTypingEffect("");
    await runAnalysis("ai_analysis");
    setLastUpdate(new Date());

    // Simulate typing effect for the summary
    if (aiAnalysis?.summary) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < aiAnalysis.summary.length) {
          setTypingEffect(aiAnalysis.summary.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 30);
    } else {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    // Auto-refresh every 4 minutes
    const interval = setInterval(() => {
      if (!isLoading.ai_analysis && !isTyping) {
        handleAnalyze();
      }
    }, 240000);

    return () => clearInterval(interval);
  }, [isLoading.ai_analysis, isTyping]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-terminal-green";
    if (confidence >= 60) return "text-terminal-blue";
    if (confidence >= 40) return "text-terminal-orange";
    return "text-terminal-red";
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 80) return "bg-terminal-green/20 border-terminal-green";
    if (confidence >= 60) return "bg-terminal-blue/20 border-terminal-blue";
    if (confidence >= 40) return "bg-terminal-orange/20 border-terminal-orange";
    return "bg-terminal-red/20 border-terminal-red";
  };

  return (
    <Card className="bg-terminal-surface border-terminal-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-terminal-blue" />
            <CardTitle className="text-terminal-text font-mono text-lg">
              TERMINAL DE ANÁLISES DA IA
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLoading.ai_analysis || isTyping
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
          Análises autônomas integrando sinais técnicos, eventos e linguagem
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading.ai_analysis || isTyping}
            className="bg-terminal-blue hover:bg-terminal-blue/80 text-white font-mono text-xs"
            size="sm"
          >
            <Play className="w-3 h-3 mr-1" />
            {isLoading.ai_analysis || isTyping
              ? "Processando..."
              : "Executar Análise"}
          </Button>
          <div className="flex items-center space-x-2 text-terminal-text-muted font-mono text-xs">
            <Brain className="w-3 h-3" />
            <span>IA Autônoma Ativa</span>
          </div>
        </div>

        {/* AI Analysis Results */}
        {aiAnalysis && (
          <div className="space-y-4">
            {/* Executive Summary */}
            <div
              className={`border rounded p-4 ${getConfidenceBg(aiAnalysis.confidence)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-terminal-text font-mono text-sm font-semibold">
                  SUMÁRIO EXECUTIVO
                </h4>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={`border-current font-mono text-xs ${getConfidenceColor(aiAnalysis.confidence)}`}
                    variant="outline"
                  >
                    {aiAnalysis.confidence}% CONFIANÇA
                  </Badge>
                  <Brain className="w-4 h-4 text-terminal-blue" />
                </div>
              </div>

              <div className="mb-3">
                <Progress value={aiAnalysis.confidence} className="h-2" />
              </div>

              <div className="text-terminal-text font-mono text-sm leading-relaxed">
                {isTyping ? typingEffect : aiAnalysis.summary}
                {isTyping && (
                  <span className="animate-pulse text-terminal-blue">|</span>
                )}
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="w-4 h-4 text-terminal-blue" />
                <h4 className="text-terminal-text font-mono text-sm font-semibold">
                  INSIGHTS PRINCIPAIS
                </h4>
              </div>
              <div className="space-y-2">
                {aiAnalysis.keyInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 bg-terminal-surface border border-terminal-border rounded p-2"
                  >
                    <CheckCircle className="w-3 h-3 text-terminal-green mt-0.5 flex-shrink-0" />
                    <span className="text-terminal-text font-mono text-xs leading-relaxed">
                      {insight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-terminal-red" />
                <h4 className="text-terminal-red font-mono text-sm font-semibold">
                  FATORES DE RISCO
                </h4>
              </div>
              <div className="space-y-2">
                {aiAnalysis.riskFactors.map((risk, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 bg-terminal-red/10 border border-terminal-red rounded p-2"
                  >
                    <AlertTriangle className="w-3 h-3 text-terminal-red mt-0.5 flex-shrink-0" />
                    <span className="text-terminal-text font-mono text-xs leading-relaxed">
                      {risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-4 h-4 text-terminal-green" />
                <h4 className="text-terminal-green font-mono text-sm font-semibold">
                  OPORTUNIDADES IDENTIFICADAS
                </h4>
              </div>
              <div className="space-y-2">
                {aiAnalysis.opportunities.map((opportunity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 bg-terminal-green/10 border border-terminal-green rounded p-2"
                  >
                    <TrendingUp className="w-3 h-3 text-terminal-green mt-0.5 flex-shrink-0" />
                    <span className="text-terminal-text font-mono text-xs leading-relaxed">
                      {opportunity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-terminal-bg border border-terminal-border rounded p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-4 h-4 text-terminal-blue" />
                <h4 className="text-terminal-blue font-mono text-sm font-semibold">
                  RECOMENDAÇÕES TÁTICAS
                </h4>
              </div>
              <div className="space-y-2">
                {aiAnalysis.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 bg-terminal-blue/10 border border-terminal-blue rounded p-2"
                  >
                    <span className="text-terminal-blue font-mono text-xs mt-0.5 flex-shrink-0">
                      {index + 1}.
                    </span>
                    <span className="text-terminal-text font-mono text-xs leading-relaxed">
                      {recommendation}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reasoning and Next Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-terminal-bg border border-terminal-border rounded p-4">
                <h4 className="text-terminal-text font-mono text-sm font-semibold mb-2">
                  FUNDAMENTAÇÃO
                </h4>
                <ScrollArea className="h-24">
                  <div className="text-terminal-text-muted font-mono text-xs leading-relaxed pr-2">
                    {aiAnalysis.reasoning}
                  </div>
                </ScrollArea>
              </div>

              <div className="bg-terminal-bg border border-terminal-border rounded p-4">
                <h4 className="text-terminal-text font-mono text-sm font-semibold mb-2">
                  PRÓXIMOS PASSOS
                </h4>
                <ScrollArea className="h-24">
                  <div className="space-y-1 pr-2">
                    {aiAnalysis.nextSteps.map((step, index) => (
                      <div
                        key={index}
                        className="text-terminal-text font-mono text-xs"
                      >
                        • {step}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Analysis Status */}
            <div className="bg-terminal-blue/10 border border-terminal-blue rounded p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-terminal-blue" />
                  <span className="text-terminal-blue font-mono text-sm">
                    Análise processada com sucesso
                  </span>
                </div>
                <div className="text-terminal-text-muted font-mono text-xs">
                  Próxima atualização em 4 minutos
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {(isLoading.ai_analysis || isTyping) && (
          <div className="flex items-center justify-center py-8 space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-terminal-blue rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-terminal-text font-mono text-sm">
              {isTyping ? "Gerando análise..." : "IA processando sinais..."}
            </span>
          </div>
        )}

        {/* Empty State */}
        {!aiAnalysis && !isLoading.ai_analysis && !isTyping && (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-terminal-gray mx-auto mb-4" />
            <div className="text-terminal-text-muted font-mono text-sm">
              Execute análise para gerar insights autônomos da IA
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAnalysisTerminal;
