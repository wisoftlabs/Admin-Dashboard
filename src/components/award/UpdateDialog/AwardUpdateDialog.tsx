import { type ComponentProps } from "react";

import { AwardUpdateForm } from "@/components/award/UpdateDialog/AwardUpdateForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useAward } from "@/hooks/award/queries";
import { type Award } from "@/lib/schemas/award/award";

type AwardUpdateDialogProps = {
  awardId: Award["id"];
  onSuccess?: () => void;
  onDeleted: () => void;
} & ComponentProps<typeof Dialog>;

export function AwardUpdateDialog({
  awardId,
  open,
  onOpenChange,
  onSuccess,
  onDeleted,
  ...props
}: AwardUpdateDialogProps) {
  const {
    data: award,
    isLoading,
    isError,
  } = useAward(awardId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="h-[90vh] !max-w-fit min-w-3/4 w-[90vw] flex flex-col">
        <DialogHeader>
          <DialogTitle>수상내역 수정</DialogTitle>
          <DialogDescription className="sr-only">
            수상내역을 수정합니다.
          </DialogDescription>
        </DialogHeader>
        {isLoading
          ? (
              <div className="flex justify-center items-center flex-grow">
                <Spinner />
              </div>
            )
          : isError
            ? (
                <div className="flex justify-center items-center flex-grow">
                  <p>수상내역을 불러오는데 실패했습니다.</p>
                </div>
              )
            : award
              ? (
                  <AwardUpdateForm
                    award={award}
                    onSuccess={onSuccess}
                    onDeleted={onDeleted}
                  />
                )
              : null}
      </DialogContent>
    </Dialog>
  );
}
