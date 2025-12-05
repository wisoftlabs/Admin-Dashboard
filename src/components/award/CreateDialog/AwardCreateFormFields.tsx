import { type Path, type UseFormReturn } from "react-hook-form";

import {
  ImageFileFormField,
  InputFormField,
  TextAreaFormField,
  YearSelectField,
} from "@/components/shared/form-fields";
import { DatePickerFormField } from "@/components/shared/form-fields/DatePickerFormField";
import { type AwardCreateFormData } from "@/lib/schemas/award/award-create-form-data";

type AwardFormProps<T extends AwardCreateFormData> = {
  form: UseFormReturn<T>;
};

export function AwardCreateFormFields<T extends AwardCreateFormData>({
  form,
}: AwardFormProps<T>) {
  return (
    <div className="flex flex-col gap-x-6 gap-y-2 flex-grow overflow-auto px-1">
      <div className="grid grid-cols-2 gap-4">
        <YearSelectField
          control={form.control}
          name={"year" as Path<T>}
          label="수상년도"
        />
        <DatePickerFormField
          control={form.control}
          name={"date" as Path<T>}
          label="수상일자"
          placeholder="수상일"
        />
      </div>
      <InputFormField
        control={form.control}
        name={"competition" as Path<T>}
        label="대회명"
      />
      <InputFormField
        control={form.control}
        name={"title" as Path<T>}
        label="제목"
      />
      <InputFormField
        control={form.control}
        name={"awardee" as Path<T>}
        label="수상자"
      />
      <TextAreaFormField
        control={form.control}
        name={"summary" as Path<T>}
        label="요약"
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
