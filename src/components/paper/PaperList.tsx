import { useState } from "react";

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
import { usePapers } from "@/hooks/paper/queries";
import { FILE_URL } from "@/lib/constants";
import type { Paper } from "@/lib/schemas/paper/paper";
import type { PaperPreview } from "@/lib/schemas/paper/paper-preview";
import { cn } from "@/lib/utils";

type PaperListProps = {
  selectedPaperId: Paper["id"] | null;
  onSelectPaper: (paper: Paper["id"]) => void;
};

const ITEMS_PER_PAGE = 5;

export function PaperList({
  selectedPaperId,
  onSelectPaper,
}: PaperListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: papers = [],
    isLoading,
    isError,
  } = usePapers();

  if (isLoading) {
    return <PaperListSkeleton />;
  }

  if (isError) {
    return <ErrorView message="논문 목록을 불러오는 중 에러가 발생했습니다." />;
  }

  const totalPages = Math.ceil(papers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPapers = papers.slice(startIndex, endIndex);

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
        {currentPapers.map(paper => (
          <PaperListItem
            key={paper.id}
            paper={paper}
            onClick={() => onSelectPaper(paper.id)}
            isSelected={selectedPaperId === paper.id}
          />
        ))}
      </div>
    </div>
  );
}

function PaperListSkeleton() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex justify-center p-2">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="grid flex-1 grid-rows-5 gap-2 min-h-0">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <Item key={index} className="h-full p-2 gap-3 items-stretch animate-pulse" variant="outline">
            <ItemMedia className="h-full w-auto aspect-square shrink-0 overflow-hidden rounded-md">
              <Skeleton className="h-full w-full" />
            </ItemMedia>
            <Skeleton className="flex flex-col justify-start py-0.5 gap-1 min-w-0" />
          </Item>
        ))}
      </div>
    </div>
  );
}

type PaperListItemProps = {
  onClick: () => void;
  isSelected: boolean;
  paper: PaperPreview;
};

function PaperListItem({ paper, isSelected, onClick }: PaperListItemProps) {
  return (
    <Item
      className={cn(
        "h-full p-2 gap-3 items-stretch select-none cursor-pointer",
        isSelected ? "border-ring bg-accent/5" : "",
      )}
      onClick={onClick}
      variant="outline"
    >
      <ItemMedia className="h-full w-auto aspect-square shrink-0 overflow-hidden rounded-md">
        <img
          className="h-full w-full object-cover"
          src={FILE_URL + paper.image_url}
          alt={`${paper.title} Thumbnail`}
        />
      </ItemMedia>
      <ItemContent className="flex flex-col justify-start py-0.5 gap-1 min-w-0">
        <ItemTitle className="text-base font-semibold leading-none truncate">
          {paper.title}
        </ItemTitle>
        <div className="flex flex-col justify-between h-full">
          <ItemDescription className="line-clamp-2 text-sm text-muted-foreground break-keep">
            {paper.authors}
          </ItemDescription>
          <ItemDescription>
            {paper.year}
            년
          </ItemDescription>
        </div>
      </ItemContent>
    </Item>
  );
}
