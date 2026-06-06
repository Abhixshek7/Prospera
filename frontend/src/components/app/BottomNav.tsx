import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, BarChart3, Wallet, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/compare", label: "Compare", icon: BarChart3 },
  { to: "/portfolio", label: "Portfolio", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex items-center gap-1 rounded-2xl px-2 py-2 shadow-lg border border-border/50 bg-card/95 backdrop-blur-md"
      >
        {tabs.map((t) => {
          const active = path === t.to || (t.to !== "/learn" && path.startsWith(t.to));
          const Icon = t.icon;
          return (
            <Link key={t.to} to={t.to} className="relative">
              <motion.div
                className={cn(
                  "relative flex flex-col items-center justify-center h-12 min-w-[56px] px-1.5 rounded-xl transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium mt-0.5 leading-none">{t.label}</span>

                <AnimatePresence>
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}