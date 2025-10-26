import { apiFetch } from './apiClient';

export const fetchContent = async (key: string) => {
  try {
    return await apiFetch(`/api/content/${key}`);
  } catch (err) {
    console.error('Error fetching content:', err);
    return { widgets: [] };
  }
};
