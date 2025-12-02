import { useState } from "react";
import { type PaperPreview } from "@/lib/schemas/paper/paper-preview";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/dialog/ConfirmDialog";
import { useDeletePaperMutation } from "@/hooks/paper/mutations";
import {ImageLightbox} from "@/components/shared/dialog/ImageLightBox";

type PaperCardProps = {
  paper: PaperPreview;
};

export function PaperCard({ paper }: PaperCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { mutate: deletePaper } = useDeletePaperMutation(paper.id);

  const handleDelete = () => {
    deletePaper();
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-muted",
        "aspect-[3/4]"
      )}
    >
      {isLoading && <Skeleton className="absolute inset-0 h-full w-full animate-pulse" />}
      <ImageLightbox imageSrc={paper.image_url} >
        <img
          src={paper.image_url}
          alt={`Paper ${paper.year}`}
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
        <ConfirmDialog title="논문 삭제" onConfirm={handleDelete}>
          <Button variant="destructive" size="icon-sm">
            <Trash2 />
          </Button>
        </ConfirmDialog>
      </div>
    </div>
  );
}
