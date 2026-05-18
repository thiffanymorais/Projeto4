import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertTriangle, TrendingUp, TrendingDown, Info } from "lucide-react";

const insights = [
  {
    type: "warning",
    title: "Atenção: Ticket Médio em Queda",
    message: "O ticket médio caiu 2.3% na última semana. Considere estratégias de upselling.",
    icon: AlertTriangle,
    color: "border-orange-200 bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    type: "success",
    title: "Crescimento Acelerado",
    message: "CAC/LTV ratio melhorou 15% no último trimestre. Estratégia de aquisição eficiente.",
    icon: TrendingUp,
    color: "border-green-200 bg-green-50",
    iconColor: "text-green-600",
  },
  {
    type: "info",
    title: "Insight Preditivo",
    message: "Análise sugere aumento de 8% na receita se expandir campanhas de email em 20%.",
    icon: Info,
    color: "border-blue-200 bg-blue-50",
    iconColor: "text-blue-600",
  },
];

export function InsightsCard() {
  return (
    <Card className="border-[1.5px] border-border shadow-sm">
      <CardHeader>
        <CardTitle>
          <h3 className="text-lg font-semibold">Alertas e Insights</h3>
          <p className="text-sm text-muted-foreground font-normal mt-1">
            Análises automáticas em tempo real
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`flex items-start gap-3 p-4 rounded-xl border-[1.5px] ${insight.color}`}
          >
            <div className={`mt-0.5 ${insight.iconColor}`}>
              <insight.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground mb-1">{insight.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{insight.message}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
