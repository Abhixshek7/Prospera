import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Container, Shell } from "@/components/app/Shell";
import { useInvestStore } from "@/lib/stores";
import { calculateProjection, getOptionById } from "@/lib/mock-data";
import { formatINR } from "@/lib/stores";
import { Pill } from "@/components/app/Pill";
import { ReviewModal } from "@/components/invest/ReviewModal";
import { ConfirmModal } from "@/components/invest/ConfirmModal";
import { Warning } from "@/components/app/Insight";
import { Mounted } from "@/components/app/Mounted";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export const Route = createFileRoute("/simulate")({
  component: () => (
    <Mounted>
      <Sim />
    </Mounted>
  ),
});

const PRESETS = [100, 500, 1000, 5000];

function Sim() {
  const { amount, setAmount, selectedOption } = useInvestStore();
  const opt = getOptionById(selectedOption ?? "index");
  const nav = useNavigate();
  const [years, setYears] = useState(7);

  const data = useMemo(() => calculateProjection(amount, opt, years), [amount, opt, years]);
  const final = data[data.length - 1];
  const [reviewOpen, setReviewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Shell>
      <Container className="pt-8">
        <div className="eyebrow">Simulate</div>
        <h1 className="display-lg mt-1">If you invested in {opt.name}…</h1>

        <div className="mt-6 rounded-2xl border border-[var(--hairline)] bg-card p-5">
          <div className="flex items-baseline justify-between">
            <div className="text-[13px] text-[var(--ink-mute)]">Amount</div>
            <div className="tnum text-3xl font-light">{formatINR(amount)}</div>
          </div>
          <input
            type="range"
            min={100}
            max={10000}
            step={100}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-3 w-full accent-[var(--brand-indigo)]"
          />
          <div className="mt-3 flex gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`tnum flex-1 rounded-full border px-2 py-1.5 text-[13px] ${
                  amount === p
                    ? "border-[var(--brand-indigo)] bg-[var(--brand-indigo-subdued)]/30 text-[var(--brand-indigo-deep)]"
                    : "border-[var(--hairline)] text-[var(--ink-mute)]"
                }`}
              >
                ₹{p.toLocaleString("en-IN")}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-[var(--hairline)] bg-card p-5">
          <div className="flex items-baseline justify-between">
            <div className="text-[13px] text-[var(--ink-mute)]">For how long?</div>
            <div className="tnum text-2xl font-light">
              {years} year{years > 1 ? "s" : ""}
            </div>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-3 w-full accent-[var(--brand-indigo)]"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--hairline)] bg-card p-5">
          <div className="eyebrow mb-2">Projection · year by year</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={2} barCategoryGap="20%">
                <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={11} stroke="var(--ink-mute)" />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid var(--hairline)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v: number) => formatINR(v)}
                />
                <Bar dataKey="worst" fill="var(--brand-ruby)" radius={[3, 3, 0, 0]}>
                  {data.map((_, i) => (
                    <Cell key={i} fillOpacity={0.7} />
                  ))}
                </Bar>
                <Bar dataKey="likely" fill="var(--brand-indigo)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="best" fill="var(--success)" radius={[3, 3, 0, 0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex justify-around text-[11px] text-[var(--ink-mute)]">
            <Legend color="var(--brand-ruby)" label="Worst case" />
            <Legend color="var(--brand-indigo)" label="Likely" />
            <Legend color="var(--success)" label="Best case" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Outcome label="Worst" value={final.worst} color="var(--brand-ruby)" />
          <Outcome label="Likely" value={final.likely} color="var(--brand-indigo)" />
          <Outcome label="Best" value={final.best} color="var(--success)" />
        </div>

        {opt.worstCase < 0 && (
          <div className="mt-6">
            <Warning>
              In a bad first year, your {formatINR(amount)} could become{" "}
              <span className="tnum">{formatINR(amount * (1 + opt.worstCase / 100))}</span>.
              That's a real possibility, not a scare tactic. Markets recover — but only if you stay.
            </Warning>
          </div>
        )}

        <div className="mt-8 mb-6">
          <Pill onClick={() => setReviewOpen(true)} className="w-full py-3">
            Mock invest {formatINR(amount)} →
          </Pill>
          <ReviewModal open={reviewOpen} onOpenChange={setReviewOpen} onContinue={() => { setReviewOpen(false); setConfirmOpen(true); }} />
          <ConfirmModal open={confirmOpen} onOpenChange={setConfirmOpen} />
          <p className="mt-2 text-center text-[12px] text-[var(--ink-mute)]">
            No real money. This is a practice run.
          </p>
        </div>
      </Container>
    </Shell>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function Outcome({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl border border-[var(--hairline)] bg-card p-3 text-center">
      <div className="eyebrow text-[10px]">{label}</div>
      <div className="tnum mt-1 text-[16px]" style={{ color }}>
        {formatINR(value)}
      </div>
    </div>
  );
}