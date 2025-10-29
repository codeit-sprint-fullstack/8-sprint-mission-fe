import { fetchWithAuth } from "../auth/fetchers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UploadedImage {
  url: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
}

export interface UploadResponse {
  success: boolean;
  data: UploadedImage;
}

export interface MultipleUploadResponse {
  success: boolean;
  data: UploadedImage[];
}

/**
 * 단일 이미지 업로드
 * @param file 업로드할 이미지 파일
 * @returns UploadResponse
 */
const uploadImage = async (file: File): Promise<UploadedImage> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetchWithAuth(`${API_URL}/upload/image`, {
      method: "POST",
      body: formData,
    });

    if (!response || !response.ok) {
      throw new Error("이미지 업로드 실패");
    }

    const result: UploadResponse = await response.json();

    // URL이 상대 경로인 경우 절대 경로로 변환
    const imageData = result.data;
    if (imageData.url.startsWith("/")) {
      imageData.url = `${API_URL}${imageData.url}`;
    }

    return imageData;
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    throw error;
  }
};

/**
 * 다중 이미지 업로드
 * @param files 업로드할 이미지 파일들 (최대 10개)
 * @returns MultipleUploadResponse
 */
const uploadImages = async (files: File[]): Promise<UploadedImage[]> => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await fetchWithAuth(`${API_URL}/upload/images`, {
      method: "POST",
      body: formData,
    });

    if (!response || !response.ok) {
      throw new Error("이미지 업로드 실패");
    }

    const result: MultipleUploadResponse = await response.json();

    // URL이 상대 경로인 경우 절대 경로로 변환
    const imagesData = result.data.map((img) => {
      if (img.url.startsWith("/")) {
        return { ...img, url: `${API_URL}${img.url}` };
      }
      return img;
    });

    return imagesData;
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    throw error;
  }
};

export const uploadApi = {
  uploadImage,
  uploadImages,
};
