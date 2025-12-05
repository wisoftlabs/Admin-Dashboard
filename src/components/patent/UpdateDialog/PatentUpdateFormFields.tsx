import { type Path, type UseFormReturn } from "react-hook-form";

import {
  DatePickerFormField,
  InputFormField,
  YearSelectField,
} from "@/components/shared/form-fields";
import { PdfFileFormField } from "@/components/shared/form-fields/PdfFileFormField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type Patent } from "@/lib/schemas/patent/patent";
import { type PatentCreateFormData } from "@/lib/schemas/patent/patent-create-form-data";
import { type PatentUpdateFormData } from "@/lib/schemas/patent/patent-update-form-data";

type PatentFormProps<T extends PatentCreateFormData | PatentUpdateFormData> = {
  form: UseFormReturn<T>;
  patent?: Patent | null;
};

export function PatentUpdateFormFields<T extends PatentCreateFormData | PatentUpdateFormData>({
  form,
  patent,
}: PatentFormProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 px-1">
      <div className="col-span-1 flex flex-col gap-4">
        {patent?.pdf_url
          && (
            <div className="space-y-2 flex flex-col">
              <Label>PDF</Label>
              <div className="aspect-[3/4] w-2/3 self-center rounded-md overflow-hidden border flex items-center justify-center">
                <iframe src={patent.pdf_url} className="w-full h-full" title={patent.name} />
              </div>
              <Button variant="outline" className="self-center" size="sm" asChild>
                <a href={patent.pdf_url} target="_blank" rel="noopener noreferrer">새 탭으로 보기</a>
              </Button>
            </div>
          )}
      </div>

      <div className="col-span-1 space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <YearSelectField
            control={form.control}
            name={"year" as Path<T>}
            label="출원년도"
          />
          <DatePickerFormField
            control={form.control}
            name={"invention_date" as Path<T>}
            label="출원일"
            placeholder="출원일"
          />
        </div>
        <InputFormField
          control={form.control}
          name={"name" as Path<T>}
          label="특허명"
        />
        <InputFormField
          control={form.control}
          name={"link" as Path<T>}
          label="링크"
        />
        <PdfFileFormField
          control={form.control}
          name={"pdf_file" as Path<T>}
          label="새 PDF 업로드"
          onError={message => form.setError("pdf_file" as Path<T>, { message })}
        />
      </div>
    </div>
  );
}
