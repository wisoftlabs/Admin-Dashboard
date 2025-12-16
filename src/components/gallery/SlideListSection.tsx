import { useState } from "react";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, GripVertical, Images, Save, XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useReorderSlidesMutation } from "@/hooks/gallery/mutations";
import { FILE_URL } from "@/lib/constants";
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

type SortableSlideItemProps = {
  slide: SlideItem;
  onRemove: (id: string) => void;
};

function SortableSlideItem({ slide, onRemove }: SortableSlideItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slide.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative aspect-square rounded-md overflow-hidden border bg-muted group shadow-sm hover:shadow-md transition-shadow",
        isDragging && "opacity-50 z-50",
      )}
    >
      <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-xs">
        {slide.imageUrl
          ? (
              <img
                src={FILE_URL + slide.imageUrl}
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
        variant="ghost"
        className="absolute top-1.5 left-1.5 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg bg-white/90 hover:bg-white cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-3 h-3 text-slate-600" />
      </Button>
      <Button
        size="icon"
        variant="destructive"
        className="absolute top-1.5 right-1.5 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        onClick={() => onRemove(slide.id)}
      >
        <XIcon className="w-3 h-3" />
      </Button>
    </div>
  );
}

export function SlideListSection({ slides, onRemove }: SlideListSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const reorderMutation = useReorderSlidesMutation();

  // Use slides directly or maintain local state based on hasChanges
  const [localSlides, setLocalSlides] = useState(slides);

  // Reset local slides when external slides change and no pending changes
  if (!hasChanges && slides !== localSlides) {
    setLocalSlides(slides);
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLocalSlides((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        setHasChanges(true);
        return newItems;
      });
    }
  };

  const handleSaveOrder = async () => {
    const slidesWithOrder = localSlides.map((slide, index) => ({
      id: slide.id,
      order: index + 1,
    }));

    await reorderMutation.mutateAsync(slidesWithOrder);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalSlides(slides);
    setHasChanges(false);
  };

  return (
    <Card className="mb-3 overflow-hidden py-0">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <Images className="w-4 h-4" />
              <h3 className="font-semibold">Photo Slides 관리</h3>
              <Badge
                variant="secondary"
                className="text-xs"
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
            {localSlides.length === 0
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
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={localSlides.map(s => s.id)}>
                      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-9 gap-2">
                        {localSlides.map(slide => (
                          <SortableSlideItem
                            key={slide.id}
                            slide={slide}
                            onRemove={onRemove}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
            {hasChanges && (
              <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  disabled={reorderMutation.isPending}
                >
                  취소
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSaveOrder}
                  disabled={reorderMutation.isPending}
                  className="gap-1"
                >
                  <Save className="w-3 h-3" />
                  순서 저장
                </Button>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
