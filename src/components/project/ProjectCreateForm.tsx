import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ProjectFormFields } from "@/components/project/ProjectFormFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useCreateProjectMutation } from "@/hooks/projects/mutations";
import {
  type ProjectCreateFormData,
  ProjectCreateFormDataSchema,
} from "@/lib/schemas/project/project-create";
import { PROJECT_STATUS } from "@/lib/schemas/project/project-status";
import { getCurrentYear } from "@/lib/time";

type ProjectCreateFormProps = {
  onSuccess: () => void;
};

export function ProjectCreateForm({ onSuccess }: ProjectCreateFormProps) {
  const form = useForm<ProjectCreateFormData>({
    resolver: zodResolver(ProjectCreateFormDataSchema),
    defaultValues: {
      year: getCurrentYear(),
      status: PROJECT_STATUS[0],
      name: "",
      description: "",
      members: [],
      thumbnail: undefined,
      link: "",
    },
  });

  const { isDirty, isValid } = form.formState;
  const { mutate: createProject, isPending } = useCreateProjectMutation();

  function onSubmit(data: ProjectCreateFormData) {
    createProject(data, {
      onSuccess: () => {
        form.reset();
        onSuccess();
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex justify-end mb-4">
          <Button
            type="submit"
            disabled={!isDirty || !isValid || isPending}
            size="sm"
          >
            {isPending ? <Spinner /> : "생성"}
          </Button>
        </div>

        <ProjectFormFields form={form} selectedProject={null} />
      </form>
    </Form>
  );
}
