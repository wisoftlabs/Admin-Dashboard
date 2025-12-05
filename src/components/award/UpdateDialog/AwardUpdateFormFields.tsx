import { type UseFormReturn } from "react-hook-form";

import {
  ImageFileFormField,
  InputFormField,
  TextAreaFormField,
  YearSelectField,
} from "@/components/shared/form-fields";
import { DatePickerFormField } from "@/components/shared/form-fields/DatePickerFormField";
import { Label } from "@/components/ui/label";
import { type Award } from "@/lib/schemas/award/award";
import { type AwardUpdateFormData } from "@/lib/schemas/award/award-update-form-data";
import { cn } from "@/lib/utils";

type AwardFormProps = {
  form: UseFormReturn<AwardUpdateFormData>;
  award: Award;
};

export function AwardUpdateFormFields({
  form,
  award,
}: AwardFormProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 flex-grow overflow-auto px-1">
      <div className="col-span-1 flex flex-col gap-4">
        {award.image_url
          && (
            <div className="space-y-2 flex flex-col">
              <Label>이미지</Label>
              <div
                className={cn(
                  "w-2/3 self-center rounded-md overflow-hidden border flex items-center justify-center",
                  award.orientation === "portrait" ? "aspect-[3/4]" : "aspect-auto",
                )}
              >
                <img src={award.image_url} alt={award.title} className="w-full h-full object-contain" />
              </div>
            </div>
          )}
        <ImageFileFormField
          control={form.control}
          name="image_file"
          label="새 이미지 업로드"
          onError={message => form.setError("image_file", { message })}
        />
      </div>

      <div className="col-span-1 space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <YearSelectField
            control={form.control}
            name="year"
            label="수상년도"
          />
          <DatePickerFormField
            control={form.control}
            name="date"
            label="수상일자"
            placeholder="수상일"
          />
        </div>
        <InputFormField
          control={form.control}
          name="competition"
          label="대회명"
        />
        <InputFormField
          control={form.control}
          name="title"
          label="제목"
        />
        <InputFormField
          control={form.control}
          name="awardee"
          label="수상자"
        />
        <TextAreaFormField
          control={form.control}
          name="summary"
          label="요약"
        />
      </div>
    </div>
  );
}
