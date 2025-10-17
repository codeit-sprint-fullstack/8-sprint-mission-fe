const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const IMAGE_API_URL = `${BASE_URL}/images`;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${IMAGE_API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`이미지 업로드 실패: ${res.status}`);
  }

  const data = await res.json();
  return data.url;
};
