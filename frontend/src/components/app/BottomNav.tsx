import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, BarChart3, Wallet, User } from "lucide-react";

const tabs = [
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/compare", label: "Compare", icon: BarChart3 },
  { to: "/portfolio", label: "Portfolio", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-xl items-stretch justify-around px-2 py-2">
        {tabs.map((t) => {
          const active = path === t.to || (t.to !== "/learn" && path.startsWith(t.to));
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-1 flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs transition-colors ${
                active ? "text-[var(--brand-indigo)]" : "text-[var(--ink-mute)]"
              }`}
            >
              <Icon size={20} strokeWidth={1.5} />
              <span>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}