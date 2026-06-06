import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useInvestStore, formatINR } from "@/lib/stores";
import { getOptionById } from "@/lib/mock-data";
import { Pill } from "@/components/app/Pill";
import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

export function ConfirmModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { amount, selectedOption, invest } = useInvestStore();
  const opt = getOptionById(selectedOption ?? "index");
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  function go() {
    setLoading(true);
    setTimeout(() => {
      invest();
      onOpenChange(false);
      nav({ to: "/invest/success" });
    }, 900);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Mock invest</DialogTitle>
          <DialogDescription>This is a practice run — no real payment required.</DialogDescription>
        </DialogHeader>

        <div className="mt-6 text-center">
          <div className="tnum mt-4 text-[48px] font-light leading-none text-[var(--ink)]">{formatINR(amount)}</div>
          <div className="mt-3 text-[15px] text-[var(--ink-secondary)]">into {opt.name}</div>
        </div>

        <DialogFooter className="mt-6">
          <Pill onClick={go} disabled={loading} className="w-full py-3 text-[16px]">
            {loading ? "Processing…" : `Confirm mock investment`}
          </Pill>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
