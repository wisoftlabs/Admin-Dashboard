import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_PDF_TYPE = "application/pdf";

export const PdfFileSchema = z
  .instanceof(File)
  .refine(file => file.size <= MAX_FILE_SIZE, {
    message: `PDF 파일은 10MB 이하만 업로드할 수 있습니다.`,
  })
  .refine(file => file.type === ACCEPTED_PDF_TYPE, {
    message: "PDF 파일만 업로드할 수 있습니다.",
  });
