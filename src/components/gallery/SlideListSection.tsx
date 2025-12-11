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
    <Card className="mb-6 overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between px-6 pt-6 pb-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Images className="w-5 h-5 text-[#43e97b]" />
              <h3 className="text-lg font-bold">Photo Slides 관리</h3>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-[#43e97b] to-[#38f9d7] text-white"
              >
                {slides.length}
                개
              </Badge>
            </div>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-muted-foreground transition-transform",
                isOpen && "transform rotate-180",
              )}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-6 pb-6 border-t pt-4">
            {slides.length === 0
              ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <Images className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Photo Slides가 비어있습니다</p>
                    <p className="text-sm mt-2">
                      갤러리에서 이미지를 선택하고 "Photo Slides에 추가" 버튼을 클릭하세요
                    </p>
                  </div>
                )
              : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                    {slides.map(slide => (
                      <div
                        key={slide.id}
                        className="relative aspect-square rounded-lg overflow-hidden border bg-muted group shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white font-semibold">
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
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-2">
                          <p className="font-medium text-xs line-clamp-1">
                            {slide.title || "제목 없음"}
                          </p>
                        </div>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
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
