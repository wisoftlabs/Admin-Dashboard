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
import { getCurrentYear } from "@/lib/utils/year";

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
        className="h-full flex flex-col"
      >
        <div className="flex justify-end mb-4">
          <Button type="submit" disabled={isPending || !isValid} size="sm">
            {isPending ? <Spinner /> : "생성"}
          </Button>
        </div>
        <AwardCreateFormFields form={form} />
      </form>
    </Form>
  );
}
