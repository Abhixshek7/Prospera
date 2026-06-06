import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getLessonBySlug } from "@/lib/mock-data";
import { Container, Shell } from "@/components/app/Shell";
import { BackButton } from "@/components/app/BackButton";
import { Pill } from "@/components/app/Pill";
import { useProgressStore } from "@/lib/stores";
import { Insight } from "@/components/app/Insight";
import { Mounted } from "@/components/app/Mounted";

export const Route = createFileRoute("/learn/$slug")({
  component: () => (
    <Mounted>
      <LessonPage />
    </Mounted>
  ),
});

function LessonPage() {
  const { slug } = Route.useParams();
  const lesson = getLessonBySlug(slug);
  const nav = useNavigate();
  const markComplete = useProgressStore((s) => s.markComplete);

  if (!lesson) {
    return (
      <Shell>
        <Container className="pt-12">
          <p>Lesson not found.</p>
        </Container>
      </Shell>
    );
  }

  return (
    <Shell>
      <Container className="pt-8">
        <BackButton to="/learn" />
        <div className="mt-6">
          <div className="eyebrow">
            {lesson.level} · {lesson.minutes} min read
          </div>
          <h1 className="display-xl mt-2">{lesson.title}</h1>
          <p className="mt-3 text-[16px] text-[var(--ink-secondary)]">{lesson.blurb}</p>
        </div>

        <div className="mt-8 space-y-6">
          {lesson.body.map((s) => (
            <div key={s.heading}>
              <h2 className="text-[18px] text-[var(--ink)]">{s.heading}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-secondary)]">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Insight>{lesson.takeaway}</Insight>
        </div>

        <div className="mt-10 mb-6">
          <Pill
            onClick={() => {
              markComplete(lesson.slug);
              nav({ to: "/learn" });
            }}
            className="w-full py-3"
          >
            Got it →
          </Pill>
        </div>
      </Container>
    </Shell>
  );
}