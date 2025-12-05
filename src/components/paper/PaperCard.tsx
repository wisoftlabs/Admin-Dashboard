import { useState } from "react";

import { PaperUpdateDialog } from "@/components/paper/UpdateDialog/PaperUpdateDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useDialog } from "@/hooks/shared/use-dialog";
import { type PaperPreview } from "@/lib/schemas/paper/paper-preview";
import { cn } from "@/lib/utils";

type PaperCardProps = {
  paper: PaperPreview;
};

export function PaperCard({ paper }: PaperCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { open, onOpenChange, openDialog, closeDialog } = useDialog();

  return (
    <>
      <PaperUpdateDialog
        paperId={paper.id}
        open={open}
        onOpenChange={onOpenChange}
        onDeleted={closeDialog}
      />
      <div
        className={cn(
          "group relative overflow-hidden rounded-lg bg-muted cursor-pointer",
          "aspect-[3/4]",
        )}
        onClick={openDialog}
      >
        {isLoading && <Skeleton className="absolute inset-0 h-full w-full animate-pulse" />}
        <img
          src={paper.image_url}
          alt={`Paper ${paper.year}`}
          onLoad={() => setIsLoading(false)}
          className={cn(
            "h-full w-full object-cover transition-all duration-300",
            isLoading ? "opacity-0" : "opacity-100",
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
          <p className="text-sm font-medium text-white line-clamp-1 drop-shadow-md">
            {paper.title}
          </p>
        </div>
      </div>
    </>
  );
}
