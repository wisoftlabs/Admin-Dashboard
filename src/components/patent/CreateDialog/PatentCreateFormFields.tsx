import { type Path, type UseFormReturn } from "react-hook-form";

import {
  DatePickerFormField,
  InputFormField,
  YearSelectField,
} from "@/components/shared/form-fields";
import { PdfFileFormField } from "@/components/shared/form-fields/PdfFileFormField";
import { type PatentCreateFormData } from "@/lib/schemas/patent/patent-create-form-data";

type PatentFormProps<T extends PatentCreateFormData> = {
  form: UseFormReturn<T>;
};

export function PatentCreateFormFields<T extends PatentCreateFormData>({
  form,
}: PatentFormProps<T>) {
  return (
    <div className="flex flex-col gap-4">
      <InputFormField
        control={form.control}
        name={"name" as Path<T>}
        label="특허명"
        placeholder="특허명을 입력하세요."
      />

      <YearSelectField
        control={form.control}
        name={"year" as Path<T>}
        label="출원년도"
      />

      <DatePickerFormField
        control={form.control}
        name={"invention_date" as Path<T>}
        label="출원일"
      />

      <InputFormField
        control={form.control}
        name={"link" as Path<T>}
        label="링크"
        placeholder="관련 링크를 입력하세요."
      />

      <PdfFileFormField
        control={form.control}
        name={"pdf_file" as Path<T>}
        label="PDF 파일"
        onError={message => form.setError("pdf_file" as Path<T>, {
          message,
        })}
      />
    </div>
  );
}
