import { ChevronDownIcon } from "lucide-react";

import { PatentCard } from "@/components/patent/PatentCard";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { PatentPreview } from "@/lib/schemas/patent/patent-preview";
import { getCurrentYear } from "@/lib/time";

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
        <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
          {patents.map(patent => (
            <div key={patent.id} className="mb-4 break-inside-avoid">
              <PatentCard patent={patent} />
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
