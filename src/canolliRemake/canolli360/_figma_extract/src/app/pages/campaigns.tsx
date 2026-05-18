import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell, ReferenceLine, ErrorBar } from "recharts";
import { Lightbulb, TrendingUp, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

const campaignsData = [
  {
    id: 1,
    name: "Email Spring Sale",
    conversionRate: 8.5,
    messages: 15400,
    roi: 4.2,
    status: "active",
    channel: "Email"
  },
  {
    id: 2,
    name: "SMS Flash Promo",
    conversionRate: 12.3,
    messages: 8200,
    roi: 6.8,
    status: "active",
    channel: "SMS"
  },
  {
    id: 3,
    name: "Push - Weekend Deals",
    conversionRate: 6.7,
    messages: 22100,
    roi: 3.5,
    status: "active",
    channel: "Push"
  },
  {
    id: 4,
    name: "Email Loyalty Rewards",
    conversionRate: 15.8,
    messages: 5600,
    roi: 9.2,
    status: "paused",
    channel: "Email"
  },
  {
    id: 5,
    name: "WhatsApp New Menu",
    conversionRate: 11.2,
    messages: 12800,
    roi: 5.4,
    status: "active",
    channel: "WhatsApp"
  },
];

const abTestData = [
  {
    variant: "Campanha A",
    conversions: 245,
    impressions: 3200,
    rate: 7.66,
    errorLow: 0.3,
    errorHigh: 0.3,
  },
  {
    variant: "Campanha B",
    conversions: 412,
    impressions: 3150,
    rate: 13.08,
    errorLow: 0.4,
    errorHigh: 0.4,
  },
];

// Scatter plot data for regression analysis
const regressionData = [
  { messages: 5600, roi: 9.2 },
  { messages: 8200, roi: 6.8 },
  { messages: 12800, roi: 5.4 },
  { messages: 15400, roi: 4.2 },
  { messages: 22100, roi: 3.5 },
  { messages: 18000, roi: 4.8 },
  { messages: 9500, roi: 6.2 },
  { messages: 7200, roi: 7.5 },
  { messages: 13500, roi: 5.0 },
  { messages: 11000, roi: 5.8 },
];

export function CampaignsPage() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Campanhas de Marketing</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Análise de performance e testes A/B
          </p>
        </div>
      </div>

      {/* Active Campaigns Table */}
      <Card className="border-[1.5px] border-border shadow-sm">
        <CardHeader>
          <CardTitle>
            <h3 className="text-lg font-semibold">Campanhas Ativas</h3>
            <p className="text-sm text-muted-foreground font-normal mt-1">
              Passe o mouse para detalhar métricas
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Campanha</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead className="text-right">Taxa de Conversão</TableHead>
                <TableHead className="text-right">Nº de Mensagens</TableHead>
                <TableHead className="text-right">ROI</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignsData.map((campaign) => (
                <TableRow
                  key={campaign.id}
                  className="transition-colors cursor-pointer"
                  style={{
                    backgroundColor: hoveredRow === campaign.id ? '#FFF4ED' : 'transparent'
                  }}
                  onMouseEnter={() => setHoveredRow(campaign.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center justify-between">
                      {campaign.name}
                      {hoveredRow === campaign.id && (
                        <span className="ml-4 text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-md">
                          DETALHAR →
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-muted border-border">
                      {campaign.channel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-green-600">
                    {campaign.conversionRate}%
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.messages.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {campaign.roi}x
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={campaign.status === "active" ? "default" : "secondary"}
                      className={campaign.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                    >
                      {campaign.status === "active" ? "Ativa" : "Pausada"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* A/B Test Results and Predictive Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* A/B Test Comparison */}
        <Card className="border-[1.5px] border-border shadow-sm">
          <CardHeader>
            <CardTitle>
              <h3 className="text-lg font-semibold">Teste A/B - Email Marketing</h3>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                Comparação com intervalos de confiança (95%)
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={abTestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" />
                <XAxis 
                  dataKey="variant" 
                  stroke="#667085"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#667085"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'Taxa de Conversão (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                />
                <Tooltip 
                  formatter={(value: number) => `${value.toFixed(2)}%`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1.5px solid #E4E7EC',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Bar 
                  dataKey="rate" 
                  fill="#FF7A00" 
                  radius={[8, 8, 0, 0]}
                >
                  <ErrorBar 
                    dataKey="errorLow" 
                    width={4} 
                    strokeWidth={2} 
                    stroke="#0D1440"
                    direction="y"
                  />
                  {abTestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 1 ? "#0D1440" : "#FF7A00"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 p-4 bg-green-50 border-[1.5px] border-green-200 rounded-xl">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-green-900">Campanha B vencedora</p>
                  <p className="text-xs text-green-700 mt-1">
                    Conversão 70.5% maior com significância estatística (p &lt; 0.01)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predictive Insights */}
        <Card className="border-[1.5px] border-border shadow-sm">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Insights Preditivos</h3>
              </div>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                Recomendações baseadas em Machine Learning
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-accent border-[1.5px] border-primary/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Nova Campanha Sugerida: "Weekend Brunch"</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Canal:</strong> Email + SMS combinado<br />
                    <strong>Público-alvo:</strong> 8.500 clientes segmentados<br />
                    <strong>ROI Previsto:</strong> 7.2x (±0.8)<br />
                    <strong>Conversão Esperada:</strong> 14.5%
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border-[1.5px] border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-blue-900">Otimização de Horário</p>
                  <p className="text-xs text-blue-700 mt-2">
                    Enviar campanhas de email às 18h aumenta conversão em média 23% vs 10h
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border-[1.5px] border-purple-200 rounded-xl">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-purple-900">Segmentação Preditiva</p>
                  <p className="text-xs text-purple-700 mt-2">
                    2.300 clientes com 78% de probabilidade de conversão em promoções de sobremesas
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regression Analysis - ROI vs Message Volume */}
      <Card className="border-[1.5px] border-border shadow-sm">
        <CardHeader>
          <CardTitle>
            <h3 className="text-lg font-semibold">Análise de Regressão: ROI vs Volume de Mensagens</h3>
            <p className="text-sm text-muted-foreground font-normal mt-1">
              Correlação e linha de tendência linear
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" />
              <XAxis 
                type="number" 
                dataKey="messages" 
                name="Mensagens"
                stroke="#667085"
                style={{ fontSize: '12px' }}
                label={{ value: 'Número de Mensagens', position: 'insideBottom', offset: -5, style: { fontSize: '12px' } }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                type="number" 
                dataKey="roi" 
                name="ROI"
                stroke="#667085"
                style={{ fontSize: '12px' }}
                label={{ value: 'ROI (x)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value: number, name: string) => {
                  if (name === "roi") return [`${value.toFixed(1)}x`, "ROI"];
                  return [value.toLocaleString('pt-BR'), "Mensagens"];
                }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1.5px solid #E4E7EC',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              
              {/* Regression line (calculated: y = -0.00025x + 9.5) */}
              <ReferenceLine 
                segment={[
                  { x: 5000, y: 8.25 },
                  { x: 23000, y: 3.75 }
                ]}
                stroke="#0D1440" 
                strokeWidth={2}
                strokeDasharray="5 5"
                label={{ value: 'Linha de Regressão', position: 'top', fill: '#0D1440', fontSize: 11 }}
              />
              
              <Scatter 
                name="Campanhas" 
                data={regressionData} 
                fill="#FF7A00"
              >
                {regressionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#FF7A00" />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          
          <div className="mt-4 p-4 bg-muted rounded-xl">
            <p className="text-sm">
              <strong>Equação de Regressão:</strong> ROI = -0.00025 × Mensagens + 9.5<br />
              <strong>R² (Coeficiente de Determinação):</strong> 0.87 (correlação negativa forte)<br />
              <strong>Interpretação:</strong> Campanhas menores e mais segmentadas tendem a ter ROI superior.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
