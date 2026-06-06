import { Link } from "@tanstack/react-router";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[15px] font-normal transition-all disabled:opacity-50 disabled:pointer-events-none";
const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--brand-indigo)] text-white hover:bg-[var(--brand-indigo-deep)] active:bg-[var(--brand-indigo-press)] shadow-sm",
  secondary:
    "bg-white text-[var(--brand-indigo)] border border-[var(--brand-indigo)] hover:bg-[var(--brand-indigo-subdued)]/30",
  dark: "bg-[var(--brand-dark-900)] text-white hover:opacity-90",
  ghost: "text-[var(--ink)] hover:bg-[var(--canvas-soft)]",
};

export function Pill({
  variant = "primary",
  className = "",
  children,
  ...rest
}: { variant?: Variant; className?: string; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function PillLink({
  to,
  variant = "primary",
  className = "",
  children,
}: {
  to: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}