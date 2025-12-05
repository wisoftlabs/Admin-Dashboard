import { type ComponentProps } from "react";

import { PaperUpdateForm } from "@/components/paper/UpdateDialog/PaperUpdateForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { usePaper } from "@/hooks/paper/queries";
import { type Paper } from "@/lib/schemas/paper/paper";

type PaperUpdateDialogProps = {
  paperId: Paper["id"];
  onUpdated?: () => void;
  onDeleted: () => void;
} & ComponentProps<typeof Dialog>;

export function PaperUpdateDialog({
  paperId,
  open,
  onOpenChange,
  onUpdated,
  onDeleted,
  ...props
}: PaperUpdateDialogProps) {
  const {
    data: paper,
    isLoading,
    isError,
  } = usePaper(paperId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="h-[90vh] !max-w-fit min-w-3/4 w-[90vw] flex flex-col">
        <DialogHeader>
          <DialogTitle>논문 수정</DialogTitle>
          <DialogDescription className="sr-only">
            논문 정보를 수정합니다.
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
                  <p>논문 정보를 불러오는데 실패했습니다.</p>
                </div>
              )
            : paper
              ? (
                  <PaperUpdateForm
                    selectedPaper={paper}
                    onSuccess={onUpdated}
                    onDeleted={onDeleted}
                  />
                )
              : null}
      </DialogContent>
    </Dialog>
  );
}
