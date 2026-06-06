import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Container } from "@/components/app/Shell";
import { ProgressDots } from "@/components/app/ProgressDots";
import { BackButton } from "@/components/app/BackButton";
import { useUserStore } from "@/lib/stores";
import { Mounted } from "@/components/app/Mounted";

const LEVELS = [
  { id: "beginner", title: "Total beginner", blurb: "I don't really know how this works." },
  { id: "some", title: "I know a little", blurb: "I've read about it but haven't done it." },
  { id: "tried", title: "I've tried before", blurb: "I've made an investment or two." },
] as const;

export const Route = createFileRoute("/onboarding/knowledge")({
  component: () => (
    <Mounted>
      <KnowledgePage />
    </Mounted>
  ),
});

function KnowledgePage() {
  const nav = useNavigate();
  const { knowledgeLevel, setKnowledgeLevel } = useUserStore();

  return (
    <div className="min-h-screen bg-background">
      <Container className="pt-8">
        <div className="flex items-center justify-between">
          <BackButton />
          <ProgressDots step={3} total={4} />
          <div className="w-12" />
        </div>
        <div className="mt-12">
          <div className="eyebrow mb-3">Step 3 of 4</div>
          <h1 className="display-xl">How much do you already know?</h1>
          <p className="mt-3 text-[15px] text-[var(--ink-mute)]">
            Honest answers get you better recommendations.
          </p>

          <div className="mt-8 space-y-3">
            {LEVELS.map((l) => {
              const active = knowledgeLevel === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => {
                    setKnowledgeLevel(l.id);
                    setTimeout(() => nav({ to: "/onboarding/risk" }), 150);
                  }}
                  className={`w-full rounded-2xl border p-5 text-left transition-all ${
                    active
                      ? "border-[var(--brand-indigo)] bg-[var(--brand-indigo-subdued)]/20"
                      : "border-[var(--hairline)] bg-card hover:border-[var(--brand-indigo-soft)]"
                  }`}
                >
                  <div className="text-[16px] text-[var(--ink)]">{l.title}</div>
                  <div className="mt-0.5 text-[14px] text-[var(--ink-mute)]">{l.blurb}</div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}