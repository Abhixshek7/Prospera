import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Container } from "@/components/app/Shell";
import { Pill } from "@/components/app/Pill";
import { ProgressDots } from "@/components/app/ProgressDots";
import { BackButton } from "@/components/app/BackButton";
import { useUserStore } from "@/lib/stores";
import { Mounted } from "@/components/app/Mounted";

export const Route = createFileRoute("/onboarding/name")({
  component: () => (
    <Mounted>
      <NamePage />
    </Mounted>
  ),
});

function NamePage() {
  const nav = useNavigate();
  const setName = useUserStore((s) => s.setName);
  const stored = useUserStore((s) => s.name);
  const [v, setV] = useState(stored);

  return (
    <div className="min-h-screen bg-background">
      <Container className="pt-8">
        <div className="flex items-center justify-between">
          <BackButton to="/" />
          <ProgressDots step={1} total={4} />
          <div className="w-12" />
        </div>
        <div className="mt-16">
          <div className="eyebrow mb-3">Step 1 of 4</div>
          <h1 className="display-xl">What should we call you?</h1>
          <p className="mt-3 text-[15px] text-[var(--ink-mute)]">
            Just a first name. We're not asking for anything else.
          </p>
          <input
            autoFocus
            value={v}
            onChange={(e) => setV(e.target.value)}
            placeholder="Your name"
            className="mt-8 w-full border-0 border-b border-[var(--hairline-input)] bg-transparent pb-2 text-2xl outline-none focus:border-[var(--brand-indigo)]"
          />
          <div className="mt-10">
            <Pill
              disabled={v.trim().length < 1}
              onClick={() => {
                setName(v.trim());
                nav({ to: "/onboarding/goal" });
              }}
              className="w-full py-3"
            >
              Continue →
            </Pill>
          </div>
        </div>
      </Container>
    </div>
  );
}