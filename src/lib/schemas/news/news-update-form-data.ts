import { z } from "zod";
import { NewsCreateFormDataSchema } from "./news-create-form-data";

export const NewsUpdateFormDataSchema = NewsCreateFormDataSchema.partial();

export type NewsUpdateFormData = z.infer<typeof NewsUpdateFormDataSchema>;
