import type { APIResponse } from '../types/APIResponse';

const API_URL = import.meta.env.VITE_LOCAL_API_URL;

export async function createShortURL(
  originURL: string,
  urlCode?: string
): Promise<APIResponse> {
  const response = await fetch(`${API_URL}/urlRecord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ originURL, ...(urlCode && { urlCode }) }),
  });
  const result = await response.json();

  if (response.status !== 200 && response.status !== 201) {
    throw new Error(result.message);
  }

  return result;
}

export async function getOriginURL(urlCode: string): Promise<APIResponse> {
  const response = await fetch(`${API_URL}/${urlCode}`);
  const result = await response.json();

  if (response.status !== 200) {
    throw new Error(result.message);
  }

  return result;
}
