export type OptionId = "fd" | "index" | "stock";

export interface InvestmentOption {
  id: OptionId;
  name: string;
  tagline: string;
  riskScore: number; // 1-10
  riskLabel: "Low" | "Medium" | "High";
  expectedReturn: number; // annual %
  worstCase: number; // annual % (could be negative)
  bestCase: number; // annual %
  canLoseMoney: string;
  pros: string[];
  cons: string[];
  goodFor: string;
}

export const INVESTMENT_OPTIONS: InvestmentOption[] = [
  {
    id: "fd",
    name: "Fixed Deposit",
    tagline: "Park your money. Get a fixed return.",
    riskScore: 1,
    riskLabel: "Low",
    expectedReturn: 7,
    worstCase: 7,
    bestCase: 7,
    canLoseMoney: "No. Your money is safe and grows at a fixed rate.",
    pros: ["Guaranteed return", "No surprises", "Easy to understand"],
    cons: ["Barely beats inflation", "Locked in for a period", "Boring growth"],
    goodFor: "Money you'll need in 1–2 years.",
  },
  {
    id: "index",
    name: "Index Fund",
    tagline: "Own a tiny slice of India's top 50 companies.",
    riskScore: 5,
    riskLabel: "Medium",
    expectedReturn: 12,
    worstCase: -8,
    bestCase: 22,
    canLoseMoney: "Yes, in any given year. But over 7+ years, history says you grow.",
    pros: ["Diversified — one bad company can't sink you", "Low fees", "Beats inflation long-term"],
    cons: ["Can drop 20–30% in a bad year", "You need patience", "No guaranteed returns"],
    goodFor: "Money you can leave alone for 5+ years.",
  },
  {
    id: "stock",
    name: "Single Stock",
    tagline: "Bet on one company. Win big or lose big.",
    riskScore: 9,
    riskLabel: "High",
    expectedReturn: 15,
    worstCase: -40,
    bestCase: 60,
    canLoseMoney: "Yes. A single company can fall 50%+ or go to zero.",
    pros: ["Highest possible upside", "You own a real business", "Exciting"],
    cons: ["Can lose half your money quickly", "Needs research", "Emotionally hard"],
    goodFor: "Money you can afford to lose entirely.",
  },
];

export function getOptionById(id: OptionId) {
  return INVESTMENT_OPTIONS.find((o) => o.id === id)!;
}

export function getRecommendedOption(
  goal: string | null,
  risk: "conservative" | "moderate" | "aggressive" | null,
): OptionId {
  if (risk === "conservative" || goal === "emergency") return "fd";
  if (risk === "aggressive" && goal === "grow") return "stock";
  return "index";
}

/* ─── Projections ─── */

export interface ProjectionPoint {
  year: number;
  worst: number;
  likely: number;
  best: number;
}

export function calculateProjection(
  amount: number,
  option: InvestmentOption,
  years: number,
): ProjectionPoint[] {
  const out: ProjectionPoint[] = [];
  for (let y = 1; y <= years; y++) {
    out.push({
      year: y,
      worst: Math.round(amount * Math.pow(1 + option.worstCase / 100, y)),
      likely: Math.round(amount * Math.pow(1 + option.expectedReturn / 100, y)),
      best: Math.round(amount * Math.pow(1 + option.bestCase / 100, y)),
    });
  }
  return out;
}

export function getInflationLoss(amount: number, years: number) {
  // 6% inflation = real value of cash today
  return Math.round(amount / Math.pow(1.06, years));
}

/* ─── Lessons ─── */

export interface Lesson {
  slug: string;
  title: string;
  minutes: number;
  level: "beginner" | "intermediate";
  blurb: string;
  body: { heading: string; text: string }[];
  takeaway: string;
}

export const LESSONS: Lesson[] = [
  {
    slug: "what-is-investing",
    title: "What is investing, really?",
    minutes: 3,
    level: "beginner",
    blurb: "Money put to work so it can grow, instead of sitting still.",
    body: [
      {
        heading: "Saving vs investing",
        text: "Saving keeps your money safe but flat. Investing puts it to work — and accepts some bumps in exchange for growth.",
      },
      {
        heading: "Why it matters",
        text: "₹10,000 today is worth ~₹5,500 in 10 years thanks to inflation. Investing isn't optional — it's how you don't quietly get poorer.",
      },
    ],
    takeaway: "Not investing is a choice too — and it loses to inflation.",
  },
  {
    slug: "how-index-funds-work",
    title: "How index funds work",
    minutes: 4,
    level: "beginner",
    blurb: "One purchase, 50 companies, almost no fees.",
    body: [
      {
        heading: "What you actually own",
        text: "A Nifty 50 index fund holds tiny pieces of the 50 biggest Indian companies. When you buy ₹500, you own a sliver of all of them.",
      },
      {
        heading: "Why it's boring (and good)",
        text: "It just tracks the market. No fund manager guessing. Low fees. Over time, this quietly beats most experts.",
      },
    ],
    takeaway: "Index funds = the default first investment for most people.",
  },
  {
    slug: "risk-explained",
    title: "Risk, explained honestly",
    minutes: 3,
    level: "beginner",
    blurb: "Risk isn't \"scary\" — it's how much your money can swing.",
    body: [
      {
        heading: "Volatility ≠ loss",
        text: "Your investment going down on a Tuesday isn't a loss. It's only a loss if you sell. Markets recover — historically, always.",
      },
      {
        heading: "Time changes everything",
        text: "Over 1 year, an index fund might drop 25%. Over 10 years, it's almost always up. The fix for risk is time.",
      },
    ],
    takeaway: "Higher risk only pays off if you give it time.",
  },
  {
    slug: "compound-interest",
    title: "Why compounding is magic",
    minutes: 4,
    level: "intermediate",
    blurb: "Your returns start earning their own returns.",
    body: [
      {
        heading: "The snowball",
        text: "Year 1 you earn 12% on ₹500 = ₹60. Year 2 you earn 12% on ₹560. By year 30, you're earning more each year than you originally put in.",
      },
      {
        heading: "Start early, not big",
        text: "₹500/month from age 20 beats ₹2000/month from age 35. Time matters more than amount.",
      },
    ],
    takeaway: "Starting small at 20 beats starting big at 35.",
  },
];

export function getLessonBySlug(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}

/* ─── Risk quiz ─── */

export interface RiskQuestion {
  q: string;
  options: { label: string; score: number; insight: string }[];
}

export const RISK_QUESTIONS: RiskQuestion[] = [
  {
    q: "Your ₹1,000 investment drops to ₹700 in a month. You…",
    options: [
      { label: "Sell immediately. I can't watch this.", score: 1, insight: "Honest — you prefer stable." },
      { label: "Wait and see. Markets bounce.", score: 2, insight: "Balanced thinker." },
      { label: "Buy more — it's on sale!", score: 3, insight: "You think long-term." },
    ],
  },
  {
    q: "When would you need this money back?",
    options: [
      { label: "Within a year", score: 1, insight: "Short horizon = low risk." },
      { label: "In 3–5 years", score: 2, insight: "Medium horizon." },
      { label: "7+ years or never, really", score: 3, insight: "Long horizon = you can take risk." },
    ],
  },
  {
    q: "Which sounds most like you?",
    options: [
      { label: "I want safety, even if growth is slow", score: 1, insight: "Capital preservation." },
      { label: "I want a balance of safety and growth", score: 2, insight: "Goldilocks." },
      { label: "I want maximum growth and can stomach swings", score: 3, insight: "Growth-seeker." },
    ],
  },
];

export function getRiskProfile(score: number): "conservative" | "moderate" | "aggressive" {
  if (score <= 4) return "conservative";
  if (score <= 7) return "moderate";
  return "aggressive";
}

export const RISK_PROFILE_META = {
  conservative: {
    label: "Conservative",
    desc: "You sleep better with steady returns. That's a real strength.",
  },
  moderate: {
    label: "Moderate",
    desc: "You can handle some bumps for better long-term growth.",
  },
  aggressive: {
    label: "Growth-seeker",
    desc: "You're playing the long game and can sit through storms.",
  },
} as const;

/* ─── Mock NAV history for portfolio ─── */
export function generateNavHistory(days = 30, start = 100) {
  const out: { day: number; nav: number }[] = [];
  let v = start;
  for (let i = 0; i < days; i++) {
    v = v * (1 + (Math.random() - 0.45) * 0.015);
    out.push({ day: i + 1, nav: Math.round(v * 100) / 100 });
  }
  return out;
}

export const GOALS = [
  { id: "save", title: "Save for something", emoji: "🎯", blurb: "A laptop, a trip, a course." },
  { id: "emergency", title: "Build a safety net", emoji: "🛟", blurb: "Money for when life happens." },
  { id: "grow", title: "Grow my money long-term", emoji: "🌱", blurb: "Future me will thank present me." },
  { id: "learn", title: "Just curious", emoji: "🧭", blurb: "I want to learn before committing." },
] as const;

export type GoalId = (typeof GOALS)[number]["id"];