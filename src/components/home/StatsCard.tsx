import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  icon: LucideIcon;
  value: number;
  label: string;
  variant: "gallery" | "project" | "paper" | "award";
};

const variantStyles = {
  gallery: "bg-gradient-to-br from-[#667eea] to-[#764ba2]",
  project: "bg-gradient-to-br from-[#4facfe] to-[#00f2fe]",
  paper: "bg-gradient-to-br from-[#43e97b] to-[#38f9d7]",
  award: "bg-gradient-to-br from-[#fa709a] to-[#fee140]",
};

export function StatsCard({ icon: Icon, value, label, variant }: StatsCardProps) {
  return (
    <Card className="p-5 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
        <div className={cn(
          "w-11 h-11 rounded-lg flex items-center justify-center",
          variantStyles[variant],
        )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </Card>
  );
}
