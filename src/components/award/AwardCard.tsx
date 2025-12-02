import { useState } from "react"; // 1. useState 추가
import { type AwardPreview } from "@/lib/schemas/award/award-preview";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // 2. Skeleton import
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/dialog/ConfirmDialog";
import { useDeleteAwardMutation } from "@/hooks/award/mutations";
import {ImageLightbox} from "@/components/shared/dialog/ImageLightBox";

type AwardCardProps = {
  award: AwardPreview;
};

export function AwardCard({ award }: AwardCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { mutate: deleteAward } = useDeleteAwardMutation(award.id);

  const handleDelete = () => {
    deleteAward();
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-muted",
        {
          "aspect-[4/3]": award.orientation === "landscape",
          "aspect-[3/4]": award.orientation === "portrait",
        }
      )}
    >
      {isLoading && <Skeleton className="absolute inset-0 h-full w-full animate-pulse" />}
      <ImageLightbox imageSrc={award.image_url} >
        <img
          src={award.image_url}
          alt={`Award ${award.year}`}
          onLoad={() => setIsLoading(false)}
          className={cn(
            "h-full w-full object-cover transition-all duration-300 group-hover:scale-105",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </ImageLightbox>
      <div className="absolute right-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ConfirmDialog title="수상내역 삭제" onConfirm={handleDelete}>
          <Button variant="destructive" size="icon-sm">
            <Trash2 />
          </Button>
        </ConfirmDialog>
      </div>
    </div>
  );
}