const BASE_URL = 'https://codeitsprintmission.onrender.com';

export default async function api(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    throw new Error(`API Error ${res.status}`);
  }

  return res;
}
