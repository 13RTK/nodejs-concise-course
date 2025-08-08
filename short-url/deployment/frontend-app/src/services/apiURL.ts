import type { APIResponse } from '../types/APIResponse';

const LOCAL_API_URL = import.meta.env.VITE_LOCAL_API_URL;

export async function getOriginURL(
  originURL: string,
  urlCode?: string
): Promise<APIResponse> {
  const response = await fetch(`${LOCAL_API_URL}/urlRecord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ originURL, ...(urlCode && { urlCode }) }),
  });

  const result = await response.json();

  if (response.status !== 200 && response.status !== 201) {
    return result;
  }

  return result;
}
