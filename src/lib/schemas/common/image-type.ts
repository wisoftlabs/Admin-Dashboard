import { z } from "zod";

export const ImageTypeSchema = z.enum(["png", "jpg"]);

export type ImageType = z.infer<typeof ImageTypeSchema>;
