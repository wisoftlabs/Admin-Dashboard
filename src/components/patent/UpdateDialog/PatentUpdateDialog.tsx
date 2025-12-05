import { type ComponentProps } from "react";

import { PatentUpdateForm } from "@/components/patent/UpdateDialog/PatentUpdateForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { usePatent } from "@/hooks/patent/queries";
import { type Patent } from "@/lib/schemas/patent/patent";

type PatentUpdateDialogProps = {
  patentId: Patent["id"];
  onUpdated?: () => void;
  onDeleted: () => void;
} & ComponentProps<typeof Dialog>;

export function PatentUpdateDialog({
  patentId,
  open,
  onOpenChange,
  onUpdated,
  onDeleted,
  ...props
}: PatentUpdateDialogProps) {
  const {
    data: patent,
    isLoading,
    isError,
  } = usePatent(patentId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="h-[90vh] !max-w-fit min-w-3/4 w-[90vw] flex flex-col">
        <DialogHeader>
          <DialogTitle>특허 수정</DialogTitle>
          <DialogDescription className="sr-only">
            특허 정보를 수정합니다.
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
                  <p>특허 정보를 불러오는데 실패했습니다.</p>
                </div>
              )
            : patent
              ? (
                  <PatentUpdateForm
                    patent={patent}
                    onSuccess={onUpdated}
                    onDeleted={onDeleted}
                  />
                )
              : null}
      </DialogContent>
    </Dialog>
  );
}
