import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/app/Shell";
import { useInvestStore, useUserStore, formatINR } from "@/lib/stores";
import { getOptionById } from "@/lib/mock-data";
import { PillLink } from "@/components/app/Pill";
import { Mounted } from "@/components/app/Mounted";

export const Route = createFileRoute("/invest/success")({
  component: () => (
    <Mounted>
      <Success />
    </Mounted>
  ),
});

function Success() {
  const { amount, selectedOption } = useInvestStore();
  const name = useUserStore((s) => s.name);
  const opt = getOptionById(selectedOption ?? "index");

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="gradient-mesh absolute inset-x-0 top-0 h-[60vh]" />
      <Container className="relative z-10 flex min-h-screen flex-col pt-8">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="text-7xl">🌱</div>
          <h1 className="display-xl mt-6">
            You did it{name ? `, ${name}` : ""}.
          </h1>
          <p className="mt-3 max-w-sm text-[15px] text-[var(--ink-secondary)]">
            Mock-invested <span className="tnum text-[var(--ink)]">{formatINR(amount)}</span> in {opt.name}.
          </p>

          <div className="mt-10 w-full max-w-sm rounded-2xl border border-[var(--hairline)] bg-card p-5 text-left shadow-sm">
            <div className="eyebrow">Receipt</div>
            <div className="mt-3 space-y-2 text-[14px]">
              <Row label="Amount" value={formatINR(amount)} tnum />
              <Row label="Into" value={opt.name} />
              <Row label="Date" value={new Date().toLocaleDateString("en-IN")} />
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-[var(--canvas-cream)] p-5 text-left">
            <div className="eyebrow">One thing to remember</div>
            <p className="mt-2 text-[15px] text-[var(--ink)]">
              Don't check it daily. Don't sell on a bad week. Time is your edge — not timing.
            </p>
          </div>

          <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
            <PillLink to="/portfolio" className="w-full py-3">
              See your portfolio →
            </PillLink>
            <PillLink to="/learn" variant="ghost" className="w-full">
              Back to learning
            </PillLink>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Row({ label, value, tnum }: { label: string; value: string; tnum?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-[var(--ink-mute)]">{label}</span>
      <span className={`${tnum ? "tnum" : ""} text-[var(--ink)]`}>{value}</span>
    </div>
  );
}