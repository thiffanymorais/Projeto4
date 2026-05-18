import { Calendar, Bell, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

export function TopBar() {
  const currentDate = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="border-b bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Cannoli Foodtech</h1>
          <p className="text-sm text-muted-foreground capitalize">{currentDate}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Date Filter */}
          <Select defaultValue="last30">
            <SelectTrigger className="w-[180px] bg-input-background border-border">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="last7">Últimos 7 dias</SelectItem>
              <SelectItem value="last30">Últimos 30 dias</SelectItem>
              <SelectItem value="last90">Últimos 90 dias</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>

          {/* Restaurant Partner Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px] bg-input-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Restaurantes</SelectItem>
              <SelectItem value="partner1">Bistrô Gourmet</SelectItem>
              <SelectItem value="partner2">Cantina Italiana</SelectItem>
              <SelectItem value="partner3">Sushi Express</SelectItem>
              <SelectItem value="partner4">Pizza Napoletana</SelectItem>
            </SelectContent>
          </Select>

          {/* Notifications */}
          <Button variant="outline" size="icon" className="relative border-border">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Profile */}
          <Button variant="outline" className="gap-2 border-border">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <span className="hidden md:inline">João Dias</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
