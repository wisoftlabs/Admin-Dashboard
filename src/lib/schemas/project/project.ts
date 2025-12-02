import {z} from "zod";
import {MemberSchema} from "@/lib/schemas/project/member";

export const ProjectSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "프로젝트 이름을 입력해주세요."),
  team_name: z.string().min(1, "팀 이름을 입력해주세요."),
  description: z.string(),
  members: z.array(MemberSchema),
  thumbnail: z.string(),
  year: z.number(),
});

export type Project = z.infer<typeof ProjectSchema>;