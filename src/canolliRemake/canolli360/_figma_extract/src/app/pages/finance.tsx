import { KPICard } from "../components/kpi-card";
import { RevenueCostChart } from "../components/revenue-cost-chart";
import { InsightsCard } from "../components/insights-card";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { useState } from "react";

const categoryData = [
  { category: "Entradas", valor: 185000 },
  { category: "Pratos Principais", valor: 245000 },
  { category: "Sobremesas", valor: 95000 },
  { category: "Bebidas", valor: 85000 },
];

const restaurantData = [
  { 
    id: 1,
    name: "Bistrô Gourmet", 
    revenue: 185000, 
    customers: 1250, 
    avgTicket: 148,
    growth: 12.5,
    status: "Excelente"
  },
  { 
    id: 2,
    name: "Cantina Italiana", 
    revenue: 152000, 
    customers: 980, 
    avgTicket: 155,
    growth: 8.3,
    status: "Muito Bom"
  },
  { 
    id: 3,
    name: "Sushi Express", 
    revenue: 142000, 
    customers: 890, 
    avgTicket: 159,
    growth: -2.1,
    status: "Atenção"
  },
  { 
    id: 4,
    name: "Pizza Napoletana", 
    revenue: 131000, 
    customers: 1100, 
    avgTicket: 119,
    growth: 15.2,
    status: "Excelente"
  },
];

export function FinancePage() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* KPI Cards - Bento Grid Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Receita Total"
          value="R$ 610.000"
          change={12.5}
          changeLabel="vs mês anterior"
          icon={DollarSign}
        />
        <KPICard
          title="Ticket Médio"
          value="R$ 147,50"
          change={-2.3}
          changeLabel="vs semana anterior"
          icon={ShoppingCart}
        />
        <KPICard
          title="Clientes Ativos"
          value="4.220"
          change={8.7}
          changeLabel="vs mês anterior"
          icon={Users}
        />
        <KPICard
          title="CAC/LTV Ratio"
          value="1:4.8"
          change={15.2}
          changeLabel="melhoria trimestral"
          icon={TrendingUp}
        />
      </div>

      {/* Main Chart and Insights - Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueCostChart />
        </div>
        <div className="lg:col-span-1">
          <InsightsCard />
        </div>
      </div>

      {/* Category Performance and Restaurant Table */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Category Performance Chart */}
        <div className="lg:col-span-2">
          <Card className="border-[1.5px] border-border shadow-sm h-full">
            <CardHeader>
              <CardTitle>
                <h3 className="text-lg font-semibold">Performance por Categoria</h3>
                <p className="text-sm text-muted-foreground font-normal mt-1">
                  Receita por tipo de produto
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" />
                  <XAxis 
                    type="number"
                    stroke="#667085"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                  />
                  <YAxis 
                    type="category"
                    dataKey="category" 
                    stroke="#667085"
                    style={{ fontSize: '12px' }}
                    width={120}
                  />
                  <Tooltip 
                    formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1.5px solid #E4E7EC',
                      borderRadius: '12px',
                      padding: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="valor" 
                    fill="#FF7A00" 
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Restaurant Performance Table with Drill-down */}
        <div className="lg:col-span-3">
          <Card className="border-[1.5px] border-border shadow-sm h-full">
            <CardHeader>
              <CardTitle>
                <h3 className="text-lg font-semibold">Performance por Restaurante Parceiro</h3>
                <p className="text-sm text-muted-foreground font-normal mt-1">
                  Passe o mouse para detalhar
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Restaurante</TableHead>
                    <TableHead className="text-right">Receita</TableHead>
                    <TableHead className="text-right">Clientes</TableHead>
                    <TableHead className="text-right">Ticket Médio</TableHead>
                    <TableHead className="text-right">Crescimento</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restaurantData.map((restaurant) => (
                    <TableRow 
                      key={restaurant.id}
                      className="transition-colors cursor-pointer"
                      style={{
                        backgroundColor: hoveredRow === restaurant.id ? '#FFF4ED' : 'transparent'
                      }}
                      onMouseEnter={() => setHoveredRow(restaurant.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center justify-between">
                          {restaurant.name}
                          {hoveredRow === restaurant.id && (
                            <span className="ml-4 text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-md">
                              DETALHAR →
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        R$ {restaurant.revenue.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        {restaurant.customers.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        R$ {restaurant.avgTicket.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={restaurant.growth >= 0 ? "text-green-600" : "text-red-600"}>
                          {restaurant.growth >= 0 ? "+" : ""}{restaurant.growth}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant="outline"
                          className={
                            restaurant.status === "Excelente" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : restaurant.status === "Muito Bom"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-orange-50 text-orange-700 border-orange-200"
                          }
                        >
                          {restaurant.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
