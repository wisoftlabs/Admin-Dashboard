import { type Path, type UseFormReturn } from "react-hook-form";

import {
  ImageFileFormField,
  InputFormField,
  TextAreaFormField,
  YearSelectField,
} from "@/components/shared/form-fields";
import { DatePickerFormField } from "@/components/shared/form-fields/DatePickerFormField";
import { type PaperCreateFormData } from "@/lib/schemas/paper/paper-create-form-data";

type PaperFormProps<T extends PaperCreateFormData> = {
  form: UseFormReturn<T>;
};

export function PaperCreateFormFields<T extends PaperCreateFormData>({
  form,
}: PaperFormProps<T>) {
  return (
    <div className="flex flex-col gap-x-6 gap-y-2 flex-grow overflow-auto px-1">
      <InputFormField
        control={form.control}
        name={"title" as Path<T>}
        label="논문 제목"
      />
      <InputFormField
        control={form.control}
        name={"authors" as Path<T>}
        label="저자"
      />
      <TextAreaFormField
        control={form.control}
        name={"paper_abstract" as Path<T>}
        label="초록"
      />
      <InputFormField
        control={form.control}
        name={"conference" as Path<T>}
        label="학회"
      />
      <InputFormField
        control={form.control}
        name={"journal" as Path<T>}
        label="출판"
      />
      <div className="grid grid-cols-2 gap-4">
        <YearSelectField
          control={form.control}
          name={"year" as Path<T>}
          label="발표년도"
        />
        <DatePickerFormField
          control={form.control}
          name={"publication_date" as Path<T>}
          label="발표일자"
          placeholder="발표 일자"
        />
      </div>
      <InputFormField
        control={form.control}
        name={"link" as Path<T>}
        label="논문 링크"
      />
      <ImageFileFormField
        control={form.control}
        name={"image_file" as Path<T>}
        label="새 이미지 업로드"
        onError={message => form.setError("image_file" as Path<T>, { message })}
      />
    </div>
  );
}
