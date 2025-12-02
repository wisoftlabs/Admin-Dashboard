import { NewsTableRow } from "@/components/news/NewsTableRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { NewsPreview } from "@/lib/schemas/news/news-preview";

type NewsListProps = {
  title: string;
  news: NewsPreview[];
};

export function NewsList({ news, title }: NewsListProps) {
  return (
    <Card className="h-full flex flex-col min-h-0 py-0 pt-4 overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-0">
        <div className="overflow-y-auto h-full">
          <Table>
            <TableHeader className="sticky top-0 bg-secondary z-10">
              <TableRow>
                <TableHead className="w-24 text-center">상태</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="w-48">작성일</TableHead>
                <TableHead className="w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.length === 0
                ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-36 text-center hover:bg-background select-none text-muted-foreground">
                        {title}
                        이 없습니다.
                      </TableCell>
                    </TableRow>
                  )
                : (
                    news.map(item => <NewsTableRow key={item.id} news={item} />)
                  )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
