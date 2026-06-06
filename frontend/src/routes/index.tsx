import { createFileRoute } from "@tanstack/react-router";
import { PillLink } from "@/components/app/Pill";
import { Container } from "@/components/app/Shell";
import { formatINR } from "@/lib/stores";
import { getInflationLoss } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seedling — Your first investment, made calm" },
      { name: "description", content: "Honest, jargon-free first investment app. Show worst case + best case. Built for 18-22." },
      { property: "og:title", content: "Seedling" },
      { property: "og:description", content: "Your first investment, made calm." },
    ],
  }),
  component: Splash,
});

function Splash() {
  const today = 10000;
  const tenYears = getInflationLoss(today, 10);
  const loss = today - tenYears;
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="gradient-mesh absolute inset-x-0 top-0 h-[55vh]" />
      <Container className="relative z-10 flex min-h-screen flex-col">
        <div className="pt-8 text-[15px] font-normal text-[var(--ink)]">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand-indigo)]" />
            Seedling
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-16">
          <div className="eyebrow mb-4">The honest truth</div>
          <h1 className="display-xxl text-[var(--ink)]">
            Doing nothing<br />
            with your money<br />
            <span className="text-[var(--brand-indigo)]">is also a choice.</span>
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[var(--ink-secondary)]">
            ₹{today.toLocaleString("en-IN")} sitting in your account today is worth roughly{" "}
            <span className="tnum font-normal text-[var(--ink)]">{formatINR(tenYears)}</span> in 10 years.
            That's a quiet loss of {formatINR(loss)} — just by not deciding.
          </p>

          <div className="mt-10 rounded-2xl border border-[var(--hairline)] bg-white p-5 shadow-sm">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="eyebrow">Today</div>
                <div className="tnum mt-1 text-2xl">{formatINR(today)}</div>
              </div>
              <div className="text-[var(--ink-mute)]">→</div>
              <div className="text-right">
                <div className="eyebrow" style={{ color: "var(--brand-ruby)" }}>
                  In 10 years (cash)
                </div>
                <div className="tnum mt-1 text-2xl text-[var(--brand-ruby)]">{formatINR(tenYears)}</div>
              </div>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--canvas-soft)]">
              <div className="h-full w-[55%] rounded-full bg-gradient-to-r from-[var(--brand-indigo)] to-[var(--brand-ruby)]" />
            </div>
            <p className="mt-3 text-[13px] text-[var(--ink-mute)]">
              Assuming 6% annual inflation. Source: RBI long-term average.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <PillLink to="/onboarding/name" className="w-full py-3">
              Let's fix this →
            </PillLink>
            <p className="text-center text-[13px] text-[var(--ink-mute)]">
              Takes 2 minutes. No money required.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
