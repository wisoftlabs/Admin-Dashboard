import "dayjs/locale/ko";
import "dayjs/locale/en";

import dayjs from "dayjs";

dayjs.locale("ko");

export function formatDate(date: Date): string {
  return dayjs(date).format("YYYY-MM-DD");
}

export const parseDate = (dateStr: string) => dayjs(dateStr.replace(/\[.*\]/, ""));
