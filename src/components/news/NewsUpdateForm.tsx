import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateNewsMutation } from "@/hooks/news/mutations";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  CheckboxFormField,
  InputFormField,
  TextAreaFormField,
} from "@/components/shared/form-fields";
import {
  type NewsUpdateFormData,
  NewsUpdateFormDataSchema,
} from "@/lib/schemas/news/news-update-form-data";
import { type News } from "@/lib/schemas/news/news";

type NewsEditFormProps = {
  news: News;
  onSuccess?: () => void;
};

export function NewsUpdateForm({ news, onSuccess }: NewsEditFormProps) {
  const form = useForm<NewsUpdateFormData>({
    resolver: zodResolver(NewsUpdateFormDataSchema),
    defaultValues: {
      title: news.title,
      content: news.content,
      is_pin: news.is_pin,
    },
  });
  const { isValid } = form.formState;

  const { mutate: updateNews, isPending } = useUpdateNewsMutation(news.id);

  const onSubmit = async (formData: NewsUpdateFormData) => {
    updateNews(formData, {
      onSuccess: () => onSuccess?.(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputFormField
          control={form.control}
          name="title"
          label="제목"
          placeholder="공지사항 제목을 입력하세요"
        />
        <TextAreaFormField
          control={form.control}
          name="content"
          label="내용"
          placeholder="공지사항 내용을 입력하세요"
        />
        <CheckboxFormField
          control={form.control}
          name="is_pin"
          label="상단 고정"
          description="체크 시 공지사항 목록 상단에 고정됩니다."
        />
        <Button type="submit" disabled={isPending || !isValid}>
          {isPending ? <Spinner /> : "수정"}
        </Button>
      </form>
    </Form>
  );
}
