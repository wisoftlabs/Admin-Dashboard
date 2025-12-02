import type {FieldValues} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import type {BaseFieldProps} from "@/components/shared/form-fields/type";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import {CloudUploadIcon, XIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export function ImageFileFormField<T extends FieldValues>({
  control,
  name,
  label,
  onError
}: Omit<BaseFieldProps<T>, "placeholder"> & { onError: (msg?: string) => void }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FileUpload
              value={field.value ? [field.value] : []}
              onValueChange={(files) => {
                field.onChange(files?.[0]);
              }}
              accept="image/*"
              maxFiles={1}
              onFileReject={(_, message) => onError(message)}
              className="space-y-4"
            >
              <FileUploadDropzone className="group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/5 py-8 text-center transition-colors hover:bg-muted/20">
                <div className="rounded-full bg-background p-3 shadow-sm ring-1 ring-border">
                  <CloudUploadIcon className="size-6 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    이미지를 드래그하거나{" "}
                    <FileUploadTrigger asChild>
                      <span className="cursor-pointer font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
                        파일 선택
                      </span>
                    </FileUploadTrigger>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG
                  </p>
                </div>
              </FileUploadDropzone>

              <FileUploadList>
                {(field.value ? [field.value] : []).map((file, index) => (
                  <FileUploadItem
                    key={index}
                    value={file}
                    className="relative flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm"
                  >
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-md border">
                      <FileUploadItemPreview className="size-full object-cover" />
                    </div>

                    <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                      <FileUploadItemMetadata className="text-sm font-medium truncate" />
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