import { PatentUpdateDialog } from "@/components/patent/UpdateDialog";
import { useDialog } from "@/hooks/shared/use-dialog";
import { type PatentPreview } from "@/lib/schemas/patent/patent-preview";

type PatentCardProps = {
  patent: PatentPreview;
};

export function PatentCard({ patent }: PatentCardProps) {
  const { open, onOpenChange, openDialog, closeDialog } = useDialog();

  const inventionDate = patent.invention_date
    ? new Date(patent.invention_date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      <PatentUpdateDialog
        patentId={patent.id}
        open={open}
        onOpenChange={onOpenChange}
        onDeleted={closeDialog}
      />
      <div
        className="flex items-center justify-between py-3 px-4 hover:bg-muted/50 cursor-pointer transition-colors border-b last:border-b-0"
        onClick={openDialog}
      >
        <h3 className="text-sm font-medium truncate flex-1">
          {patent.name}
        </h3>
        {inventionDate && (
          <span className="text-sm text-muted-foreground ml-4 flex-shrink-0">
            {inventionDate}
          </span>
        )}
      </div>
    </>
  );
}
