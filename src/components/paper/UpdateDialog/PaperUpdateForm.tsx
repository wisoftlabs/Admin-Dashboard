import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { PaperUpdateFormFields } from "@/components/paper/UpdateDialog/PaperUpdateFormFields";
import { ConfirmDialog } from "@/components/shared/dialog/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useDeletePaper, useUpdatePaper } from "@/hooks/paper/mutations";
import { type Paper } from "@/lib/schemas/paper/paper";
import {
  type PaperUpdateFormData,
  PaperUpdateFormDataSchema,
} from "@/lib/schemas/paper/paper-update-form-data";

type PaperUpdateFormProps = {
  selectedPaper: Paper;
  onDeleted?: () => void;
  onSuccess?: () => void;
};

export function PaperUpdateForm({ selectedPaper, onDeleted, onSuccess }: PaperUpdateFormProps) {
  const form = useForm<PaperUpdateFormData>({
    resolver: zodResolver(PaperUpdateFormDataSchema),
    defaultValues: {
      ...selectedPaper,
      image_file: undefined,
    },
  });

  const { isDirty, isValid } = form.formState;
  const { mutate: updatePaper, isPending } = useUpdatePaper(selectedPaper.id);
  const { mutate: deletePaper } = useDeletePaper(selectedPaper.id);

  function handleDeletePaper() {
    deletePaper(undefined, { onSuccess: onDeleted });
  }

  useEffect(() => {
    if (selectedPaper)
      form.reset({
        ...selectedPaper,
        image_file: undefined,
      });
  }, [selectedPaper, form]);

  const onSubmit = (data: PaperUpdateFormData) => {
    if (!isDirty) return;
    updatePaper(data, {
      onSuccess: (updatedPaper) => {
        form.reset({
          ...updatedPaper,
          image_file: undefined,
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
          <PaperUpdateFormFields form={form} selectedPaper={selectedPaper} />
        </div>
        <div className="flex-shrink-0 flex justify-between pt-4 border-t">
          <ConfirmDialog title={`\`${selectedPaper.title}\` 삭제`} onConfirm={handleDeletePaper}>
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
