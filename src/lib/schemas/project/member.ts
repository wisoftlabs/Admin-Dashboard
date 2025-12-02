import {z} from "zod";

export const MemberSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  extra: z.string(),
});

export type Member = z.infer<typeof MemberSchema>;