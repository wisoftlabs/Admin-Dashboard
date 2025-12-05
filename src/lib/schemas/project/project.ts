import { z } from "zod";

import { MemberSchema } from "@/lib/schemas/project/member";
import { ProjectStatusSchema } from "@/lib/schemas/project/project-status";

export const ProjectSchema = z.object({
  id: z.uuid(),
  year: z.number(),
  status: ProjectStatusSchema,
  name: z.string().min(1, "프로젝트 이름을 입력해주세요."),
  description: z.string(),
  members: z.array(MemberSchema),
  thumbnail: z.string(),
  link: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
