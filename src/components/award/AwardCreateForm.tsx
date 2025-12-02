import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { YearSelectField } from "@/components/shared/form-fields";
import { ImageFileFormField } from "@/components/shared/form-fields/ImageFileFormField";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useCreateAwardMutation } from "@/hooks/award/mutations";
import {
  type AwardCreateFormData,
  AwardCreateFormDataSchema,
} from "@/lib/schemas/award/award-create-form-data";
import { getCurrentYear } from "@/lib/time";

type AwardCreateFormProps = {
  onSuccess?: () => void;
};

export function AwardCreateForm({ onSuccess }: AwardCreateFormProps) {
  const form = useForm<AwardCreateFormData>({
    resolver: zodResolver(AwardCreateFormDataSchema),
    defaultValues: {
      year: getCurrentYear(),
    },
  });
  const { isValid } = form.formState;

  const { mutate: createAward, isPending } = useCreateAwardMutation();

  const onSubmit = async (formData: AwardCreateFormData) => {
    createAward(formData,
      {
        onSuccess: () => onSuccess?.(),
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
          onError={message => form.setError("image_file", {
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
