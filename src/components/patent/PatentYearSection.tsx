import { ChevronDownIcon } from "lucide-react";

import { PatentCard } from "@/components/patent/PatentCard";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { PatentPreview } from "@/lib/schemas/patent/patent-preview";
import { getCurrentYear } from "@/lib/utils/year";

type PatentYearSectionProps = {
  year: number;
  patents: PatentPreview[];
};

export function PatentYearSection({
  year,
  patents,
}: PatentYearSectionProps) {
  const currentYear = getCurrentYear();

  return (
    <Collapsible className="space-y-4" defaultOpen={currentYear === year}>
      <CollapsibleTrigger className="group cursor-pointer" asChild>
        <div className="flex w-full items-center gap-3 border-b border-b-border">
          <h2 className="text-2xl font-semibold select-none">{year}</h2>
          <span className="text-sm font-medium text-muted-foreground select-none">
            {patents.length}
          </span>
          <Button size="icon-sm" variant="link">
            <ChevronDownIcon className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Button>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="border rounded-lg bg-card overflow-hidden">
          {patents.map(patent => (
            <PatentCard key={patent.id} patent={patent} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
