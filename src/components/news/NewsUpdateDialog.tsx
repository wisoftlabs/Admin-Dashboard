import type { ComponentProps } from "react";

import { NewsUpdateDialogContent } from "@/components/news/NewsUpdateDialogContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { NewsPreview } from "@/lib/schemas/news/news-preview";

type NewsEditDialogProps = {
  news: NewsPreview;
  onEdited: () => void;
} & ComponentProps<typeof Dialog>;

export function NewsUpdateDialog({
  open,
  onOpenChange,
  onEdited,
  children,
  news,
}: NewsEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>공지사항 수정</DialogTitle>
          <DialogDescription className="sr-only">
            공지사항을 수정합니다.
          </DialogDescription>
        </DialogHeader>
        <NewsUpdateDialogContent news={news} onSuccess={onEdited} />
      </DialogContent>
    </Dialog>
  );
}
