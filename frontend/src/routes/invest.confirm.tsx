import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Container } from "@/components/app/Shell";
import { BackButton } from "@/components/app/BackButton";
import { useInvestStore, formatINR } from "@/lib/stores";
import { getOptionById } from "@/lib/mock-data";
import { Pill } from "@/components/app/Pill";
import { Mounted } from "@/components/app/Mounted";

export const Route = createFileRoute("/invest/confirm")({
  component: () => (
    <Mounted>
      <Confirm />
    </Mounted>
  ),
});

function Confirm() {
  const { amount, selectedOption, invest } = useInvestStore();
  const opt = getOptionById(selectedOption ?? "index");
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  function go() {
    setLoading(true);
    setTimeout(() => {
      invest();
      nav({ to: "/invest/success" });
    }, 900);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="bg-card" />
      <Container className="relative z-10 pt-8">
        <BackButton />
        <div className="mt-16 text-center">
          <div className="eyebrow">Mock invest</div>
          <div className="tnum mt-4 text-[64px] font-light leading-none text-[var(--ink)]">
            {formatINR(amount)}
          </div>
          <div className="mt-3 text-[15px] text-[var(--ink-secondary)]">into {opt.name}</div>
        </div>

        <div className="mt-16 mb-6 space-y-3">
          <Pill onClick={go} disabled={loading} className="w-full py-4 text-[16px]">
            {loading ? "Processing…" : `Confirm mock investment`}
          </Pill>
          <p className="text-center text-[12px] text-[var(--ink-mute)]">
            🔒 No real payment. This is for learning.
          </p>
        </div>
      </Container>
    </div>
  );
}