interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ value, max = 100, label, showPercent = true, size = 'md' }: ProgressBarProps) {
  const percent = Math.min(Math.round((value / max) * 100), 100);
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between text-sm mb-1">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showPercent && <span className="font-semibold text-primary">{percent}%</span>}
        </div>
      )}
      <div className={`w-full bg-muted rounded-full overflow-hidden ${heights[size]}`}>
        <div className={`progress-bar-animated ${heights[size]}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
