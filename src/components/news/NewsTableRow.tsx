import { Trash2 } from "lucide-react";

import { NewsUpdateDialog } from "@/components/news/NewsUpdateDialog";
import { ConfirmDialog } from "@/components/shared/dialog/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  useDeleteNewsMutation,
  useToggleNewsPinMutation,
} from "@/hooks/news/mutations";
import { useDialog } from "@/hooks/shared/use-dialog";
import { formatDate } from "@/lib/date";
import type { NewsPreview } from "@/lib/schemas/news/news-preview";

type NewsTableRowProps = {
  news: NewsPreview;
};

export function NewsTableRow({ news }: NewsTableRowProps) {
  const { open, onOpenChange, closeDialog } = useDialog();
  const { mutate: togglePin } = useToggleNewsPinMutation(news.id);
  const { mutate: deleteNews } = useDeleteNewsMutation(news.id);

  return (
    <TableRow>
      <TableCell className="w-24 text-center">
        <Badge
          variant={news.is_pin ? "default" : "secondary"}
          onClick={() => togglePin(news.is_pin)}
          className="cursor-pointer"
        >
          {news.is_pin ? "고정" : "일반"}
        </Badge>
      </TableCell>
      <TableCell className="font-medium">
        <NewsUpdateDialog
          newsId={news.id}
          open={open}
          onOpenChange={onOpenChange}
          onEdited={closeDialog}
        >
          <span className="cursor-pointer hover:underline">{news.title}</span>
        </NewsUpdateDialog>
      </TableCell>
      <TableCell className="w-48 hidden md:table-cell">
        {formatDate(news.created_at)}
      </TableCell>
      <TableCell className="w-16">
        <ConfirmDialog
          title="정말로 이 공지사항을 삭제하시겠습니까?"
          onConfirm={() => deleteNews()}
        >
          <Button variant="ghost" size="icon-sm">
            <Trash2 />
          </Button>
        </ConfirmDialog>
      </TableCell>
    </TableRow>
  );
}
