import type { FieldValues } from "react-hook-form";

import { CircleIcon } from "lucide-react";

import type { BaseFieldProps } from "@/components/shared/form-fields/type";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROJECT_STATUS, type ProjectStatus } from "@/lib/schemas/project/project-status";
import { cn } from "@/lib/utils";

const STATUS_DISPLAY: Record<ProjectStatus, string> = {
  progress: "진행중",
  done: "완료",
};

export function ProjectStatusSelectField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
}: BaseFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            disabled={disabled}
            onValueChange={val => field.onChange(val)}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="min-w-0 w-[var(--radix-select-trigger-width)]">
              {PROJECT_STATUS.map(status => (
                <SelectItem key={status} value={status}>
                  <CircleIcon className={cn(
                    "size-2",
                    status === "progress" ? "fill-red-500" : "fill-green-500",
                  )}
                  />
                  {STATUS_DISPLAY[status]}
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
