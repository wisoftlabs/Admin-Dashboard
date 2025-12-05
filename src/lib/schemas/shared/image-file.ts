import { z } from "zod";

export const ImageFileSchema = z
  .file("이미지 파일을 업로드해주세요.")
  .refine(file => file.type.startsWith("image/"));

export type ImageFile = z.infer<typeof ImageFileSchema>;
