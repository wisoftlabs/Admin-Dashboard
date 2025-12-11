import { Award, FileText, FolderKanban, ImagesIcon } from "lucide-react";

import { PhotoSlides } from "@/components/home/PhotoSlides";
import { RecentNews } from "@/components/home/RecentNews";
import { StatsCard } from "@/components/home/StatsCard";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { ErrorView } from "@/components/shared/error-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useGallerySlides } from "@/hooks/gallery/queries";
import { useHomeStats } from "@/hooks/home/queries";
import { useNews } from "@/hooks/news/queries";

export function HomePage() {
  const { data: stats, isLoading: statsLoading, isError: statsError } = useHomeStats();
  const { data: slides = [], isLoading: slidesLoading } = useGallerySlides();
  const { data: news = [], isLoading: newsLoading } = useNews();

  const photoSlides = slides.map(slide => ({
    id: slide.id,
    title: slide.title || "제목 없음",
    imageUrl: slide.file_url,
  }));

  const recentNews = news.slice(0, 5).map(item => ({
    id: item.id,
    title: item.title,
    date: new Date(item.created_at).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\. /g, "."),
  }));

  const upcomingEvents = [
    { id: "1", month: "DEC", day: 5, title: "연구실 세미나", time: "오후 2:00 - 4:00" },
    { id: "2", month: "DEC", day: 10, title: "프로젝트 발표", time: "오전 10:00 - 12:00" },
    { id: "3", month: "DEC", day: 15, title: "논문 마감", time: "종일" },
    { id: "4", month: "DEC", day: 20, title: "학회 참석", time: "오전 9:00 - 오후 6:00" },
  ];

  if (statsError) {
    return <ErrorView message="데이터를 불러오는데 실패했습니다." />;
  }

  const isLoading = statsLoading || slidesLoading || newsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={ImagesIcon}
          value={stats?.gallery_count || 0}
          label="Gallery"
          variant="gallery"
        />
        <StatsCard
          icon={FolderKanban}
          value={stats?.project_count || 0}
          label="Projects"
          variant="project"
        />
        <StatsCard
          icon={FileText}
          value={stats?.paper_count || 0}
          label="Papers"
          variant="paper"
        />
        <StatsCard
          icon={Award}
          value={stats?.award_count || 0}
          label="Awards"
          variant="award"
        />
      </div>

      <PhotoSlides slides={photoSlides} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentNews news={recentNews} />
        <UpcomingEvents events={upcomingEvents} />
      </div>
    </div>
  );
}
