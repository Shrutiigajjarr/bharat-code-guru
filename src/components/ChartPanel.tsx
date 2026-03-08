import { ReactNode } from 'react';

interface ChartPanelProps {
  title: string;
  children: ReactNode;
}

export function ChartPanel({ title, children }: ChartPanelProps) {
  return (
    <div className="glass-panel-elevated p-6 animate-fade-in">
      <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}
