import { type ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function Shell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className={hideNav ? "pb-8" : "pb-28"}>{children}</main>
      {!hideNav && <BottomNav />}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-xl px-5 ${className}`}>{children}</div>;
}