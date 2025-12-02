import { type Orientation } from "@/lib/schemas/common/orientation";

type Size = { width: number; height: number }

export async function getImageResolutions(file: File): Promise<Size> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  bitmap.close();
  return { width, height };
}

export function getImageOrientation({ width, height }: Size): Orientation {
  return width > height ? "landscape" : "portrait";
}