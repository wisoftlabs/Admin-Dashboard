import { type Path, type UseFormReturn } from "react-hook-form";

import { ProjectMemberField } from "@/components/project/ProjectMemberField";
import { ImageLightbox } from "@/components/shared/dialog/ImageLightBox";
import { ImageFileFormField, InputFormField, TextAreaFormField, YearSelectField } from "@/components/shared/form-fields";
import type { Project } from "@/lib/schemas/project/project";
import type { ProjectCreateFormData } from "@/lib/schemas/project/project-create";
import type { ProjectUpdateFormData } from "@/lib/schemas/project/project-update";

type ProjectFormProps<T extends ProjectCreateFormData | ProjectUpdateFormData> = {
  form: UseFormReturn<T>;
  selectedProject: Project | null;
};

export function ProjectFormFields<T extends ProjectCreateFormData | ProjectUpdateFormData>({
  form,
  selectedProject,
}: ProjectFormProps<T>) {
  return (
    <div className="space-y-2 flex-grow overflow-auto px-1">
      <YearSelectField
        control={form.control}
        name={"year" as Path<T>}
        label="연도"
        placeholder="연도 선택"
      />

      <InputFormField
        control={form.control}
        name={"name" as Path<T>}
        label="프로젝트 이름"
      />

      <TextAreaFormField
        control={form.control}
        name={"team_name" as Path<T>}
        label="팀 이름"
      />

      <ProjectMemberField control={form.control} />

      <ImageFileFormField
        control={form.control}
        name={"thumbnail" as Path<T>}
        label="썸네일"
        onError={message => form.setError("thumbnail" as Path<T>, { message })}
      />

      {selectedProject?.thumbnail && (
        <ImageLightbox imageSrc={selectedProject.thumbnail}>
          <img
            src={selectedProject.thumbnail}
            alt="Project Thumbnail"
            className="rounded-md border w-full max-w-xs"
          />
        </ImageLightbox>
      )}
    </div>
  );
}
