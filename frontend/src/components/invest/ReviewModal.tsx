import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useInvestStore, useUserStore, formatINR } from "@/lib/stores";
import { getOptionById } from "@/lib/mock-data";
import { Pill } from "@/components/app/Pill";
import { Link } from "@tanstack/react-router";
import React from "react";

export function ReviewModal({ open, onOpenChange, onContinue }: { open: boolean; onOpenChange: (v: boolean) => void; onContinue: () => void }) {
  const { amount, selectedOption } = useInvestStore();
  const name = useUserStore((s) => s.name);
  const opt = getOptionById(selectedOption ?? "index");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Let's review.</DialogTitle>
          <DialogDescription>This is a mock investment — no real money moves.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          <Row label="What" value={opt.name} editTo="/compare" />
          <Row label="Amount" value={formatINR(amount)} editTo="/simulate" tnum />
          <Row label="Risk" value={opt.riskLabel} />
          <Row label="Likely return" value={`~${opt.expectedReturn}% / yr`} tnum />
        </div>

        <div className="mt-6 rounded-2xl bg-[var(--canvas-cream)] p-5 text-[14px] text-[var(--ink-secondary)]">
          <span className="text-[var(--ink)]">Remember:</span> {opt.canLoseMoney}
        </div>

        <DialogFooter className="mt-6">
          <Pill onClick={() => onContinue()} className="w-full py-3">
            Continue →
          </Pill>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value, editTo, tnum }: { label: string; value: string; editTo?: string; tnum?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[var(--hairline)] bg-card px-5 py-4">
      <div className="text-[13px] text-[var(--ink-mute)]">{label}</div>
      <div className="flex items-center gap-3">
        <div className={`${tnum ? "tnum" : ""} text-[15px] text-[var(--ink)]`}>{value}</div>
        {editTo && (
          <Link to={editTo} className="text-[13px] text-[var(--brand-indigo)] hover:underline">
            edit
          </Link>
        )}
      </div>
    </div>
  );
}
