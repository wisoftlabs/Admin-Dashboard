import type { Paper } from "@/lib/schemas/paper/paper";
import type { PaperPreview } from "@/lib/schemas/paper/paper-preview";

export type PaperGetAllResponse = {
  papers: Array<PaperPreview>;
};

export type PaperGetResponse = Paper;
