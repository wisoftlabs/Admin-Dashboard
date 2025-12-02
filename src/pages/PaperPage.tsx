import { usePapers } from "@/hooks/paper/queries";
import { groupBy } from "es-toolkit";
import {ErrorView} from "@/components/shared/error-view";
import {PaperCreateDialog} from "@/components/paper/PaperCreateDialog";
import {useDialog} from "@/hooks/shared/use-dialog";
import {PaperYearSection} from "@/components/paper/PaperYearSection";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";

export function PaperPage() {
  const { data: papers = [], isError } = usePapers();
  const { open, onOpenChange, closeDialog } = useDialog();

  const groupedPapers = groupBy(papers, (paper) => paper.year);
  const years = Object
    .keys(groupedPapers)
    .map(Number)
    .sort((a, b) => b - a)

  if (isError) {
    return <ErrorView message="논문 정보를 불러오는데 실패했습니다." />
  }

  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">논문</h1>
            <p className="text-sm text-muted-foreground">전체 {Object.values(groupedPapers).flat().length}개</p>
          </div>

          <PaperCreateDialog
            open={open}
            onOpenChange={onOpenChange}
            onCreated={closeDialog}
          >
            <Button>
              <PlusIcon />
            </Button>
          </PaperCreateDialog>
        </div>
      </div>

      <div className="space-y-8">
        {years.map((year) => (
          <PaperYearSection
            key={year}
            year={year}
            papers={groupedPapers[year]}
          />
        ))}
      </div>
    </div>
  );
}
