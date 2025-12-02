import type { ComponentProps } from "react";

import { NewsCreateForm } from "@/components/news/NewsCreateForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type NewsCreateDialogProps = {
  onCreated: () => void;
} & ComponentProps<typeof Dialog>;

export function NewsCreateDialog({
  open,
  onOpenChange,
  onCreated,
  children,
}: NewsCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>공지사항 추가</DialogTitle>
          <DialogDescription className="sr-only">
            새로운 공지사항을 추가합니다.
          </DialogDescription>
        </DialogHeader>
        <NewsCreateForm onSuccess={onCreated} />
      </DialogContent>
    </Dialog>
  );
}
