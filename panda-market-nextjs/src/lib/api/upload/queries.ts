"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { uploadApi, UploadedImage } from "./fetchers";

/**
 * 다중 이미지 업로드
 * @returns UseMutationResult
 */
const useUploadImages = (): UseMutationResult<
  UploadedImage[],
  Error,
  File[]
> => {
  return useMutation({
    mutationFn: (files: File[]) => uploadApi.uploadImages(files),
  });
};

export const useUploadQuery = {
  useUploadImages,
};
