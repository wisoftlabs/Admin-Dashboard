import { useNews } from "@/hooks/news/queries";
import { useMemo } from "react";
import { ErrorView } from "@/components/shared/error-view";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewsCreateDialog } from "@/components/news/NewsCreateDialog";
import { useDialog } from "@/hooks/shared/use-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsList } from "@/components/news/NewsList";

export function NewsPage() {
  const { data: news = [], isError, isLoading } = useNews();
  const { open, onOpenChange, closeDialog } = useDialog();

  const { pinnedNews, otherNews } = useMemo(() => {
    const sorted = [...news].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    const pinned = sorted.filter((item) => item.is_pin);
    const other = sorted.filter((item) => !item.is_pin);
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
    <div className="flex flex-col h-full pt-4 overflow-hidden">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">공지사항 관리</h1>
          <p className="text-sm text-muted-foreground">
            {news.length}개 등록됨
          </p>
        </div>
        <NewsCreateDialog
          open={open}
          onOpenChange={onOpenChange}
          onCreated={closeDialog}
        >
          <Button>
            <PlusIcon className="mr-2" />새 공지사항
          </Button>
        </NewsCreateDialog>
      </div>

      <div className="grid md:grid-cols-2 gap-8 flex-1 min-h-0 pb-4">
        <NewsList news={pinnedNews} title="고정된 공지사항" />
        <NewsList news={otherNews} title="일반 공지사항" />
      </div>
    </div>
  );
}