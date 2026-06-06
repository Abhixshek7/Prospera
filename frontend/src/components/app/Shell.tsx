import { useState, type ReactNode } from "react";
import { BottomNav } from "./BottomNav";
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

  // Get initials from user name
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!hideTopbar && !hideNav && (
        <div className="mx-auto w-full max-w-xl">
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
      <main className={hideNav ? "pb-8" : "pb-28"}>{children}</main>
      {!hideNav && <BottomNav />}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-xl px-5 ${className}`}>{children}</div>;
}