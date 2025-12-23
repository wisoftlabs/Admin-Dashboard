import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { PatentUpdateFormFields } from "@/components/patent/UpdateDialog/PatentUpdateFormFields";
import { ConfirmDialog } from "@/components/shared/dialog/ConfirmDialog";
import { LoadingView } from "@/components/shared/LoadingView";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useDeletePatent, useUpdatePatent } from "@/hooks/patent/mutations";
import { usePatent } from "@/hooks/patent/queries";
import { type Patent } from "@/lib/schemas/patent/patent";
import {
  type PatentUpdateFormData,
  PatentUpdateFormDataSchema,
} from "@/lib/schemas/patent/patent-update-form-data";

type PatentUpdateFormProps = {
  selectedPatentId: Patent["id"];
  onDeleted?: () => void;
};

export function PatentUpdateForm({ selectedPatentId, onDeleted }: PatentUpdateFormProps) {
  const { data: patent, isLoading } = usePatent(selectedPatentId);

  const form = useForm<PatentUpdateFormData>({
    resolver: zodResolver(PatentUpdateFormDataSchema),
    defaultValues: {
      year: 2025,
      name: "",
      description: "",
      link: "",
      registration_number: "",
      pdf_file: undefined,
    },
  });

  const { isDirty, isValid } = form.formState;
  const { mutate: updatePatent, isPending } = useUpdatePatent(patent?.id);
  const { mutate: deletePatent } = useDeletePatent(patent?.id);

  function handleDeletePatent() {
    deletePatent(undefined, { onSuccess: onDeleted });
  }

  useEffect(() => {
    if (selectedPatentId && patent)
      form.reset({
        ...patent,
        pdf_file: undefined,
      });
  }, [selectedPatentId, form, patent]);

  const onSubmit = (data: PatentUpdateFormData) => {
    if (!isDirty) return;
    updatePatent(data, {
      onSuccess: (updatedPatent) => {
        form.reset({
          ...updatedPatent,
          pdf_file: undefined,
        });
      },
    });
  };

  if (isLoading || !patent) {
    return <LoadingView />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex justify-between mb-4">
          <ConfirmDialog title={`\`${patent.name}\` 삭제`} onConfirm={handleDeletePatent}>
            <Button type="button" size="sm" variant="destructive">
              삭제
            </Button>
          </ConfirmDialog>
          <Button type="submit" disabled={!isDirty || !isValid || isPending} size="sm">
            {isPending ? <Spinner /> : "수정"}
          </Button>
        </div>
        <div className="flex-grow overflow-auto pr-2 mb-auto">
          <PatentUpdateFormFields form={form} patent={patent} />
        </div>
      </form>
    </Form>
  );
}
