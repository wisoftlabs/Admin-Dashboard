import { groupBy } from "es-toolkit";
import { PlusIcon } from "lucide-react";

import { AwardCreateDialog } from "@/components/award/AwardCreateDialog";
import { AwardYearSection } from "@/components/award/AwardYearSection";
import { ErrorView } from "@/components/shared/error-view";
import { Button } from "@/components/ui/button";
import { useAwards } from "@/hooks/award/queries";
import { useDialog } from "@/hooks/shared/use-dialog";

export function AwardPage() {
  const { data: awards = [], isError } = useAwards();
  const { open, onOpenChange, closeDialog } = useDialog();

  const groupedAwards = groupBy(awards, award => award.year);
  const years = Object
    .keys(groupedAwards)
    .map(Number)
    .sort((a, b) => b - a);

  if (isError) {
    return <ErrorView message="수상 정보를 불러오는데 실패했습니다." />;
  }

  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">수상내역</h1>
            <p className="text-sm text-muted-foreground">
              전체
              {Object.values(groupedAwards).flat().length}
              개
            </p>
          </div>

          <AwardCreateDialog
            open={open}
            onOpenChange={onOpenChange}
            onCreated={closeDialog}
          >
            <Button>
              <PlusIcon />
            </Button>
          </AwardCreateDialog>
        </div>
      </div>

      <div className="space-y-8">
        {years.map(year => (
          <AwardYearSection
            key={year}
            year={year}
            awards={groupedAwards[year]}
          />
        ))}
      </div>
    </div>
  );
}
