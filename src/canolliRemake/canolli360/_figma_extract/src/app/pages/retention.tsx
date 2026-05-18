import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Users, Repeat, UserX, Award } from "lucide-react";
import { KPICard } from "../components/kpi-card";

const retentionData = [
  { month: "Jan", taxa: 68, churn: 32, nps: 72 },
  { month: "Fev", taxa: 71, churn: 29, nps: 74 },
  { month: "Mar", taxa: 74, churn: 26, nps: 76 },
  { month: "Abr", taxa: 72, churn: 28, nps: 75 },
  { month: "Mai", taxa: 76, churn: 24, nps: 78 },
  { month: "Jun", taxa: 79, churn: 21, nps: 81 },
  { month: "Jul", taxa: 81, churn: 19, nps: 82 },
  { month: "Ago", taxa: 83, churn: 17, nps: 84 },
];

const cohortData = [
  { cohort: "Jan 2026", mes1: 100, mes2: 82, mes3: 74, mes4: 68 },
  { cohort: "Fev 2026", mes1: 100, mes2: 85, mes3: 78, mes4: 72 },
  { cohort: "Mar 2026", mes1: 100, mes2: 87, mes3: 81, mes4: 76 },
  { cohort: "Abr 2026", mes1: 100, mes2: 89, mes3: 84, mes4: 79 },
];

export function RetentionPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold">Retenção de Clientes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Análise de comportamento e fidelidade
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Taxa de Retenção"
          value="83%"
          change={12.3}
          changeLabel="vs trimestre anterior"
          icon={Repeat}
        />
        <KPICard
          title="Taxa de Churn"
          value="17%"
          change={-15.8}
          changeLabel="redução trimestral"
          icon={UserX}
        />
        <KPICard
          title="NPS Score"
          value="84"
          change={8.5}
          changeLabel="vs mês anterior"
          icon={Award}
        />
        <KPICard
          title="Lifetime Value"
          value="R$ 2.845"
          change={18.2}
          changeLabel="vs trimestre anterior"
          icon={Users}
        />
      </div>

      {/* Retention Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[1.5px] border-border shadow-sm">
          <CardHeader>
            <CardTitle>
              <h3 className="text-lg font-semibold">Evolução da Retenção</h3>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                Taxa de retenção mensal
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={retentionData}>
                <defs>
                  <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#12B76A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#12B76A" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" />
                <XAxis dataKey="month" stroke="#667085" style={{ fontSize: '12px' }} />
                <YAxis stroke="#667085" style={{ fontSize: '12px' }} />
                <Tooltip 
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1.5px solid #E4E7EC',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="taxa" 
                  stroke="#12B76A" 
                  strokeWidth={3}
                  fill="url(#colorRetention)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[1.5px] border-border shadow-sm">
          <CardHeader>
            <CardTitle>
              <h3 className="text-lg font-semibold">NPS e Churn</h3>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                Métricas de satisfação
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" />
                <XAxis dataKey="month" stroke="#667085" style={{ fontSize: '12px' }} />
                <YAxis stroke="#667085" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1.5px solid #E4E7EC',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="nps" 
                  stroke="#FF7A00" 
                  strokeWidth={3}
                  dot={{ fill: '#FF7A00', r: 4 }}
                  name="NPS"
                />
                <Line 
                  type="monotone" 
                  dataKey="churn" 
                  stroke="#F04438" 
                  strokeWidth={3}
                  dot={{ fill: '#F04438', r: 4 }}
                  name="Churn %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cohort Analysis */}
      <Card className="border-[1.5px] border-border shadow-sm">
        <CardHeader>
          <CardTitle>
            <h3 className="text-lg font-semibold">Análise de Coorte</h3>
            <p className="text-sm text-muted-foreground font-normal mt-1">
              Retenção por grupo de entrada
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-[1.5px] border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold">Coorte</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold">Mês 1</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold">Mês 2</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold">Mês 3</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold">Mês 4</th>
                </tr>
              </thead>
              <tbody>
                {cohortData.map((cohort, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{cohort.cohort}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-block px-3 py-1 rounded-md bg-green-100 text-green-800 font-semibold">
                        {cohort.mes1}%
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-block px-3 py-1 rounded-md bg-green-50 text-green-700">
                        {cohort.mes2}%
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-block px-3 py-1 rounded-md bg-orange-50 text-orange-700">
                        {cohort.mes3}%
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-block px-3 py-1 rounded-md bg-orange-100 text-orange-800">
                        {cohort.mes4}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
