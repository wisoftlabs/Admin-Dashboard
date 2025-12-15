import { useState } from "react";

import { ChevronDown, Images, XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type SlideItem = {
  id: string;
  title?: string;
  imageUrl?: string;
};

type SlideListSectionProps = {
  slides: SlideItem[];
  onRemove: (id: string) => void;
};

export function SlideListSection({ slides, onRemove }: SlideListSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="mb-3 overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <Images className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <h3 className="font-semibold">Photo Slides 관리</h3>
              <Badge
                variant="secondary"
                className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs"
              >
                {slides.length}
                개
              </Badge>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                isOpen && "transform rotate-180",
              )}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-3 border-t pt-2">
            {slides.length === 0
              ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Images className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Photo Slides가 비어있습니다</p>
                    <p className="text-xs mt-1">
                      갤러리에서 이미지를 선택하고 "Photo Slides에 추가" 버튼을 클릭하세요
                    </p>
                  </div>
                )
              : (
                  <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-9 gap-2">
                    {slides.map(slide => (
                      <div
                        key={slide.id}
                        className="relative aspect-square rounded-md overflow-hidden border bg-muted group shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-xs">
                          {slide.imageUrl
                            ? (
                                <img
                                  src={slide.imageUrl}
                                  alt={slide.title}
                                  className="w-full h-full object-cover"
                                />
                              )
                            : (
                                "IMG"
                              )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-1.5">
                          <p className="font-medium text-xs line-clamp-1">
                            {slide.title || "제목 없음"}
                          </p>
                        </div>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute top-1.5 right-1.5 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          onClick={() => onRemove(slide.id)}
                        >
                          <XIcon className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
