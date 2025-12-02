import { NewsUpdateForm } from "@/components/news/NewsUpdateForm";
import { ErrorView } from "@/components/shared/error-view";
import { Spinner } from "@/components/ui/spinner";
import { useNewsById } from "@/hooks/news/queries";

type NewsEditDialogContentProps = {
  newsId: string;
  onSuccess: () => void;
};

export function NewsUpdateDialogContent({
  newsId,
  onSuccess,
}: NewsEditDialogContentProps) {
  const { data: news, isLoading, isError, isSuccess } = useNewsById(newsId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorView message="공지사항 정보를 불러오는데 실패했습니다." />;
  }

  if (isSuccess) {
    return <NewsUpdateForm news={news} onSuccess={onSuccess} />;
  }

  return null;
}
