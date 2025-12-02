import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  ProjectCreateFormDataSchema,
  type ProjectCreateFormData,
} from "@/lib/schemas/project/project-create";
import { getCurrentYear } from "@/lib/time";
import { useCreateProjectMutation } from "@/hooks/projects/mutations";
import {ProjectFormFields} from "@/components/project/ProjectFormFields";
import {Spinner} from "@/components/ui/spinner";

type ProjectCreateFormProps = {
  onSuccess: () => void;
};

export function ProjectCreateForm({ onSuccess }: ProjectCreateFormProps) {
  const form = useForm<ProjectCreateFormData>({
    resolver: zodResolver(ProjectCreateFormDataSchema),
    defaultValues: {
      name: "",
      team_name: "",
      description: "",
      year: getCurrentYear(),
      members: [],
      thumbnail: undefined,
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
