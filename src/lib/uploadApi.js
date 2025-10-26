import { apiFetch } from './apiClient';

/**
 * 단일 이미지 업로드
 * @param {File} imageFile - 업로드할 이미지 파일
 * @returns {Promise<Object>} { message: string, imageUrl: string }
 */
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  return apiFetch('/upload/image', {
    method: 'POST',
    body: formData,
    headers: {}, // FormData는 Content-Type 자동 설정
  });
};

/**
 * 다중 이미지 업로드 (최대 3개)
 * @param {File[]} imageFiles - 업로드할 이미지 파일 배열
 * @returns {Promise<Object>} { message: string, images: string[] }
 */
export const uploadImages = async (imageFiles) => {
  const formData = new FormData();
  imageFiles.forEach((file) => {
    formData.append('images', file);
  });

  return apiFetch('/upload/images', {
    method: 'POST',
    body: formData,
    headers: {}, // FormData는 Content-Type 자동 설정
  });
};
