import { useState, type ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { DesktopSidebar } from "./DesktopSidebar";
import { SharedTopbar } from "../SharedTopbar";
import { useUserStore } from "@/lib/stores";
import { useNavigate } from "@tanstack/react-router";

export function Shell({
  children,
  hideNav = false,
  hideTopbar = false,
}: {
  children: ReactNode;
  hideNav?: boolean;
  hideTopbar?: boolean;
}) {
  const name = useUserStore((s) => s.name);
  const resetUser = useUserStore((s) => s.reset);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    resetUser();
    navigate({ to: "/" });
  };

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop sidebar — hidden on mobile/tablet */}
      {!hideNav && <DesktopSidebar />}

      {/* Main content column */}
      <div className={`flex flex-col flex-1 min-w-0 ${!hideNav ? "md:ml-60" : ""}`}>
        {/* Topbar — shown on all viewports when enabled */}
        {!hideTopbar && !hideNav && (
          <div className="w-full">
            <SharedTopbar
              brandLink="/learn"
              brandTitle="Prospera"
              showSuperAdminBadge={false}
              showSearch={true}
              searchValue={search}
              onSearchChange={setSearch}
              unreadCount={3}
              notificationsLink="/learn"
              initials={initials}
              userName={name || "Investor"}
              userJobTitle="New Investor"
              profileLink="/profile"
              onLogout={handleLogout}
            />
          </div>
        )}

        <main
          className={
            hideNav
              ? "pt-20 pb-8"
              : !hideTopbar
              ? "pt-20 pb-28 md:pb-8"
              : "pb-28 md:pb-8"
          }
        >
          {children}
        </main>
      </div>

      {/* Mobile/tablet dock — hidden on desktop */}
      {!hideNav && <BottomNav />}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-xl px-5 ${className}`}>{children}</div>;
}