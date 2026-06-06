import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Container } from "@/components/app/Shell";
import { ProgressDots } from "@/components/app/ProgressDots";
import { BackButton } from "@/components/app/BackButton";
import { useUserStore } from "@/lib/stores";
import { GOALS, type GoalId } from "@/lib/mock-data";
import { Mounted } from "@/components/app/Mounted";

export const Route = createFileRoute("/onboarding/goal")({
  component: () => (
    <Mounted>
      <GoalPage />
    </Mounted>
  ),
});

function GoalPage() {
  const nav = useNavigate();
  const { name, goal, setGoal } = useUserStore();

  function pick(g: GoalId) {
    setGoal(g);
    setTimeout(() => nav({ to: "/onboarding/knowledge" }), 150);
  }

  return (
    <div className="min-h-screen bg-background">
      <Container className="pt-8">
        <div className="flex items-center justify-between">
          <BackButton />
          <ProgressDots step={2} total={4} />
          <div className="w-12" />
        </div>
        <div className="mt-8">
          <div className="eyebrow mb-3">Step 2 of 4</div>
          <h1 className="display-xl">
            {name ? `${name}, what's` : "What's"} this money for?
          </h1>
          <p className="mt-3 text-[15px] text-[var(--ink-mute)]">
            Every smart investment starts with the goal.
          </p>

          <div className="mt-8 space-y-3">
            {GOALS.map((g) => {
              const active = goal === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => pick(g.id)}
                  className={`w-full rounded-2xl border p-5 text-left transition-all ${
                    active
                      ? "border-[var(--brand-indigo)] bg-[var(--brand-indigo-subdued)]/20"
                      : "border-[var(--hairline)] bg-white hover:border-[var(--brand-indigo-soft)]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{g.emoji}</span>
                    <div>
                      <div className="text-[16px] text-[var(--ink)]">{g.title}</div>
                      <div className="mt-0.5 text-[14px] text-[var(--ink-mute)]">{g.blurb}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}