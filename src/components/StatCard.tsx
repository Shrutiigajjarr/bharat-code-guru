import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  change?: string;
  color?: string;
}

export function StatCard({ icon, label, value, change, color = 'primary' }: StatCardProps) {
  return (
    <div className="stat-card group animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${color}/10 text-${color} text-lg`}>
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${change.startsWith('+') ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
