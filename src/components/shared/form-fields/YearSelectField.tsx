import type { FieldValues } from "react-hook-form";

import type { BaseFieldProps } from "@/components/shared/form-fields/type";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateComingYears } from "@/lib/time";

export function YearSelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
}: BaseFieldProps<T>) {
  const years = generateComingYears();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            disabled={disabled}
            onValueChange={val => field.onChange(Number(val))}
            value={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger className="w-full select-none">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="min-w-0 w-[var(--radix-select-trigger-width)]">
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                  년
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
