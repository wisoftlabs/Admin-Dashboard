import type { FieldValues } from "react-hook-form";

import { FileText, XIcon } from "lucide-react";

import type { BaseFieldProps } from "@/components/shared/form-fields/type";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function PdfFileFormField<T extends FieldValues>({
  control,
  name,
  label,
  onError,
}: Omit<BaseFieldProps<T>, "placeholder"> & { onError: (msg?: string) => void }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="min-h-24">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FileUpload
              value={field.value ? [field.value] : []}
              onValueChange={(files) => {
                field.onChange(files?.[0]);
              }}
              accept="application/pdf"
              maxFiles={1}
              onFileReject={(_, message) => onError(message)}
              className="space-y-2"
            >
              {!field.value && (
                <FileUploadDropzone className="group flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/5 py-2 text-center transition-colors hover:bg-muted/20">
                  <div className="rounded-full bg-background p-1.5 shadow-sm ring-1 ring-border">
                    <FileText className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium text-foreground">
                      PDF 파일을 드래그하거나
                      {" "}
                      <FileUploadTrigger asChild>
                        <span className="cursor-pointer font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                          파일 선택
                        </span>
                      </FileUploadTrigger>
                    </p>
                  </div>
                </FileUploadDropzone>
              )}

              <FileUploadList>
                {(field.value ? [field.value] : []).map((file, index) => (
                  <FileUploadItem
                    key={index}
                    value={file}
                    className="relative flex items-center gap-1.5 rounded-lg border bg-card p-3 shadow-sm"
                  >
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-md border flex items-center justify-center">
                      <FileText className="size-6 text-muted-foreground" />
                    </div>

                    <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                      <FileUploadItemMetadata className="text-xs font-medium truncate" size="sm" />
                    </div>

                    <FileUploadItemDelete asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-destructive"
                      >
                        <XIcon className="size-4" />
                        <span className="sr-only">삭제</span>
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
