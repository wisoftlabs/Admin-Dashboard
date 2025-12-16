import { Link } from "react-router";

import { ChevronRight, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type NewsItem = {
  id: string;
  title: string;
  date: string;
};

type RecentNewsProps = {
  news: NewsItem[];
  onCreateClick?: () => void;
};

export function RecentNews({ news, onCreateClick }: RecentNewsProps) {
  return (
    <Card className="p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold">News</h3>
        {onCreateClick && (
          <Button onClick={onCreateClick} size="sm">
            <PlusIcon className="w-3 h-3" />
            뉴스 작성
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {news.length === 0
          ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">등록된 뉴스가 없습니다</p>
              </div>
            )
          : (
              <ul className="space-y-0">
                {news.map(item => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between py-2.5 border-b last:border-b-0"
                  >
                    <span className="font-semibold text-xs text-foreground flex-1 truncate">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted-foreground ml-3 flex-shrink-0">
                      {item.date}
                    </span>
                  </li>
                ))}
              </ul>
            )}
      </div>

      <div className="mt-3 text-center">
        <Link
          to="/news"
          className="text-xs font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1"
        >
          전체보기
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </Card>
  );
}
