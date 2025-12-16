import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  icon: LucideIcon;
  value: number;
  label: string;
  variant: "project" | "paper" | "award" | "patent";
};

const variantStyles = {
  project: "bg-gradient-to-br from-[#4facfe] to-[#00f2fe]",
  paper: "bg-gradient-to-br from-[#43e97b] to-[#38f9d7]",
  award: "bg-gradient-to-br from-[#fa709a] to-[#fee140]",
  patent: "bg-gradient-to-br from-[#667eea] to-[#764ba2]",
};

export function StatsCard({ icon: Icon, value, label, variant }: StatsCardProps) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-2xl font-bold text-foreground mb-0.5">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
        <div className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center",
          variantStyles[variant],
        )}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
    </Card>
  );
}
