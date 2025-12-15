import { useState } from "react";

import { groupBy } from "es-toolkit";
import { PlusIcon } from "lucide-react";

import { GalleryYearSection } from "@/components/gallery/GalleryYearSection";
import { ImageUploadDialog, type UploadFormData } from "@/components/gallery/ImageUploadDialog";
import { SlideListSection } from "@/components/gallery/SlideListSection";
import { ErrorView } from "@/components/shared/error-view";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddImagesToSlidesMutation,
  useDeleteSlidesMutation,
  useUploadGalleryImagesMutation,
} from "@/hooks/gallery/mutations";
import { useGalleryImages, useGallerySlides } from "@/hooks/gallery/queries";

export function GalleryPage() {
  const { data: images = [], isLoading: imagesLoading, isError: imagesError } = useGalleryImages();
  const { data: slides = [], isLoading: slidesLoading, isError: slidesError } = useGallerySlides();
  const uploadMutation = useUploadGalleryImagesMutation();
  const addToSlidesMutation = useAddImagesToSlidesMutation();
  const removeSlideMutation = useDeleteSlidesMutation();

  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());

  const slideImageIds = new Set(slides.map(slide => slide.image_id));

  const slideImages = slides.map(slide => ({
    id: slide.id,
    title: slide.title,
    imageUrl: slide.file_url,
  }));

  const galleryImages = images.map(img => ({
    id: img.id,
    title: img.title,
    date: img.created_at,
    imageUrl: img.file_url,
  }));

  const groupedImages = groupBy(galleryImages, (img) => {
    const year = new Date(img.date).getFullYear();
    return isNaN(year) ? new Date().getFullYear() : year;
  });
  const years = Object.keys(groupedImages).map(Number).sort((a, b) => b - a);

  const handleImageSelect = (id: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    }
    else {
      newSelected.add(id);
    }
    setSelectedImages(newSelected);
  };

  const handleAddToSlideList = async () => {
    const imageIdsToAdd = Array.from(selectedImages).filter(id => !slideImageIds.has(id));
    if (imageIdsToAdd.length > 0) {
      await addToSlidesMutation.mutateAsync(imageIdsToAdd);
    }
    setSelectedImages(new Set());
  };

  const handleRemoveFromSlideList = async () => {
    const slideIdsToRemove = slides
      .filter(slide => selectedImages.has(slide.image_id))
      .map(slide => slide.id);
    if (slideIdsToRemove.length > 0) {
      await removeSlideMutation.mutateAsync(slideIdsToRemove);
    }
    setSelectedImages(new Set());
  };

  const handleRemoveFromSlideListDirect = async (slideId: string) => {
    await removeSlideMutation.mutateAsync([slideId]);
  };

  const handleClearSelection = () => {
    setSelectedImages(new Set());
  };

  const handleUpload = async (data: UploadFormData) => {
    await uploadMutation.mutateAsync(data.files);
  };

  const allSelectedInSlideList = selectedImages.size > 0
    && Array.from(selectedImages).every(id => slideImageIds.has(id));
  const someSelectedInSlideList = selectedImages.size > 0
    && Array.from(selectedImages).some(id => slideImageIds.has(id));

  const isLoading = imagesLoading || slidesLoading;
  const isError = imagesError || slidesError;

  if (isError) {
    return <ErrorView message="이미지를 불러오는데 실패했습니다." />;
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        <ImageUploadDialog onUpload={handleUpload}>
          <Button disabled={uploadMutation.isPending}>
            <PlusIcon className="w-4 h-4" />
            {uploadMutation.isPending ? "업로드 중..." : "이미지 업로드"}
          </Button>
        </ImageUploadDialog>
      </div>

      {/* Slide List Section */}
      <SlideListSection
        slides={slideImages}
        onRemove={handleRemoveFromSlideListDirect}
      />

      {/* Selected Images Action Bar */}
      {selectedImages.size > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-primary">
              {selectedImages.size}
              개 선택됨
            </div>
            <div className="flex gap-2">
              {!allSelectedInSlideList && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAddToSlideList}
                  className="bg-gradient-to-r from-[#43e97b] to-[#38f9d7]"
                >
                  <PlusIcon className="w-4 h-4" />
                  Photo Slides에 추가
                </Button>
              )}
              {someSelectedInSlideList && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveFromSlideList}
                >
                  Photo Slides에서 제거
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleClearSelection}>
                선택 해제
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Gallery Content */}
      <div className="space-y-4 mt-8">
        {years.length === 0
          ? (
              <div className="text-center py-20 text-muted-foreground">
                <p>등록된 이미지가 없습니다.</p>
                <p className="text-sm mt-2">이미지 업로드 버튼을 클릭하여 시작하세요.</p>
              </div>
            )
          : (
              years.map(year => (
                <GalleryYearSection
                  key={year}
                  year={year}
                  images={groupedImages[year] || []}
                  selectedImages={selectedImages}
                  onImageSelect={handleImageSelect}
                />
              ))
            )}
      </div>
    </div>
  );
}
