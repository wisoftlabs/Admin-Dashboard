import type { Award } from "@/lib/schemas/award/award";
import type { AwardPreview } from "@/lib/schemas/award/award-preview";

export type AwardGetAllResponse = {
  awards: Array<AwardPreview>;
};

export type AwardGetResponse = Award;
