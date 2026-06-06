import { Sparkles } from "lucide-react";
import { type ReactNode } from "react";

export function Insight({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-[var(--brand-indigo-subdued)] bg-[var(--brand-indigo-subdued)]/25 p-4">
      <Sparkles size={18} className="mt-0.5 shrink-0 text-[var(--brand-indigo-deep)]" />
      <p className="text-[14px] leading-relaxed text-[var(--ink-secondary)]">{children}</p>
    </div>
  );
}

export function Warning({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--brand-ruby)]/30 bg-[oklch(0.97_0.04_18)] p-4">
      <div className="eyebrow mb-1" style={{ color: "var(--brand-ruby)" }}>
        Worst case
      </div>
      <p className="text-[14px] leading-relaxed text-[var(--ink)]">{children}</p>
    </div>
  );
}