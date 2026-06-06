import { createFileRoute } from "@tanstack/react-router";
import { Container, Shell } from "@/components/app/Shell";
import { useInvestStore, formatINR } from "@/lib/stores";
import { generateNavHistory, getOptionById } from "@/lib/mock-data";
import { PillLink } from "@/components/app/Pill";
import { Mounted } from "@/components/app/Mounted";
import { useMemo } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  component: () => (
    <Mounted>
      <Portfolio />
    </Mounted>
  ),
});

function Portfolio() {
  const { portfolio, getCurrentValue, getTotalInvested } = useInvestStore();
  const total = getTotalInvested();
  const current = getCurrentValue();
  const pnl = current - total;
  const pnlPct = total > 0 ? (pnl / total) * 100 : 0;
  const history = useMemo(() => generateNavHistory(30), []);

  if (portfolio.length === 0) {
    return (
      <Shell>
        <Container className="pt-12">
          <div className="rounded-2xl border border-dashed border-[var(--hairline)] bg-white p-8 text-center">
            <div className="text-5xl">🌱</div>
            <h2 className="display-lg mt-4">No investments yet</h2>
            <p className="mt-2 text-[14px] text-[var(--ink-mute)]">
              Start with a mock ₹500 to see how this all works.
            </p>
            <div className="mt-6">
              <PillLink to="/compare">Pick an option →</PillLink>
            </div>
          </div>
        </Container>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="gradient-mesh h-40" />
      <Container className="-mt-28">
        <div className="rounded-2xl border border-[var(--hairline)] bg-white p-5 shadow-sm">
          <div className="eyebrow">Current value</div>
          <div className="tnum mt-1 text-4xl font-light text-[var(--ink)]">{formatINR(current)}</div>
          <div className="mt-2 inline-flex items-center gap-1 text-[13px]" style={{ color: pnl >= 0 ? "var(--success)" : "var(--brand-ruby)" }}>
            <TrendingUp size={14} />
            <span className="tnum">
              {pnl >= 0 ? "+" : ""}
              {formatINR(pnl)} ({pnlPct >= 0 ? "+" : ""}
              {pnlPct.toFixed(2)}%)
            </span>
            <span className="text-[var(--ink-mute)]">since you started</span>
          </div>

          <div className="mt-4 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Line
                  type="monotone"
                  dataKey="nav"
                  stroke="var(--brand-indigo)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <h3 className="eyebrow mt-8 mb-3">Holdings</h3>
        <div className="space-y-3">
          {portfolio.map((h, i) => {
            const opt = getOptionById(h.optionId);
            const days = Math.max(1, (Date.now() - new Date(h.date).getTime()) / 86400000);
            const cur = h.amount * (1 + (opt.expectedReturn / 100) * (days / 365));
            const pn = cur - h.amount;
            return (
              <div key={i} className="rounded-2xl border border-[var(--hairline)] bg-white p-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-[15px] text-[var(--ink)]">{opt.name}</div>
                    <div className="text-[12px] text-[var(--ink-mute)]">
                      {new Date(h.date).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="tnum text-[15px] text-[var(--ink)]">{formatINR(cur)}</div>
                    <div className="tnum text-[12px]" style={{ color: pn >= 0 ? "var(--success)" : "var(--brand-ruby)" }}>
                      {pn >= 0 ? "+" : ""}
                      {formatINR(pn)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-[var(--canvas-cream)] p-5">
          <div className="eyebrow">Pro habit</div>
          <p className="mt-1 text-[14px] text-[var(--ink-secondary)]">
            Investing the same amount every month (a SIP) smooths out market swings. Even ₹500/mo adds up.
          </p>
        </div>
      </Container>
    </Shell>
  );
}