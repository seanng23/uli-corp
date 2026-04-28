import type { LucideIcon } from "lucide-react";
import { Building2, Factory, Server, Zap, Ship, Flame, Landmark } from "lucide-react";

export interface Industry {
  label: string;
  icon: LucideIcon;
}

export const industries: Industry[] = [
  { label: "Construction", icon: Building2 },
  { label: "Commercial & Industrial", icon: Factory },
  { label: "Telecom & Data Centres", icon: Server },
  { label: "Energy & Utilities", icon: Zap },
  { label: "Transportation & Marine", icon: Ship },
  { label: "Oil and Gas", icon: Flame },
  { label: "Government Buildings", icon: Landmark },
];
