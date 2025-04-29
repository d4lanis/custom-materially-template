import camelcaseKeys from 'camelcase-keys';
import { axiosInstance } from '../utils/axios';

class HttpService {
  /**
   * Makes a GET request to the specified endpoint
   */
  async get(url, params = {}) {
    const config = {
      params: this.buildQueryParams(params)
    };

    const response = await axiosInstance.get(url, config);
    return this.processResponse(response);
  }

  /**
   * Makes a POST request to the specified endpoint
   */
  async post(url, data, config = {}) {
    const response = await axiosInstance.post(url, data, config);
    return this.processResponse(response);
  }

  /**
   * Makes a PUT request to the specified endpoint
   */
  async put(url, data, config = {}) {
    const response = await axiosInstance.put(url, data, config);
    return this.processResponse(response);
  }

  /**
   * Makes a PATCH request to the specified endpoint
   */
  async patch(url, data, config = {}) {
    const response = await axiosInstance.patch(url, data, config);
    return this.processResponse(response);
  }

  /**
   * Makes a DELETE request to the specified endpoint
   */
  async delete(url, config = {}) {
    const response = await axiosInstance.delete(url, config);
    return this.processResponse(response);
  }

  /**
   * Builds query parameters for URL by handling arrays properly
   * Arrays are formatted as param=value1&param=value2
   */
  buildQueryParams(params = {}) {
    const result = {};

    Object.entries(params).forEach(([key, value]) => {
      // Skip null or undefined values
      if (value === null || value === undefined) {
        return;
      }

      // Handle array values
      if (Array.isArray(value)) {
        // For empty arrays, don't add the parameter
        if (value.length === 0) {
          return;
        }

        // Arrays are handled by the axios serializer
        result[key] = value;
      } else {
        // Convert boolean values to strings
        result[key] = typeof value === 'boolean' ? value.toString() : value;
      }
    });

    return result;
  }

  /**
   * Process the axios response and transform data to camelCase
   */
  processResponse(response) {
    // Transform response data to camelCase
    return camelcaseKeys(response.data, { deep: true });
  }

  createCancelToken() {
    return axios.CancelToken.source();
  }
}

// Create a singleton instance
const httpService = new HttpService();
export default httpService;
