import { useState } from "react";

import { AwardUpdateDialog } from "@/components/award/UpdateDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useDialog } from "@/hooks/shared/use-dialog";
import { type AwardPreview } from "@/lib/schemas/award/award-preview";
import { cn } from "@/lib/utils";

type AwardCardProps = {
  award: AwardPreview;
};

export function AwardCard({ award }: AwardCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { open, onOpenChange, openDialog, closeDialog } = useDialog();

  return (
    <>
      <AwardUpdateDialog
        awardId={award.id}
        open={open}
        onOpenChange={onOpenChange}
        onDeleted={closeDialog}
        onSuccess={closeDialog}
      />
      <div
        className={cn(
          "group relative overflow-hidden rounded-lg bg-muted cursor-pointer",
          {
            "aspect-[4/3]": award.orientation === "landscape",
            "aspect-[3/4]": award.orientation === "portrait",
          },
        )}
        onClick={openDialog}
      >
        {isLoading && <Skeleton className="absolute inset-0 h-full w-full animate-pulse" />}
        <img
          src={award.image_url}
          alt={`Award ${award.year}`}
          onLoad={() => setIsLoading(false)}
          className={cn(
            "h-full w-full object-cover transition-all duration-300 group-hover:scale-105",
            isLoading ? "opacity-0" : "opacity-100",
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
          <p className="text-sm font-medium text-white line-clamp-1 drop-shadow-md">
            {award.title}
          </p>
        </div>
      </div>
    </>
  );
}
