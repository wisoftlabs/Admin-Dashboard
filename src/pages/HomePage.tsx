import { Award, FileText, FolderKanban, Scale } from "lucide-react";

import { PhotoSlides } from "@/components/home/PhotoSlides";
import { RecentNews } from "@/components/home/RecentNews";
import { StatsCard } from "@/components/home/StatsCard";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { ErrorView } from "@/components/shared/error-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useGallerySlides } from "@/hooks/gallery/queries";
import { useHomeStats, useUpcomingEvents } from "@/hooks/home/queries";
import { usePinnedNews } from "@/hooks/news/queries";

export function HomePage() {
  const { data: stats, isLoading: statsLoading, isError: statsError } = useHomeStats();
  const { data: slides = [], isLoading: slidesLoading } = useGallerySlides();
  const { data: pinnedNews = [], isLoading: newsLoading } = usePinnedNews();
  const { data: upcomingEvents = [], isLoading: eventsLoading } = useUpcomingEvents();

  const photoSlides = slides.map(slide => ({
    id: slide.id,
    title: slide.title || "제목 없음",
    imageUrl: slide.file_url,
  }));

  const recentNews = pinnedNews.map(item => ({
    id: item.id,
    title: item.title,
    date: new Date(item.created_at).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\. /g, "."),
  }));

  if (statsError) {
    return <ErrorView message="데이터를 불러오는데 실패했습니다." />;
  }

  const isLoading = statsLoading || slidesLoading || newsLoading || eventsLoading;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="h-52 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-[39vh] w-full" />
          <Skeleton className="h-[39vh] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
        <StatsCard
          icon={Scale}
          value={stats?.patent_count || 0}
          label="Patents"
          variant="patent"
        />
      </div>

      <PhotoSlides slides={photoSlides} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-[39vh]">
          <RecentNews news={recentNews} />
        </div>
        <div className="h-[39vh]">
          <UpcomingEvents events={upcomingEvents} />
        </div>
      </div>
    </div>
  );
}
