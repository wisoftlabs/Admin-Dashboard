import { useState } from "react";

import { groupBy } from "es-toolkit";
import { PlusIcon } from "lucide-react";

import { PatentCreateDialog } from "@/components/patent/CreateDialog";
import { PatentYearSection } from "@/components/patent/PatentYearSection";
import { ErrorView } from "@/components/shared/error-view";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { usePatents } from "@/hooks/patent/queries";

export function PatentPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { data: patents = [], isLoading, isError } = usePatents();

  const handleCreated = () => {
    setCreateDialogOpen(false);
  };

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

  const patentsByYear = groupBy(patents, patent => patent.year);

  const years = Object.keys(patentsByYear)
    .map(Number)
    .sort((a, b) => b - a); // Sort years in descending order

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">특허</h1>
        <PatentCreateDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} onCreated={handleCreated}>
          <Button>
            <PlusIcon />
          </Button>
        </PatentCreateDialog>
      </div>

      <div className="space-y-8">
        {years.map(year => (
          <PatentYearSection key={year} year={year} patents={patentsByYear[year]} />
        ))}
      </div>
    </div>
  );
}
