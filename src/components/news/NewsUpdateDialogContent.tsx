import { NewsUpdateForm } from "@/components/news/NewsUpdateForm";
import type { NewsPreview } from "@/lib/schemas/news/news-preview";

type NewsEditDialogContentProps = {
  news: NewsPreview;
  onSuccess: () => void;
};

export function NewsUpdateDialogContent({
  news,
  onSuccess,
}: NewsEditDialogContentProps) {
  return <NewsUpdateForm news={news} onSuccess={onSuccess} />;
}
