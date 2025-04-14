import { Group } from '../types/Group';

export async function getApiInfo(
  name: string = 'Red Velvet'
): Promise<Group | undefined> {
  try {
    const response = await fetch(`/info/${name}`);

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}
