import { FileText } from "lucide-react";

import { PatentUpdateDialog } from "@/components/patent/UpdateDialog";
import { useDialog } from "@/hooks/shared/use-dialog";
import { type PatentPreview } from "@/lib/schemas/patent/patent-preview";
import { cn } from "@/lib/utils";

type PatentCardProps = {
  patent: PatentPreview;
};

export function PatentCard({ patent }: PatentCardProps) {
  const { open, onOpenChange, openDialog, closeDialog } = useDialog();

  return (
    <>
      <PatentUpdateDialog
        patentId={patent.id}
        open={open}
        onOpenChange={onOpenChange}
        onDeleted={closeDialog}
      />
      <div
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-lg bg-muted p-4",
          "aspect-square",
        )}
        onClick={openDialog}
      >
        <FileText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 text-muted-foreground/20 transition-transform duration-300 group-hover:scale-110" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold line-clamp-3">{patent.name}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
