import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type NewsCreateFormData,
  NewsCreateFormDataSchema,
} from "@/lib/schemas/news/news-create-form-data";
import { useCreateNewsMutation } from "@/hooks/news/mutations";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  CheckboxFormField,
  InputFormField,
  TextAreaFormField,
} from "@/components/shared/form-fields";

type NewsCreateFormProps = {
  onSuccess?: () => void;
};

export function NewsCreateForm({ onSuccess }: NewsCreateFormProps) {
  const form = useForm<NewsCreateFormData>({
    resolver: zodResolver(NewsCreateFormDataSchema),
    defaultValues: {
      title: "",
      content: "",
      is_pin: false,
    },
  });
  const { isValid } = form.formState;

  const { mutate: createNews, isPending } = useCreateNewsMutation();

  const onSubmit = async (formData: NewsCreateFormData) => {
    createNews(formData, {
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
          {isPending ? <Spinner /> : "생성"}
        </Button>
      </form>
    </Form>
  );
}
