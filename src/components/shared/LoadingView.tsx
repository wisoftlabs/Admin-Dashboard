import type { ComponentProps } from "react";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type LoadingViewProps = ComponentProps<"div">;

export function LoadingView({ className, ...props }: LoadingViewProps) {
  return (
    <div
      className={cn("bg-transparent flex h-full w-full flex-col items-center justify-center gap-2", className)}
      {...props}
    >
      <Spinner />
    </div>
  );
}
