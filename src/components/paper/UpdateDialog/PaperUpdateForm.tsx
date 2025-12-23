import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { PaperUpdateFormFields } from "@/components/paper/UpdateDialog/PaperUpdateFormFields";
import { ConfirmDialog } from "@/components/shared/dialog/ConfirmDialog";
import { LoadingView } from "@/components/shared/LoadingView";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useDeletePaper, useUpdatePaper } from "@/hooks/paper/mutations";
import { usePaper } from "@/hooks/paper/queries";
import { type Paper } from "@/lib/schemas/paper/paper";
import {
  type PaperUpdateFormData,
  PaperUpdateFormDataSchema,
} from "@/lib/schemas/paper/paper-update-form-data";

type PaperUpdateFormProps = {
  selectedPaperId: Paper["id"];
  onDeleted?: () => void;
};

export function PaperUpdateForm({ selectedPaperId, onDeleted }: PaperUpdateFormProps) {
  const { data: paper, isLoading } = usePaper(selectedPaperId);

  const form = useForm<PaperUpdateFormData>({
    resolver: zodResolver(PaperUpdateFormDataSchema),
    defaultValues: {
      year: 2025,
      authors: "",
      journal: "",
      paper_abstract: "",
      title: "",
      conference: "",
      publication_date: new Date(),
      link: "",
      image_file: undefined,
    },
  });

  const { isDirty, isValid } = form.formState;
  const { mutate: updatePaper, isPending } = useUpdatePaper(selectedPaperId);
  const { mutate: deletePaper } = useDeletePaper(selectedPaperId);

  function handleDeletePaper() {
    deletePaper(undefined, { onSuccess: onDeleted });
  }

  useEffect(() => {
    if (selectedPaperId && paper)
      form.reset({
        ...paper,
        image_file: undefined,
      });
  }, [selectedPaperId, form, paper]);

  const onSubmit = (data: PaperUpdateFormData) => {
    if (!isDirty) return;
    updatePaper(data, {
      onSuccess: (updatedPaper) => {
        form.reset({
          ...updatedPaper,
          image_file: undefined,
        });
      },
    });
  };

  if (isLoading || !paper) {
    return <LoadingView />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex justify-between mb-4">
          <ConfirmDialog title={`\`${paper.title}\` 삭제`} onConfirm={handleDeletePaper}>
            <Button type="button" size="sm" variant="destructive">
              삭제
            </Button>
          </ConfirmDialog>
          <Button type="submit" disabled={!isDirty || !isValid || isPending} size="sm">
            {isPending ? <Spinner /> : "수정"}
          </Button>
        </div>
        <div className="flex-grow overflow-auto pr-2 mb-auto">
          <PaperUpdateFormFields form={form} selectedPaper={paper} />
        </div>
      </form>
    </Form>
  );
}
