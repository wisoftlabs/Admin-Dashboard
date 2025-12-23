import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { AwardUpdateFormFields } from "@/components/award/UpdateDialog/AwardUpdateFormFields";
import { ConfirmDialog } from "@/components/shared/dialog/ConfirmDialog";
import { LoadingView } from "@/components/shared/LoadingView";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteAward, useUpdateAward } from "@/hooks/award/mutations";
import { useAward } from "@/hooks/award/queries";
import { type Award } from "@/lib/schemas/award/award";
import {
  type AwardUpdateFormData,
  AwardUpdateFormDataSchema,
} from "@/lib/schemas/award/award-update-form-data";

type AwardUpdateFormProps = {
  selectedAwardId: Award["id"];
  onDeleted?: () => void;
};

export function AwardUpdateForm({ selectedAwardId, onDeleted }: AwardUpdateFormProps) {
  const { data: award, isLoading } = useAward(selectedAwardId);

  const form = useForm<AwardUpdateFormData>({
    resolver: zodResolver(AwardUpdateFormDataSchema),
    defaultValues: {
      year: 2025,
      description: "",
      title: "",
      image_file: undefined,
    },
  });

  const { isDirty, isValid } = form.formState;
  const { mutate: updateAward, isPending } = useUpdateAward(selectedAwardId);
  const { mutate: deleteAward } = useDeleteAward(selectedAwardId);

  function handleDeleteAward() {
    deleteAward(undefined, { onSuccess: onDeleted });
  }

  useEffect(() => {
    if (selectedAwardId && award)
      form.reset({
        ...award,
        image_file: undefined,
      });
  }, [selectedAwardId, form, award]);

  const onSubmit = (data: AwardUpdateFormData) => {
    if (!isDirty) return;
    updateAward(data, {
      onSuccess: (updatedAward) => {
        form.reset({
          ...updatedAward,
          image_file: undefined,
        });
      },
    });
  };

  if (isLoading || !award) {
    return <LoadingView />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex justify-between mb-4">
          <ConfirmDialog title={`\`${award.title}\` 삭제`} onConfirm={handleDeleteAward}>
            <Button type="button" size="sm" variant="destructive">
              삭제
            </Button>
          </ConfirmDialog>
          <Button type="submit" disabled={!isDirty || !isValid || isPending} size="sm">
            {isPending ? <Spinner /> : "수정"}
          </Button>
        </div>
        <div className="flex-grow overflow-auto pr-2 mb-auto">
          <AwardUpdateFormFields form={form} award={award} />
        </div>
      </form>
    </Form>
  );
}
