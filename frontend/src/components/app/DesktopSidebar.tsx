import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, BarChart3, Wallet, User, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/compare", label: "Compare", icon: BarChart3 },
  { to: "/portfolio", label: "Portfolio", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function DesktopSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 z-40 w-60 border-r border-border/50 bg-card/80 backdrop-blur-xl">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-6 border-b border-border/40">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <TrendingUp className="h-4 w-4" />
        </div>
        <span className="font-semibold text-[15px] tracking-tight text-foreground">
          Prospera
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {navItems.map((item) => {
          const active =
            path === item.to ||
            (item.to !== "/learn" && path.startsWith(item.to));
          const Icon = item.icon;

          return (
            <Link key={item.to} to={item.to}>
              <motion.div
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <Icon className="h-4 w-4 relative z-10 shrink-0" />
                <span className="relative z-10">{item.label}</span>

                {active && (
                  <motion.span
                    layoutId="sidebar-active-bar"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer hint */}
      <div className="px-5 py-4 border-t border-border/40">
        <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
          Mock investing only.
          <br />
          No real money moves.
        </p>
      </div>
    </aside>
  );
}
