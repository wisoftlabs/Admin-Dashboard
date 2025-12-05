import { groupBy } from "es-toolkit";
import { PlusIcon } from "lucide-react";

import { PatentCreateDialog } from "@/components/patent/CreateDialog";
import { PatentYearSection } from "@/components/patent/PatentYearSection";
import { ErrorView } from "@/components/shared/error-view";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { usePatents } from "@/hooks/patent/queries";
import { useDialog } from "@/hooks/shared/use-dialog";

export function PatentPage() {
  const { open, onOpenChange, closeDialog } = useDialog();
  const { data: patents = [], isLoading, isError } = usePatents();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorView message="특허 정보를 불러오는데 실패했습니다." />;
  }

  const groupedPatents = groupBy(patents, patent => patent.year);
  const years = Object.keys(groupedPatents)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              전체
              {" "}
              {Object.values(groupedPatents).flat().length}
              개
            </p>
          </div>

          <PatentCreateDialog
            open={open}
            onOpenChange={onOpenChange}
            onCreated={closeDialog}
          >
            <Button>
              <PlusIcon />
            </Button>
          </PatentCreateDialog>
        </div>
      </div>

      <div className="space-y-8">
        {years.map(year => (
          <PatentYearSection key={year} year={year} patents={groupedPatents[year]} />
        ))}
      </div>
    </div>
  );
}
