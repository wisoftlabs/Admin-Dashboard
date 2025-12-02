import type {PaperPreview} from "@/lib/schemas/paper/paper-preview";
import {ChevronDownIcon} from "lucide-react";
import {PaperCard} from "@/components/paper/PaperCard";
import {Button} from "@/components/ui/button";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {getCurrentYear} from "@/lib/time";

type PaperYearSectionProps = {
  year: number;
  papers: PaperPreview[];
};

export function PaperYearSection({
  year,
  papers,
}: PaperYearSectionProps) {
  const currentYear = getCurrentYear();

  return (
    <Collapsible className="space-y-4" defaultOpen={currentYear === year}>
      <CollapsibleTrigger className="group cursor-pointer" asChild>
        <div className="flex w-full items-center gap-3 border-b border-b-border">
          <h2 className="text-2xl font-semibold select-none">{year}</h2>
          <span className="text-sm font-medium text-muted-foreground select-none">
            {papers.length}
          </span>
          <Button size="icon-sm" variant="link">
            <ChevronDownIcon className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Button>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
          {papers.map((paper) => (
            <div key={paper.id} className="mb-4 break-inside-avoid">
              <PaperCard paper={paper} />
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
