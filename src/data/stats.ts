export interface Stat {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { prefix: "RM", value: 250, suffix: "M+", label: "Annual Revenue" },
  { value: 40000, suffix: "MT+", label: "Steel Processed Yearly" },
  { value: 660, suffix: "+", label: "Employees" },
  { value: 90, suffix: "%+", label: "Customer Satisfaction" },
];
