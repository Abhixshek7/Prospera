import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getRecommendedOption,
  getRiskProfile,
  type GoalId,
  type OptionId,
  getOptionById,
} from "./mock-data";

interface UserState {
  name: string;
  goal: GoalId | null;
  knowledgeLevel: "beginner" | "some" | "tried" | null;
  riskProfile: "conservative" | "moderate" | "aggressive" | null;
  riskScore: number;
  onboardingComplete: boolean;
  setName: (n: string) => void;
  setGoal: (g: GoalId) => void;
  setKnowledgeLevel: (l: "beginner" | "some" | "tried") => void;
  submitRiskAnswers: (scores: number[]) => void;
  completeOnboarding: () => void;
  getRecommendation: () => OptionId;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      name: "",
      goal: null,
      knowledgeLevel: null,
      riskProfile: null,
      riskScore: 0,
      onboardingComplete: false,
      setName: (name) => set({ name }),
      setGoal: (goal) => set({ goal }),
      setKnowledgeLevel: (knowledgeLevel) => set({ knowledgeLevel }),
      submitRiskAnswers: (scores) => {
        const total = scores.reduce((a, b) => a + b, 0);
        set({ riskScore: total, riskProfile: getRiskProfile(total) });
      },
      completeOnboarding: () => set({ onboardingComplete: true }),
      getRecommendation: () => getRecommendedOption(get().goal, get().riskProfile),
      reset: () =>
        set({
          name: "",
          goal: null,
          knowledgeLevel: null,
          riskProfile: null,
          riskScore: 0,
          onboardingComplete: false,
        }),
    }),
    { name: "seedling-user" },
  ),
);

export interface Holding {
  optionId: OptionId;
  optionName: string;
  amount: number;
  date: string;
}

interface InvestState {
  selectedOption: OptionId | null;
  amount: number;
  portfolio: Holding[];
  setOption: (id: OptionId) => void;
  setAmount: (n: number) => void;
  invest: () => Holding;
  getCurrentValue: () => number;
  getTotalInvested: () => number;
  reset: () => void;
}

export const useInvestStore = create<InvestState>()(
  persist(
    (set, get) => ({
      selectedOption: null,
      amount: 500,
      portfolio: [],
      setOption: (selectedOption) => set({ selectedOption }),
      setAmount: (amount) => set({ amount }),
      invest: () => {
        const opt = getOptionById(get().selectedOption ?? "index");
        const h: Holding = {
          optionId: opt.id,
          optionName: opt.name,
          amount: get().amount,
          date: new Date().toISOString(),
        };
        set({ portfolio: [...get().portfolio, h] });
        return h;
      },
      getCurrentValue: () => {
        // Mock: small random gain
        return get().portfolio.reduce((s, h) => {
          const opt = getOptionById(h.optionId);
          const days = Math.max(
            1,
            (Date.now() - new Date(h.date).getTime()) / (1000 * 60 * 60 * 24),
          );
          const factor = 1 + (opt.expectedReturn / 100) * (days / 365);
          return s + h.amount * factor;
        }, 0);
      },
      getTotalInvested: () => get().portfolio.reduce((s, h) => s + h.amount, 0),
      reset: () => set({ selectedOption: null, amount: 500, portfolio: [] }),
    }),
    { name: "seedling-invest" },
  ),
);

interface ProgressState {
  completedLessons: string[];
  markComplete: (slug: string) => void;
  isComplete: (slug: string) => boolean;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      markComplete: (slug) =>
        set({
          completedLessons: get().completedLessons.includes(slug)
            ? get().completedLessons
            : [...get().completedLessons, slug],
        }),
      isComplete: (slug) => get().completedLessons.includes(slug),
      reset: () => set({ completedLessons: [] }),
    }),
    { name: "seedling-progress" },
  ),
);

export function formatINR(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}