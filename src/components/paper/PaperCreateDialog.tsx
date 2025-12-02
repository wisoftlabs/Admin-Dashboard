import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {PaperCreateForm} from "@/components/paper/PaperCreateForm";
import type {ComponentProps} from "react";

type PaperCreateDialogProps = {
  onCreated: () => void;
} & ComponentProps<typeof Dialog>;

export function PaperCreateDialog({ open, onOpenChange, onCreated, children }: PaperCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>논문 추가</DialogTitle>
          <DialogDescription className="sr-only">논문을 추가합니다.</DialogDescription>
        </DialogHeader>
        <PaperCreateForm onSuccess={onCreated} />
      </DialogContent>
    </Dialog>
  );
}
