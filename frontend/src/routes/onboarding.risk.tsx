import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Container } from "@/components/app/Shell";
import { Pill } from "@/components/app/Pill";
import { ProgressDots } from "@/components/app/ProgressDots";
import { BackButton } from "@/components/app/BackButton";
import { useUserStore } from "@/lib/stores";
import { RISK_QUESTIONS, RISK_PROFILE_META } from "@/lib/mock-data";
import { Mounted } from "@/components/app/Mounted";
import { Insight } from "@/components/app/Insight";

export const Route = createFileRoute("/onboarding/risk")({
  component: () => (
    <Mounted>
      <RiskPage />
    </Mounted>
  ),
});

function RiskPage() {
  const nav = useNavigate();
  const { submitRiskAnswers, completeOnboarding } = useUserStore();
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [done, setDone] = useState<null | "conservative" | "moderate" | "aggressive">(null);

  const q = RISK_QUESTIONS[idx];

  function answer(score: number) {
    const next = [...scores, score];
    setScores(next);
    if (idx + 1 < RISK_QUESTIONS.length) {
      setIdx(idx + 1);
    } else {
      submitRiskAnswers(next);
      const total = next.reduce((a, b) => a + b, 0);
      const profile = total <= 4 ? "conservative" : total <= 7 ? "moderate" : "aggressive";
      setDone(profile);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Container className="pt-8">
        <div className="flex items-center justify-between">
          <BackButton />
          <ProgressDots step={4} total={4} />
          <div className="w-12" />
        </div>
        {!done ? (
          <div className="mt-12">
            <div className="eyebrow mb-3">
              Step 4 · Question {idx + 1} of {RISK_QUESTIONS.length}
            </div>
            <h1 className="display-lg">{q.q}</h1>
            <div className="mt-8 space-y-3">
              {q.options.map((o) => (
                <button
                  key={o.label}
                  onClick={() => answer(o.score)}
                  className="w-full rounded-2xl border border-[var(--hairline)] bg-card p-5 text-left transition-all hover:border-[var(--brand-indigo-soft)]"
                >
                  <div className="text-[15px] text-[var(--ink)]">{o.label}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <div className="eyebrow mb-3">Your risk profile</div>
            <h1 className="display-xl">{RISK_PROFILE_META[done].label}</h1>
            <p className="mt-3 text-[15px] text-[var(--ink-secondary)]">
              {RISK_PROFILE_META[done].desc}
            </p>
            <div className="mt-8">
              <Insight>
                There's no "right" profile. The best one is the one you'll actually stick with through a bad week.
              </Insight>
            </div>
            <div className="mt-10">
              <Pill
                onClick={() => {
                  completeOnboarding();
                  nav({ to: "/learn" });
                }}
                className="w-full py-3"
              >
                See what fits me →
              </Pill>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}