import { useState } from "react";

import { CalendarIcon, ChevronDown, SortAsc, Trash2 } from "lucide-react";

import { ConfirmDialog } from "@/components/shared/dialog/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useDeleteGalleryImageMutation } from "@/hooks/gallery/mutations";
import { cn } from "@/lib/utils";

type GalleryImage = {
  id: string;
  title?: string;
  date: string;
  imageUrl?: string;
};

type GalleryYearSectionProps = {
  year: number;
  images: GalleryImage[];
  selectedImages: Set<string>;
  onImageSelect: (id: string) => void;
};

type SortType = "date" | "name";

export function GalleryYearSection({
  year,
  images,
  selectedImages,
  onImageSelect,
}: GalleryYearSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortType, setSortType] = useState<SortType>("date");
  const deleteImageMutation = useDeleteGalleryImageMutation();

  const sortedImages = [...images].sort((a, b) => {
    if (sortType === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return (a.title || "").localeCompare(b.title || "");
  });

  return (
    <Card className="overflow-hidden py-0">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div
            className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{year}</h3>
              <Badge
                variant="secondary"
                className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs"
              >
                {images.length}
                {" "}
                images
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 bg-muted p-0.5 rounded-md" onClick={e => e.stopPropagation()}>
                <Button
                  size="sm"
                  variant={sortType === "date" ? "secondary" : "ghost"}
                  className="h-7 gap-1 text-xs px-2"
                  onClick={() => setSortType("date")}
                >
                  <CalendarIcon className="w-3 h-3" />
                  날짜순
                </Button>
                <Button
                  size="sm"
                  variant={sortType === "name" ? "secondary" : "ghost"}
                  className="h-7 gap-1 text-xs px-2"
                  onClick={() => setSortType("name")}
                >
                  <SortAsc className="w-3 h-3" />
                  이름순
                </Button>
              </div>

              <ChevronDown
                className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  isOpen && "transform rotate-180",
                )}
              />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-3 border-t pt-2">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-10 gap-2">
              {sortedImages.map((image) => {
                const isSelected = selectedImages.has(image.id);
                return (
                  <div
                    key={image.id}
                    className={cn(
                      "group relative aspect-square rounded-md overflow-hidden border-2 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md",
                      isSelected
                        ? "border-primary shadow-md shadow-primary/20"
                        : "border-transparent bg-muted",
                    )}
                    onClick={() => onImageSelect(image.id)}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-xs"
                    >
                      {image.imageUrl
                        ? (
                            <img
                              src={image.imageUrl}
                              alt={image.title}
                              className="w-full h-full object-cover"
                            />
                          )
                        : (
                            "IMG"
                          )}
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-1.5 text-xs truncate"
                    >
                      {image.title}
                    </div>
                    <ConfirmDialog
                      title="정말로 이 이미지를 삭제하시겠습니까?"
                      onConfirm={() => deleteImageMutation.mutate(image.id)}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1.5 left-1.5 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg bg-white/90 hover:bg-white"
                        onClick={e => e.stopPropagation()}
                      >
                        <Trash2 className="w-3 h-3 text-red-600" />
                      </Button>
                    </ConfirmDialog>
                    <div
                      className={cn(
                        "absolute top-1.5 right-1.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-primary border-primary"
                          : "bg-white border-border",
                      )}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
