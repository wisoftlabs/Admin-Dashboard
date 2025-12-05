import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useCreateAward } from "@/hooks/award/mutations";
import {
  type AwardCreateFormData,
  AwardCreateFormDataSchema,
} from "@/lib/schemas/award/award-create-form-data";
import { getCurrentYear } from "@/lib/time";

import { AwardCreateFormFields } from "./AwardCreateFormFields";

type AwardCreateFormProps = {
  onSuccess?: () => void;
};

export function AwardCreateForm({ onSuccess }: AwardCreateFormProps) {
  const form = useForm<AwardCreateFormData>({
    resolver: zodResolver(AwardCreateFormDataSchema),
    defaultValues: {
      year: getCurrentYear(),
      title: "",
      awardee: "",
      competition: "",
      summary: "",
      date: new Date(),
    },
  });
  const { isValid } = form.formState;

  const { mutate: createAward, isPending } = useCreateAward();

  const onSubmit = async (formData: AwardCreateFormData) => {
    createAward(
      formData,
      {
        onSuccess: () => onSuccess?.(),
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <AwardCreateFormFields form={form} />
        <Button type="submit" disabled={isPending || !isValid}>
          {isPending ? <Spinner /> : "생성"}
        </Button>
      </form>
    </Form>
  );
}
