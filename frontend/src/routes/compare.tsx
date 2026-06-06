import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Container, Shell } from "@/components/app/Shell";
import { INVESTMENT_OPTIONS } from "@/lib/mock-data";
import { useInvestStore, useUserStore } from "@/lib/stores";
import { RiskBar } from "@/components/app/RiskBar";
import { Pill } from "@/components/app/Pill";
import { Mounted } from "@/components/app/Mounted";
import { Check } from "lucide-react";

export const Route = createFileRoute("/compare")({
  component: () => (
    <Mounted>
      <ComparePage />
    </Mounted>
  ),
});

function ComparePage() {
  const getRec = useUserStore((s) => s.getRecommendation);
  const recommended = getRec();
  const { selectedOption, setOption } = useInvestStore();
  const nav = useNavigate();

  return (
    <Shell>
      <Container className="pt-8">

        <h1 className="display-lg mt-1">Three options. Plain English.</h1>
        <p className="mt-2 text-[14px] text-[var(--ink-mute)]">
          We've marked the one that fits your profile. You can pick anything.
        </p>

        <div className="mt-6 space-y-4">
          {INVESTMENT_OPTIONS.map((o) => {
            const isRec = o.id === recommended;
            const isSel = o.id === selectedOption;
            return (
              <div
                key={o.id}
                className={`rounded-2xl border bg-card p-5 transition-all ${
                  isSel
                    ? "border-[var(--brand-indigo)] ring-2 ring-[var(--brand-indigo-subdued)]"
                    : "border-[var(--hairline)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[18px] text-[var(--ink)]">{o.name}</h3>
                      {isRec && (
                        <span className="rounded-full bg-[var(--brand-indigo-subdued)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--brand-indigo-deep)]">
                          Best for you
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[14px] text-[var(--ink-mute)]">{o.tagline}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <RiskBar score={o.riskScore} label={o.riskLabel} />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <Stat label="Worst yr" value={`${o.worstCase}%`} color={o.worstCase < 0 ? "var(--brand-ruby)" : "var(--ink)"} />
                  <Stat label="Likely" value={`${o.expectedReturn}%`} color="var(--brand-indigo)" />
                  <Stat label="Best yr" value={`${o.bestCase}%`} color="var(--success)" />
                </div>

                <div className="mt-4 rounded-xl bg-[var(--canvas-soft)] p-3">
                  <div className="eyebrow text-[10px]">Can you lose money?</div>
                  <p className="mt-1 text-[13px] text-[var(--ink-secondary)]">{o.canLoseMoney}</p>
                </div>

                <button
                  onClick={() => setOption(o.id)}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-[14px] transition-all ${
                    isSel
                      ? "border-[var(--brand-indigo)] bg-[var(--brand-indigo)] text-white"
                      : "border-[var(--hairline)] text-[var(--ink)] hover:border-[var(--brand-indigo)]"
                  }`}
                >
                  {isSel ? (
                    <>
                      <Check size={14} /> Selected
                    </>
                  ) : (
                    "Pick this"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <Pill
            disabled={!selectedOption}
            onClick={() => nav({ to: "/simulate" })}
            className="w-full py-3"
          >
            Simulate this →
          </Pill>
        </div>
      </Container>
    </Shell>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg bg-[var(--canvas-soft)] p-2.5">
      <div className="eyebrow text-[10px]">{label}</div>
      <div className="tnum mt-0.5 text-[15px]" style={{ color }}>
        {value}
      </div>
    </div>
  );
}