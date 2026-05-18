import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Settings as SettingsIcon, Database, Bell, User } from "lucide-react";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Configurações</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie preferências e integrações
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[1.5px] border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Integrações de Dados</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">API Analytics</p>
                <p className="text-xs text-muted-foreground">Conectado e sincronizado</p>
              </div>
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Database Principal</p>
                <p className="text-xs text-muted-foreground">PostgreSQL - Última sync 2 min atrás</p>
              </div>
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[1.5px] border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Notificações</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <p className="font-medium">Alertas de Performance</p>
              <div className="h-6 w-11 bg-primary rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <p className="font-medium">Relatórios Semanais</p>
              <div className="h-6 w-11 bg-primary rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
