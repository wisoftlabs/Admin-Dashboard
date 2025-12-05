import { CircleIcon } from "lucide-react";

import type { ProjectStatus } from "@/lib/schemas/project/project-status";
import { cn } from "@/lib/utils";

type ProjectStatusIconProps = {
  status: ProjectStatus;
  className?: string;
};

export function ProjectStatusIcon({ status, className }: ProjectStatusIconProps) {
  return (
    <CircleIcon
      className={cn(
        "size-2",
        status === "progress" ? "fill-red-500" : "fill-green-500",
        className,
      )}
    />
  );
}
