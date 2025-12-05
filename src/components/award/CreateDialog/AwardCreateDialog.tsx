import type { ComponentProps } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AwardCreateForm } from "./AwardCreateForm";

type AwardCreateDialogProps = {
  onCreated: () => void;
} & ComponentProps<typeof Dialog>;

export function AwardCreateDialog({ open, onOpenChange, onCreated, children }: AwardCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>수상내역 추가</DialogTitle>
          <DialogDescription className="sr-only">수상내역을 추가합니다.</DialogDescription>
        </DialogHeader>
        <AwardCreateForm onSuccess={onCreated} />
      </DialogContent>
    </Dialog>
  );
}
