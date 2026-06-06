import { useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function BackButton({ to }: { to?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => (to ? router.navigate({ to }) : router.history.back())}
      className="inline-flex items-center gap-1 text-[14px] text-[var(--ink-mute)] hover:text-[var(--ink)]"
    >
      <ChevronLeft size={16} /> Back
    </button>
  );
}