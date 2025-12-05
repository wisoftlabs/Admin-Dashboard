import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { PatentCreateFormFields } from "@/components/patent/CreateDialog/PatentCreateFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useCreatePatent } from "@/hooks/patent/mutations";
import {
  type PatentCreateFormData,
  PatentCreateFormDataSchema,
} from "@/lib/schemas/patent/patent-create-form-data";
import { getCurrentYear } from "@/lib/time";

type PatentCreateFormProps = {
  onSuccess?: () => void;
};

export function PatentCreateForm({ onSuccess }: PatentCreateFormProps) {
  const form = useForm<PatentCreateFormData>({
    resolver: zodResolver(PatentCreateFormDataSchema),
    defaultValues: {
      name: "",
      year: getCurrentYear(),
      invention_date: new Date(),
      link: "",
      pdf_file: undefined,
    },
  });
  const { isValid } = form.formState;

  const { mutate: createPatent, isPending } = useCreatePatent();

  const onSubmit = async (formData: PatentCreateFormData) => {
    createPatent(formData,
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
          <PatentCreateFormFields form={form} />
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
