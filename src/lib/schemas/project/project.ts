import {z} from "zod";
import {MemberSchema} from "@/lib/schemas/project/member";

export const ProjectSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  team_name: z.string(),
  description: z.string(),
  members: z.array(MemberSchema),
  thumbnail: z.string(),
  year: z.number(),
});

export type Project = z.infer<typeof ProjectSchema>;