import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Container, Shell } from "@/components/app/Shell";
import { useInvestStore, useProgressStore, useUserStore, formatINR } from "@/lib/stores";
import { LESSONS, RISK_PROFILE_META } from "@/lib/mock-data";
import { Mounted } from "@/components/app/Mounted";
import { Pill } from "@/components/app/Pill";

export const Route = createFileRoute("/profile")({
  component: () => (
    <Mounted>
      <Profile />
    </Mounted>
  ),
});

function Profile() {
  const user = useUserStore();
  const completed = useProgressStore((s) => s.completedLessons);
  const { portfolio, getTotalInvested } = useInvestStore();
  const nav = useNavigate();

  function reset() {
    user.reset();
    useProgressStore.getState().reset();
    useInvestStore.getState().reset();
    nav({ to: "/" });
  }

  return (
    <Shell>
      <Container className="pt-12">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-indigo-subdued)] text-2xl text-[var(--brand-indigo-deep)]">
            {user.name?.[0]?.toUpperCase() ?? "🌱"}
          </div>
          <div>
            <h1 className="display-lg">{user.name || "You"}</h1>
            <p className="text-[13px] text-[var(--ink-mute)]">
              {user.riskProfile ? RISK_PROFILE_META[user.riskProfile].label : "—"} investor
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <Stat label="Mock invested" value={formatINR(getTotalInvested())} tnum />
          <Stat label="Holdings" value={String(portfolio.length)} tnum />
          <Stat label="Lessons" value={`${completed.length}/${LESSONS.length}`} tnum />
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--hairline)] bg-card p-5">
          <h3 className="text-[16px] text-[var(--ink)]">Next steps</h3>
          <ul className="mt-3 space-y-2 text-[14px] text-[var(--ink-secondary)]">
            <li>· Finish the lessons you skipped</li>
            <li>· Mock-invest in a second option, compare how they grow</li>
            <li>· When real ₹500 won't hurt, do it for real on any SEBI-regulated app</li>
          </ul>
        </div>

        <div className="mt-10">
          <Pill variant="ghost" onClick={reset} className="w-full">
            Reset & start over
          </Pill>
        </div>
      </Container>
    </Shell>
  );
}

function Stat({ label, value, tnum }: { label: string; value: string; tnum?: boolean }) {
  return (
    <div className="rounded-xl border border-[var(--hairline)] bg-card p-3 text-center">
      <div className="eyebrow text-[10px]">{label}</div>
      <div className={`${tnum ? "tnum" : ""} mt-1 text-[16px] text-[var(--ink)]`}>{value}</div>
    </div>
  );
}