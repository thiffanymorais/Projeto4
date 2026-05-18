import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from "recharts";

const data = [
  { month: "Jan", receita: 285000, custoVariavel: 156000, ci_lower: 275000, ci_upper: 295000 },
  { month: "Fev", receita: 310000, custoVariavel: 168000, ci_lower: 298000, ci_upper: 322000 },
  { month: "Mar", receita: 345000, custoVariavel: 182000, ci_lower: 332000, ci_upper: 358000 },
  { month: "Abr", receita: 328000, custoVariavel: 175000, ci_lower: 315000, ci_upper: 341000 },
  { month: "Mai", receita: 385000, custoVariavel: 198000, ci_lower: 370000, ci_upper: 400000 },
  { month: "Jun", receita: 420000, custoVariavel: 215000, ci_lower: 405000, ci_upper: 435000 },
  { month: "Jul", receita: 455000, custoVariavel: 228000, ci_lower: 438000, ci_upper: 472000 },
  { month: "Ago", receita: 490000, custoVariavel: 245000, ci_lower: 471000, ci_upper: 509000 },
  { month: "Set", receita: 475000, custoVariavel: 238000, ci_lower: 457000, ci_upper: 493000 },
  { month: "Out", receita: 520000, custoVariavel: 258000, ci_lower: 500000, ci_upper: 540000 },
  { month: "Nov", receita: 565000, custoVariavel: 278000, ci_lower: 543000, ci_upper: 587000 },
  { month: "Dez", receita: 610000, custoVariavel: 298000, ci_lower: 587000, ci_upper: 633000 },
];

export function RevenueCostChart() {
  return (
    <Card className="border-[1.5px] border-border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Receita Mensal vs Custos Variáveis</h3>
            <p className="text-sm text-muted-foreground font-normal mt-1">
              Com Intervalo de Confiança de 95%
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#FF7A00]"></div>
              <span>Receita</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#0D1440]"></div>
              <span>Custos Variáveis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-8 rounded bg-[#FF7A00]/20"></div>
              <span>IC 95%</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF7A00" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#FF7A00" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" />
            <XAxis 
              dataKey="month" 
              stroke="#667085"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#667085"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
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
            
            {/* Confidence Interval Area */}
            <Area
              type="monotone"
              dataKey="ci_upper"
              stroke="none"
              fill="url(#colorCI)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="ci_lower"
              stroke="none"
              fill="white"
              fillOpacity={1}
            />
            
            {/* Revenue Line */}
            <Line 
              type="monotone" 
              dataKey="receita" 
              stroke="#FF7A00" 
              strokeWidth={3}
              dot={{ fill: '#FF7A00', r: 5, strokeWidth: 2, stroke: 'white' }}
              name="Receita"
            />
            
            {/* Variable Cost Line */}
            <Line 
              type="monotone" 
              dataKey="custoVariavel" 
              stroke="#0D1440" 
              strokeWidth={3}
              dot={{ fill: '#0D1440', r: 5, strokeWidth: 2, stroke: 'white' }}
              name="Custos Variáveis"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
