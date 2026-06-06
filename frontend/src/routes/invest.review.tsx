import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Container } from "@/components/app/Shell";
import { BackButton } from "@/components/app/BackButton";
import { useInvestStore, useUserStore, formatINR } from "@/lib/stores";
import { getOptionById } from "@/lib/mock-data";
import { Pill } from "@/components/app/Pill";
import { Mounted } from "@/components/app/Mounted";

export const Route = createFileRoute("/invest/review")({
  component: () => (
    <Mounted>
      <Review />
    </Mounted>
  ),
});

function Review() {
  const { amount, selectedOption } = useInvestStore();
  const name = useUserStore((s) => s.name);
  const opt = getOptionById(selectedOption ?? "index");
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Container className="pt-8">
        <BackButton />
        <div className="mt-8">
          <div className="eyebrow">Almost there{name ? `, ${name}` : ""}</div>
          <h1 className="display-xl mt-1">Let's review.</h1>
          <p className="mt-2 text-[15px] text-[var(--ink-mute)]">
            This is a mock investment — no real money moves.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Row label="What" value={opt.name} editTo="/compare" />
          <Row label="Amount" value={formatINR(amount)} editTo="/simulate" tnum />
          <Row label="Risk" value={opt.riskLabel} />
          <Row label="Likely return" value={`~${opt.expectedReturn}% / yr`} tnum />
        </div>

        <div className="mt-6 rounded-2xl bg-[var(--canvas-cream)] p-5 text-[14px] text-[var(--ink-secondary)]">
          <span className="text-[var(--ink)]">Remember:</span> {opt.canLoseMoney}
        </div>

        <div className="mt-8 mb-6">
          <Pill onClick={() => nav({ to: "/invest/confirm" })} className="w-full py-3">
            Continue →
          </Pill>
        </div>
      </Container>
    </div>
  );
}

function Row({ label, value, editTo, tnum }: { label: string; value: string; editTo?: string; tnum?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[var(--hairline)] bg-white px-5 py-4">
      <div className="text-[13px] text-[var(--ink-mute)]">{label}</div>
      <div className="flex items-center gap-3">
        <div className={`${tnum ? "tnum" : ""} text-[15px] text-[var(--ink)]`}>{value}</div>
        {editTo && (
          <Link to={editTo} className="text-[13px] text-[var(--brand-indigo)] hover:underline">
            edit
          </Link>
        )}
      </div>
    </div>
  );
}