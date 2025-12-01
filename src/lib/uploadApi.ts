import { api } from './apiClient';

interface UploadResult {
  images: string[];
}

export const uploadImages = async (files: File[]): Promise<UploadResult> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });

  const response = (await api.post('/images/upload', formData, {
    auth: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })) as UploadResult;

  return response;
};
