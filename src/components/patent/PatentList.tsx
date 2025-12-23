import { useState } from "react";

import { FileText } from "lucide-react";

import { ErrorView } from "@/components/shared/error-view";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { usePatents } from "@/hooks/patent/queries";
import type { Patent } from "@/lib/schemas/patent/patent";
import type { PatentPreview } from "@/lib/schemas/patent/patent-preview";
import { cn } from "@/lib/utils";

type PatentListProps = {
  selectedPatentId: Patent["id"] | null;
  onSelectPatent: (patentId: Patent["id"]) => void;
};

const ITEMS_PER_PAGE = 5;

export function PatentList({
  selectedPatentId,
  onSelectPatent,
}: PatentListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: patents = [],
    isLoading,
    isError,
  } = usePatents();

  if (isLoading) {
    return <PatentListSkeleton />;
  }

  if (isError) {
    return <ErrorView message="특허 목록을 불러오는 중 에러가 발생했습니다." />;
  }

  const totalPages = Math.ceil(patents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPatents = patents.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePreviousPage();
              }}
              className={cn(
                currentPage === 1 && "pointer-events-none opacity-50",
              )}

            />
          </PaginationItem>
          <PaginationItem>
            <span className="p-2">
              {currentPage}
              {" "}
              /
              {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNextPage();
              }}
              className={cn(
                currentPage === totalPages && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="grid flex-1 grid-rows-5 gap-2 min-h-0">
        {currentPatents.map(patent => (
          <PatentListItem
            key={patent.id}
            patent={patent}
            onClick={() => onSelectPatent(patent.id)}
            isSelected={selectedPatentId === patent.id}
          />
        ))}
      </div>
    </div>
  );
}

function PatentListSkeleton() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex justify-center p-2">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="grid flex-1 grid-rows-5 gap-2 min-h-0">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <Item key={index} className="h-full p-2 gap-3 items-stretch animate-pulse" variant="outline">
            <ItemMedia className="h-full w-auto aspect-square shrink-0 overflow-hidden rounded-md items-center justify-center flex">
              <Skeleton className="h-1/2 w-1/2" />
            </ItemMedia>
            <Skeleton className="flex flex-col justify-start py-0.5 gap-1 min-w-0" />
          </Item>
        ))}
      </div>
    </div>
  );
}

type PatentListItemProps = {
  onClick: () => void;
  isSelected: boolean;
  patent: PatentPreview;
};

function PatentListItem({ patent, isSelected, onClick }: PatentListItemProps) {
  return (
    <Item
      className={cn(
        "h-full p-2 gap-3 items-stretch select-none cursor-pointer",
        isSelected ? "border-ring bg-accent/5" : "",
      )}
      onClick={onClick}
      variant="outline"
    >
      <ItemMedia className="h-full w-auto aspect-square shrink-0 overflow-hidden rounded-md items-center justify-center flex bg-secondary">
        <FileText className="size-1/2 text-muted-foreground" />
      </ItemMedia>
      <ItemContent className="flex flex-col justify-start py-0.5 gap-1 min-w-0">
        <ItemTitle className="text-base font-semibold leading-none truncate">
          {patent.name}
        </ItemTitle>
        <div className="flex flex-col justify-between h-full">
          <ItemDescription className="line-clamp-2 text-sm text-muted-foreground break-keep">
            {patent.link}
          </ItemDescription>
          <ItemDescription>
            {patent.year}
            년
          </ItemDescription>
        </div>
      </ItemContent>
    </Item>
  );
}
