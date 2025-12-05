import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { AwardUpdateFormFields } from "@/components/award/UpdateDialog/AwardUpdateFormFields";
import { ConfirmDialog } from "@/components/shared/dialog/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteAward, useUpdateAward } from "@/hooks/award/mutations";
import { type Award } from "@/lib/schemas/award/award";
import {
  type AwardUpdateFormData,
  AwardUpdateFormDataSchema,
} from "@/lib/schemas/award/award-update-form-data";

type AwardUpdateFormProps = {
  award: Award;
  onDeleted?: () => void;
  onSuccess?: () => void;
};

export function AwardUpdateForm({ award, onDeleted, onSuccess }: AwardUpdateFormProps) {
  const form = useForm<AwardUpdateFormData>({
    resolver: zodResolver(AwardUpdateFormDataSchema),
    defaultValues: {
      ...award,
      image_file: undefined,
    },
  });

  const { isDirty, isValid } = form.formState;
  const { mutate: updateAward, isPending } = useUpdateAward(award.id);
  const { mutate: deleteAward } = useDeleteAward(award.id);

  function handleDeleteAward() {
    deleteAward(undefined, { onSuccess: onDeleted });
  }

  useEffect(() => {
    if (award)
      form.reset({
        ...award,
        image_file: undefined,
      });
  }, [award, form]);

  const onSubmit = (data: AwardUpdateFormData) => {
    if (!isDirty) return;
    updateAward(data, {
      onSuccess: (updatedAward) => {
        form.reset({
          ...updatedAward,
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
          <AwardUpdateFormFields form={form} award={award} />
        </div>
        <div className="flex-shrink-0 flex justify-between pt-4 border-t">
          <ConfirmDialog title={`\`${award.title}\` 삭제`} onConfirm={handleDeleteAward}>
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
