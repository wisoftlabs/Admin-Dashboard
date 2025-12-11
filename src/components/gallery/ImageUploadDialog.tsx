import { useState } from "react";

import { PlusIcon, UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type UploadFormData = {
  files: Array<{ file: File; title: string }>;
};

type ImageUploadDialogProps = {
  onUpload?: (data: UploadFormData) => void;
  children?: React.ReactNode;
};

export function ImageUploadDialog({ onUpload, children }: ImageUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileTitles, setFileTitles] = useState<Record<number, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    setFileTitles({});
  };

  const handleTitleChange = (index: number, title: string) => {
    setFileTitles(prev => ({ ...prev, [index]: title }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const formData: UploadFormData = {
      files: selectedFiles.map((file, index) => ({
        file,
        title: fileTitles[index] || "",
      })),
    };

    onUpload?.(formData);

    setOpen(false);
    setSelectedFiles([]);
    setFileTitles({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <PlusIcon className="w-4 h-4" />
            이미지 업로드
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>이미지 업로드</DialogTitle>
            <DialogDescription>
              갤러리에 새 이미지를 업로드합니다. 제목은 선택사항입니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* File Input */}
            <div className="space-y-2">
              <Label htmlFor="files">이미지</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="files"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <UploadIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              {selectedFiles.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {selectedFiles.length}
                  개의 파일 선택됨
                </p>
              )}
            </div>

            {/* Title Inputs for Each File */}
            {selectedFiles.length > 0 && (
              <div className="space-y-3 pt-2">
                <Label className="text-base font-semibold">이미지 제목 (선택사항)</Label>
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="space-y-2 pl-4 border-l-2 border-primary"
                  >
                    <Label htmlFor={`title-${index}`} className="text-sm">
                      {index + 1}
                      .
                      {" "}
                      {file.name}
                    </Label>
                    <Input
                      id={`title-${index}`}
                      placeholder="제목 없음 (선택사항)"
                      value={fileTitles[index] || ""}
                      onChange={e => handleTitleChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button type="submit">업로드</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
