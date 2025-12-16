import { useRef } from "react";
import { Link } from "react-router";

import { ChevronLeft, ChevronRight, ImagesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FILE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type PhotoSlideItem = {
  id: string;
  title: string;
  imageUrl?: string;
};

type PhotoSlidesProps = {
  slides: PhotoSlideItem[];
};

export function PhotoSlides({ slides }: PhotoSlidesProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 280;
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (slides.length === 0) {
    return (
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold flex items-center gap-2">
            <ImagesIcon className="w-4 h-4" />
            Photo Slides
          </h3>
          <Link to="/gallery" className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
            Gallery 관리
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <ImagesIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Photo Slides가 비어있습니다</p>
          <p className="text-xs mt-1">Gallery에서 이미지를 Photo Slides에 추가하세요</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden py-0">
      <div className="px-4 py-4 flex items-center justify-between">
        <h3 className="text-base font-bold flex items-center gap-2">
          <ImagesIcon className="w-4 h-4" />
          Photo Slides
        </h3>
        <div className="flex items-center gap-2">
          <Link to="/gallery" className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
            Gallery 관리
            <ChevronRight className="w-3" />
          </Link>
          <div className="flex gap-1.5">
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="px-4 pb-2 pt-1 flex gap-3 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted"
        style={{ scrollbarWidth: "thin" }}
      >
        {slides.map(slide => (
          <div
            key={slide.id}
            className="relative w-[200px] h-[200px] rounded-lg overflow-hidden shadow-md flex-shrink-0"
          >
            <div className={cn(
              "w-full h-full flex items-center justify-center font-semibold text-xs",
              slide.imageUrl ? "" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400",
            )}
            >
              {slide.imageUrl
                ? (
                    <img src={FILE_URL + slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                  )
                : (
                    "IMG"
                  )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-1.5 text-xs truncate">
              {slide.title}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
