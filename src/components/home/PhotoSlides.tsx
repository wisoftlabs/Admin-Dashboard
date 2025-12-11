import { useRef } from "react";
import { Link } from "react-router";

import { ChevronLeft, ChevronRight, ImagesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ImagesIcon className="w-5 h-5 text-[#43e97b]" />
            Photo Slides
          </h3>
          <Link to="/gallery" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
            Gallery 관리
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="text-center py-10 text-muted-foreground">
          <ImagesIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Photo Slides가 비어있습니다</p>
          <p className="text-sm mt-2">Gallery에서 이미지를 Photo Slides에 추가하세요</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="px-6 pt-6 pb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <ImagesIcon className="w-5 h-5 text-[#43e97b]" />
          Photo Slides
        </h3>
        <div className="flex items-center gap-2">
          <Link to="/gallery" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
            Gallery 관리
            <ChevronRight className="w-4 h-4" />
          </Link>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="px-6 pb-6 flex gap-4 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted"
        style={{ scrollbarWidth: "thin" }}
      >
        {slides.map(slide => (
          <div
            key={slide.id}
            className="relative w-[270px] h-[270px] rounded-xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-lg transition-all flex-shrink-0"
          >
            <div className={cn(
              "w-full h-full flex items-center justify-center text-white font-semibold",
              slide.imageUrl ? "" : "bg-gradient-to-br from-[#667eea] to-[#764ba2]",
            )}
            >
              {slide.imageUrl
                ? (
                    <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                  )
                : (
                    "IMG"
                  )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3 text-sm font-medium">
              {slide.title}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
