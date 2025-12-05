import { z } from "zod";

const ACCEPTED_PDF_TYPE = "application/pdf";

export const PdfFileSchema = z
  .file()
  .refine(file => file.type === ACCEPTED_PDF_TYPE, {
    message: "PDF 파일만 업로드할 수 있습니다.",
  });
