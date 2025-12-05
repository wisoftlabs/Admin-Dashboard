import { type PatentPreview } from "@/lib/schemas/patent/patent-preview";

export type PatentGetAllResponse = {
  patents: PatentPreview[];
};
