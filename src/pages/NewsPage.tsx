import { useMemo } from "react";

import { PlusIcon } from "lucide-react";

import { NewsCreateDialog } from "@/components/news/NewsCreateDialog";
import { NewsList } from "@/components/news/NewsList";
import { ErrorView } from "@/components/shared/error-view";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "@/hooks/news/queries";
import { useDialog } from "@/hooks/shared/use-dialog";

export function NewsPage() {
  const { data: news = [], isError, isLoading } = useNews();
  const { open, onOpenChange, closeDialog } = useDialog();

  const { pinnedNews, otherNews } = useMemo(() => {
    const sorted = [...news].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    const pinned = sorted.filter(item => item.is_pin);
    const other = sorted.filter(item => !item.is_pin);
    return { pinnedNews: pinned, otherNews: other };
  }, [news]);

  if (isError) {
    return <ErrorView message="공지사항을 불러오는데 실패했습니다." />;
  }

  if (isLoading) {
    return (
      <div className="pt-4 grid md:grid-cols-2 gap-8">
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="border-b pb-6">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            전체
            {" "}
            {news.length}
            개 등록됨
          </p>
          <NewsCreateDialog
            open={open}
            onOpenChange={onOpenChange}
            onCreated={closeDialog}
          >
            <Button>
              <PlusIcon />
            </Button>
          </NewsCreateDialog>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 flex-1 min-h-0 pt-4">
        <NewsList news={pinnedNews} title="고정된 공지사항" />
        <NewsList news={otherNews} title="일반 공지사항" />
      </div>
    </div>
  );
}
