import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type PaperCreateFormData,
  PaperCreateFormDataSchema,
} from "@/lib/schemas/paper/paper-create-form-data";
import { useCreatePaperMutation } from "@/hooks/paper/mutations";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImageFileFormField } from "@/components/shared/form-fields/ImageFileFormField";
import {Spinner} from "@/components/ui/spinner";
import {YearSelectField} from "@/components/shared/form-fields";
import {getCurrentYear} from "@/lib/time";

type PaperCreateFormProps = {
  onSuccess?: () => void;
};

export function PaperCreateForm({ onSuccess }: PaperCreateFormProps) {
  const form = useForm<PaperCreateFormData>({
    resolver: zodResolver(PaperCreateFormDataSchema),
    defaultValues: {
      year: getCurrentYear(),
    },
  });
  const { isValid } = form.formState;

  const { mutate: createPaper, isPending } = useCreatePaperMutation();

  const onSubmit = async (formData: PaperCreateFormData) => {
    createPaper(formData,
      {
        onSuccess: () => onSuccess?.()
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <YearSelectField
          control={form.control}
          name="year"
          label="수상년도"
        />

        <ImageFileFormField
          control={form.control}
          name="image_file"
          label="이미지 파일"
          onError={(message) => form.setError("image_file", {
            message,
          })}
        />

        <Button type="submit" disabled={isPending || !isValid}>
          {isPending ? <Spinner /> : "생성"}
        </Button>
      </form>
    </Form>
  );
}
