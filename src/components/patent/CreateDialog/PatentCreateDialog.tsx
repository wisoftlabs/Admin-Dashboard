import type { ComponentProps } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PatentCreateForm } from "./PatentCreateForm";

type PatentCreateDialogProps = {
  onCreated: () => void;
} & ComponentProps<typeof Dialog>;

export function PatentCreateDialog({ open, onOpenChange, onCreated, children }: PatentCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>특허 추가</DialogTitle>
          <DialogDescription className="sr-only">특허를 추가합니다.</DialogDescription>
        </DialogHeader>
        <PatentCreateForm onSuccess={onCreated} />
      </DialogContent>
    </Dialog>
  );
}
