import { type ArrayPath, type Control, type FieldArray, useFieldArray } from "react-hook-form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Member, MemberSchema } from "@/lib/schemas/project/member";
import type { ProjectCreateFormData } from "@/lib/schemas/project/project-create";
import type { ProjectUpdateFormData } from "@/lib/schemas/project/project-update";

import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";

type ProjectFormData = ProjectCreateFormData | ProjectUpdateFormData;

type ProjectMemberFieldProps<T extends ProjectFormData> = {
  control: Control<T>;
};

export function ProjectMemberField<T extends ProjectFormData>({ control }: ProjectMemberFieldProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members" as ArrayPath<T>,
  });

  const form = useForm<{ name: string; extra: string }>({
    resolver: zodResolver(MemberSchema),
    defaultValues: { name: "", extra: "" },
  });

  const handleAddMember = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const values = form.getValues();
      append(values as FieldArray<T, ArrayPath<T>>);
      form.reset();
    }
  };

  return (
    <div className="space-y-1.5">
      <Form {...form}>
        <div className="flex space-x-2 items-center">
          <Label>팀원</Label>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input className="h-8" placeholder="이름" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="extra"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input className="h-8" placeholder="역할 또는 설명" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" size="sm" onClick={handleAddMember}>
            <PlusIcon />
          </Button>
        </div>
      </Form>

      <div className="rounded-md border overflow-y-auto h-[6rem]">
        <Table>
          <TableHeader className="sticky top-0 bg-secondary">
            <TableRow>
              <TableHead className="h-8 px-2">이름</TableHead>
              <TableHead className="h-8 px-2">역할/설명</TableHead>
              <TableHead className="h-8 w-[50px] px-2"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.length > 0
              ? (
                  fields.map((field, index) => {
                    const member = field as unknown as Member;

                    return (
                      <TableRow key={field.id}>
                        <TableCell className="py-0.5 px-2">{member.name}</TableCell>
                        <TableCell className="py-0.5 px-2">{member.extra}</TableCell>
                        <TableCell className="py-0.5 px-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="size-6"
                          >
                            <X className="size-3 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )
              : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-1 px-2">
                      멤버가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
