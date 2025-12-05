import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { PaperCreateFormFields } from "@/components/paper/CreateDialog/PaperCreateFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useCreatePaper } from "@/hooks/paper/mutations";
import {
  type PaperCreateFormData,
  PaperCreateFormDataSchema,
} from "@/lib/schemas/paper/paper-create-form-data";
import { getCurrentYear } from "@/lib/utils/year";

type PaperCreateFormProps = {
  onSuccess?: () => void;
};

export function PaperCreateForm({ onSuccess }: PaperCreateFormProps) {
  const form = useForm<PaperCreateFormData>({
    resolver: zodResolver(PaperCreateFormDataSchema),
    defaultValues: {
      year: getCurrentYear(),
      title: "",
      authors: "",
      abstract: "",
      conference: "",
      journal: "",
      publication_date: new Date(),
      link: "",
      image_file: undefined,
    },
  });
  const { isValid } = form.formState;

  const { mutate: createPaper, isPending } = useCreatePaper();

  const onSubmit = async (formData: PaperCreateFormData) => {
    createPaper(formData,
      {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex-grow overflow-auto pr-2 mb-auto">
          <PaperCreateFormFields form={form} />
        </div>

        <div className="flex-shrink-0 flex justify-end pt-2 border-t">
          <Button type="submit" disabled={isPending || !isValid}>
            {isPending ? <Spinner /> : "생성"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
