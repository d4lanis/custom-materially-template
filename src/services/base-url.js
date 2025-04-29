/**
 * Get the base URL for API requests from environment variables
 */
export const getBaseUrl = () => {
  return import.meta.env.REACT_APP_API_URL || 'http://localhost:3333/api';
};
