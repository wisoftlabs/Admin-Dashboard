import {z} from "zod";

export const MemberSchema = z.object({
  name: z.string(),
  extra: z.string(),
});

export type Member = z.infer<typeof MemberSchema>;