export function RiskBar({ score, label }: { score: number; label: string }) {
  const pct = Math.min(100, Math.max(0, score * 10));
  const color =
    score <= 3 ? "var(--success)" : score <= 6 ? "var(--brand-lemon)" : "var(--brand-ruby)";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-[var(--ink-mute)]">Risk</span>
        <span className="font-normal" style={{ color }}>
          {label}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--canvas-soft)]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}