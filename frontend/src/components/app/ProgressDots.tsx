export function ProgressDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex justify-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all ${
            i + 1 === step
              ? "w-8 bg-[var(--brand-indigo)]"
              : i + 1 < step
                ? "w-4 bg-[var(--brand-indigo-soft)]"
                : "w-4 bg-[var(--hairline)]"
          }`}
        />
      ))}
    </div>
  );
}