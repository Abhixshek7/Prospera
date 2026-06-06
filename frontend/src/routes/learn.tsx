import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, Container } from "@/components/app/Shell";
import { LESSONS } from "@/lib/mock-data";
import { useProgressStore, useUserStore } from "@/lib/stores";
import { Mounted } from "@/components/app/Mounted";
import { Check, ChevronRight } from "lucide-react";
import { PillLink } from "@/components/app/Pill";

export const Route = createFileRoute("/learn")({
  component: () => (
    <Mounted>
      <LearnPage />
    </Mounted>
  ),
});

function LearnPage() {
  const name = useUserStore((s) => s.name);
  const completed = useProgressStore((s) => s.completedLessons);
  const pct = Math.round((completed.length / LESSONS.length) * 100);

  return (
    <Shell>
      <div className=" h-10" />
      <Container className="">
        <div className="rounded-2xl border border-[var(--hairline)] bg-card p-5 shadow-sm">
          <div className="eyebrow">{name ? `Hey, ${name}` : "Welcome"}</div>
          <h1 className="display-lg mt-1">Learn the basics first.</h1>
          <p className="mt-2 text-[14px] text-[var(--ink-mute)]">
            4 short lessons. No jargon. Worst case shown alongside best.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--canvas-soft)]">
              <div
                className="h-full rounded-full bg-[var(--brand-indigo)] transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="tnum text-[13px] text-[var(--ink-mute)]">{pct}%</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {LESSONS.map((l) => {
            const done = completed.includes(l.slug);
            return (
              <Link
                key={l.slug}
                to="/learn/$slug"
                params={{ slug: l.slug }}
                className="block rounded-2xl border border-[var(--hairline)] bg-card p-5 transition-all hover:border-[var(--brand-indigo-soft)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-[12px] text-[var(--ink-mute)]">
                      <span className="rounded-full bg-[var(--canvas-soft)] px-2 py-0.5 capitalize">
                        {l.level}
                      </span>
                      <span>· {l.minutes} min read</span>
                    </div>
                    <div className="mt-2 text-[16px] text-[var(--ink)]">{l.title}</div>
                    <div className="mt-1 text-[14px] text-[var(--ink-mute)]">{l.blurb}</div>
                  </div>
                  {done ? (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--success)] text-white">
                      <Check size={14} />
                    </div>
                  ) : (
                    <ChevronRight size={18} className="mt-1 text-[var(--ink-mute)]" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-[var(--canvas-cream)] p-6">
          <div className="eyebrow">Ready when you are</div>
          <h3 className="mt-1 text-[20px] text-[var(--ink)]">Compare your three options</h3>
          <p className="mt-1 text-[14px] text-[var(--ink-secondary)]">
            See FD vs Index Fund vs Stock — side by side, plain English.
          </p>
          <div className="mt-4">
            <PillLink to="/compare">Compare options →</PillLink>
          </div>
        </div>
      </Container>
    </Shell>
  );
}