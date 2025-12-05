import { type Path, type UseFormReturn } from "react-hook-form";

import { ProjectMemberField } from "@/components/project/ProjectMemberField";
import { ProjectStatusSelectField } from "@/components/project/ProjectStatusSelectField";
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
      <div className="grid grid-cols-2 gap-4">
        <YearSelectField
          control={form.control}
          name={"year" as Path<T>}
          label="연도"
          placeholder="연도 선택"
        />

        <ProjectStatusSelectField
          control={form.control}
          name={"status" as Path<T>}
          label="상태"
        />
      </div>

      <InputFormField
        control={form.control}
        name={"name" as Path<T>}
        label="프로젝트 이름"
      />

      <TextAreaFormField
        control={form.control}
        name={"description" as Path<T>}
        label="설명"
      />

      <ProjectMemberField control={form.control} />

      <InputFormField
        control={form.control}
        name={"link" as Path<T>}
        label="프로젝트 링크"
      />

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
