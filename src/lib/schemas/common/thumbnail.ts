import { z } from "zod";

export const ThumbnailFileSchema = z
  .file("썸네일 파일을 업로드해주세요.")
  .refine(file => file.type.startsWith("image/"));

export type ThumbnailFile = z.infer<typeof ThumbnailFileSchema>;
