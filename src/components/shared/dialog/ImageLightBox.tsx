import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

type ImageLightboxProps = {
  imageSrc: string;
  alt?: string;
  className?: string;
} & ComponentProps<typeof Dialog>;

export function ImageLightbox({
  imageSrc,
  alt = "Image detail",
  children,
  className,
}: ImageLightboxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={cn("cursor-zoom-in", className)}>
          {children}
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-none size-fit border-none bg-transparent shadow-none p-0" showCloseButton={false}>
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogDescription className="sr-only">{alt}</DialogDescription>
        <div className="relative flex items-center justify-center">
          <img
            src={imageSrc}
            alt={alt}
            className="max-w-[90vw] max-h-[85vh] w-auto h-auto rounded-md object-contain shadow-2xl"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}