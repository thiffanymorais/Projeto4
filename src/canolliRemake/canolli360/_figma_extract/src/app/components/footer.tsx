import { CheckCircle2, Clock } from "lucide-react";

export function Footer() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <footer className="border-t bg-white px-8 py-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            <span>Última atualização: <strong>Tempo Real (Simulado)</strong> - {timeString}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
            <span>Qualidade dos Dados: <strong className="text-green-600">99.8%</strong></span>
          </div>
        </div>
        <div className="text-muted-foreground">
          © 2026 Cannoli Foodtech Analytics Platform
        </div>
      </div>
    </footer>
  );
}
