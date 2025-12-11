import { useState } from "react";

import { CalendarIcon, ChevronDown, SortAsc } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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

  const sortedImages = [...images].sort((a, b) => {
    if (sortType === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return (a.title || "").localeCompare(b.title || "");
  });

  return (
    <Card className="overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between px-6 pt-6 pb-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold">{year}</h3>
              <Badge variant="secondary" className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
                {images.length}
                {" "}
                images
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1 bg-muted p-1 rounded-lg" onClick={e => e.stopPropagation()}>
                <Button
                  size="sm"
                  variant={sortType === "date" ? "secondary" : "ghost"}
                  className="h-8 gap-1 text-xs"
                  onClick={() => setSortType("date")}
                >
                  <CalendarIcon className="w-3 h-3" />
                  날짜순
                </Button>
                <Button
                  size="sm"
                  variant={sortType === "name" ? "secondary" : "ghost"}
                  className="h-8 gap-1 text-xs"
                  onClick={() => setSortType("name")}
                >
                  <SortAsc className="w-3 h-3" />
                  이름순
                </Button>
              </div>

              <ChevronDown
                className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform",
                  isOpen && "transform rotate-180",
                )}
              />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-6 pb-4 border-t pt-4">
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-7 gap-3">
              {sortedImages.map((image) => {
                const isSelected = selectedImages.has(image.id);
                return (
                  <div
                    key={image.id}
                    className={cn(
                      "relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg",
                      isSelected
                        ? "border-primary shadow-md shadow-primary/20"
                        : "border-transparent bg-muted",
                    )}
                    onClick={() => onImageSelect(image.id)}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white font-semibold">
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
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-2 text-xs truncate">
                      {image.title}
                    </div>
                    <div
                      className={cn(
                        "absolute top-2 right-2 w-6 h-6 rounded border-2 flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-primary border-primary"
                          : "bg-white border-border",
                      )}
                    >
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-white"
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
