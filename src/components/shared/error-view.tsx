import { cva, type VariantProps } from "class-variance-authority";
import { BanIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const errorTextVariants = cva("font-bold", {
  variants: {
    size: {
      "sm": "text-sm",
      "lg": "text-lg",
      "xl": "text-xl",
      "2xl": "text-2xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

type ErrorViewProps = {
  message: string;
  className?: string;
} & VariantProps<typeof errorTextVariants>;

export function ErrorView({
  message,
  size,
  className,
}: ErrorViewProps) {
  return (
    <div className={cn("flex h-full w-full flex-col items-center justify-center gap-2", className)}>
      <BanIcon className="size-10 text-muted-foreground" />
      <h3 className={cn(errorTextVariants({ size }))}>
        {message}
      </h3>
    </div>
  );
}
