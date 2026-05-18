import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  iconBgColor?: string;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon: Icon,
  iconBgColor = "bg-accent"
}: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="border-[1.5px] border-border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`${iconBgColor} rounded-xl p-3`}>
            <Icon className="h-6 w-6 text-accent-foreground" />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-semibold text-foreground mb-3">{value}</h3>
          
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
              isPositive ? "bg-green-50" : "bg-red-50"
            }`}>
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-600" />
              )}
              <span className={`text-xs font-semibold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}>
                {isPositive ? "+" : ""}{change}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{changeLabel}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
