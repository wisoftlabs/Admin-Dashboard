import type { FieldValues } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { type BaseFieldProps } from "./type";

type CheckboxFormFieldProps<T extends FieldValues> = {
  description?: string;
} & BaseFieldProps<T>;

export function CheckboxFormField<T extends FieldValues>({ control, name, label, description }: CheckboxFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
