import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { PatentUpdateFormFields } from "@/components/patent/UpdateDialog/PatentUpdateFormFields";
import { ConfirmDialog } from "@/components/shared/dialog/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useDeletePatent, useUpdatePatent } from "@/hooks/patent/mutations";
import { type Patent } from "@/lib/schemas/patent/patent";
import {
  type PatentUpdateFormData,
  PatentUpdateFormDataSchema,
} from "@/lib/schemas/patent/patent-update-form-data";

type PatentUpdateFormProps = {
  patent: Patent;
  onDeleted?: () => void;
  onSuccess?: () => void;
};

export function PatentUpdateForm({ patent, onDeleted, onSuccess }: PatentUpdateFormProps) {
  const form = useForm<PatentUpdateFormData>({
    resolver: zodResolver(PatentUpdateFormDataSchema),
    defaultValues: {
      ...patent,
      pdf_file: undefined,
    },
  });

  const { isDirty, isValid } = form.formState;
  const { mutate: updatePatent, isPending } = useUpdatePatent(patent.id);
  const { mutate: deletePatent } = useDeletePatent(patent.id);

  function handleDeletePatent() {
    deletePatent(undefined, { onSuccess: onDeleted });
  }

  useEffect(() => {
    if (patent)
      form.reset({
        ...patent,
        pdf_file: undefined,
      });
  }, [patent, form]);

  const onSubmit = (data: PatentUpdateFormData) => {
    if (!isDirty) return;
    updatePatent(data, {
      onSuccess: (updatedPatent) => {
        form.reset({
          ...updatedPatent,
          pdf_file: undefined,
        });
        onSuccess?.();
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex-grow overflow-auto pr-2 mb-auto">
          <PatentUpdateFormFields form={form} patent={patent} />
        </div>
        <div className="flex-shrink-0 flex justify-between pt-4 border-t">
          <ConfirmDialog title={`\`${patent.name}\` 삭제`} onConfirm={handleDeletePatent}>
            <Button type="button" size="sm" variant="destructive">
              삭제
            </Button>
          </ConfirmDialog>
          <Button type="submit" disabled={!isDirty || !isValid || isPending} size="sm">
            {isPending ? <Spinner /> : "수정"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
