import {z} from "zod";
import {PaperSchema} from "@/lib/schemas/paper/paper";

export const PaperPreviewSchema = PaperSchema;

export type PaperPreview = z.infer<typeof PaperPreviewSchema>;
