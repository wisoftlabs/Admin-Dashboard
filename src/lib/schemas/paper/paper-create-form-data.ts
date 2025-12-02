import {z} from "zod";
import {PaperSchema} from "@/lib/schemas/paper/paper";
import {ImageFileSchema} from "@/lib/schemas/common/image-file";

export const PaperCreateFormDataSchema = PaperSchema.omit({
  id: true,
  image_url: true,
  image_type: true,
}).extend({
  image_file: ImageFileSchema,
});

export type PaperCreateFormData = z.infer<typeof PaperCreateFormDataSchema>;
