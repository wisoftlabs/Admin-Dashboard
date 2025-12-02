import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ProjectFormFields } from "@/components/project/ProjectFormFields";
import { ConfirmDialog } from "@/components/shared/dialog/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteProjectMutation, useUpdateProjectMutation } from "@/hooks/projects/mutations";
import type { Project } from "@/lib/schemas/project/project";
import {
  type ProjectUpdateFormData,
  ProjectUpdateFormDataSchema,
} from "@/lib/schemas/project/project-update";

type ProjectUpdateFormProps = {
  selectedProject: Project;
  onDeleted?: () => void;
};

export function ProjectUpdateForm({ selectedProject, onDeleted }: ProjectUpdateFormProps) {
  const form = useForm<ProjectUpdateFormData>({
    resolver: zodResolver(ProjectUpdateFormDataSchema),
    defaultValues: {
      ...selectedProject,
      thumbnail: undefined,
    },
  });

  const { isDirty } = form.formState;
  const { mutate: updateProject, isPending } = useUpdateProjectMutation(selectedProject.id);
  const { mutate: deleteProject } = useDeleteProjectMutation(selectedProject.id);

  function handleDeleteProject() {
    deleteProject(undefined, { onSuccess: onDeleted });
  }

  useEffect(() => {
    if (selectedProject)
      form.reset({
        ...selectedProject,
        thumbnail: undefined,
      });
  }, [selectedProject, form]);

  const onSubmit = (data: ProjectUpdateFormData) => {
    if (!isDirty) return;
    updateProject(data, {
      onSuccess: (updatedProject) => {
        form.reset({
          ...updatedProject,
          thumbnail: undefined,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex justify-between mb-4">
          <ConfirmDialog title={`\`${selectedProject.name}\` 삭제`} onConfirm={handleDeleteProject}>
            <Button type="button" size="sm" variant="destructive">
              삭제
            </Button>
          </ConfirmDialog>
          <Button type="submit" disabled={!isDirty || isPending} size="sm">
            {isPending ? <Spinner /> : "수정"}
          </Button>
        </div>

        <ProjectFormFields form={form} selectedProject={selectedProject} />
      </form>
    </Form>
  );
}
