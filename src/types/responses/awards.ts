import type {AwardPreview} from "@/lib/schemas/award/award-preview";

export type AwardGetAllResponse = {
  awards: Array<AwardPreview>;
}