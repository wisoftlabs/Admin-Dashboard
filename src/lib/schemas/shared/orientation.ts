import { z } from "zod";

export const OrientationSchema = z.enum(["landscape", "portrait"]);

export type Orientation = z.infer<typeof OrientationSchema>;
